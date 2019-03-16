const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {

    const { firstName, email } = user;

    return jwt.sign({
        firstName, email
    }, secret, { expiresIn })

}

exports.resolvers = {
    Query: {
        getCurrentUser: async (root, args, { currentUser, User }) => {
            if (!currentUser) {
                return null;
            }
            const user = await User.findOne({ email: currentUser.email });
            return user;
        },
        // return all tutorials from database
        getAllTutorials: async (root, args, { Tutorial }) => {
            const allTutorials = await Tutorial.find();
            return allTutorials;
        },

        getAllUsers: async (root, args, { User }) => {
            const users = await User.find().sort({
                firstName
            });

            return users;
        },
        getAllTeachers: async (root, args, { User }) => {
            const users = await User.find({ isTeacher: { $eq: true } })
            return users;
        },
        getAllMentors: async (root, args, { User }) => {
            const users = await User.find({ isMentor: { $eq: true } })
            return users;
        }
    },
    Mutation: {
        // add tutorial to database
        addTutorial: async (root, { name, description, category, username }, { Tutorial }) => {
            const newTutorial = await new Tutorial({
                name,
                description,
                category,
                username,
                createdDate: new Date().toISOString()
            }).save();
            return newTutorial;
        },
        signupUser: async (root, { firstName, lastName, email, userName, password, isUser, isAdmin, isTeacher, isMentor }, { User }) => {

            const user = await User.findOne({ email, userName });

            if (user) {
                throw new Error('User already exits');
            }

            const newUser = await new User({
                firstName,
                lastName,
                email,
                userName,
                password,
                joinDate: new Date().toISOString(),
                isUser,
                isAdmin,
                isTeacher,
                isMentor
            }).save();

            return { token: createToken(newUser, process.env.SECRET, "1hr") };
        },

        signinUser: async (root, { email, password }, { User }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('User Not Found');
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                throw new Error('inValid password');
            }

            return { token: createToken(user, process.env.SECRET, "1hr") };


        },
        changeEmail: async (root, { currentEmail, newEmail }, { User }) => {

            const user = await User.findOneAndUpdate({ email: currentEmail }, { $set: { email: newEmail } }, { new: true });

            if (!user) {
                throw new Error('User Not Found');
            }

            return user;

        },

        changePassword: (root, { email, password }, { User }) => {

            const saltRounds = 10;

            return bcrypt.hash(password, saltRounds).then(async function (hash) {

                const user = await User.findOneAndUpdate({ email }, { $set: { password: hash } }, { new: true });

                if (!user) {
                    throw new Error('User Not Found');
                }

                return user;

            });

        },

        passwordReset: async (root, { email }, { User }) => {

            const saltRounds = 10;
            const generatedPassword = generator.generate({ length: 10, numbers: true });

            return bcrypt.hash(generatedPassword, saltRounds).then(async function (hash) {

                const user = await User.findOneAndUpdate({ email }, { $set: { password: hash } }, { new: true });

                if (!user) {
                    throw new Error('User Not Found');
                } else {

                    const data = {
                        email,
                        generatedPassword
                    }
                    axios.post(`/password-reset`, data)
                        .then(function (response) {
                            // console.log('Email sent!');
                        })
                        .catch(function (error) {
                            // console.log(error);
                        });
                }
                return user;
            });
        },
        deleteUser: async (root, { _id }, { User }) => {
          const user = await User.findOne({ _id });
          if(user){
            const removeUser = await User.remove(user);
            return removeUser;
          }

          if (!user) {
            throw new Error('User Not Found');
        } 
        }
    }
};