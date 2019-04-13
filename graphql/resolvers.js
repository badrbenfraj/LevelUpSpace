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
        },
        getSections: async (root, args, { Section }) => {
            const allSections = await Section.find();
            return allSections;
        },
        getLectures: async (root, args, { Lecture }) => {
            const allLectures = await Lecture.find();
            return allLectures;
        },
        getMessages: async (root, args, { Messages }) => {
            const allMessages = await Messages.find();

            return allMessages;
        },
        getClaims: async (root, args, { Claims }) => {
            const allClaims = await Claims.find();
            return allClaims;
        },
    },
    Mutation: {
        // add tutorial to database
        addTutorial: async (root, { name, description, userName }, { Tutorial }) => {
            const newTutorial = await new Tutorial({
                name,
                description,
                userName,
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
            if (user) {
                const removeUser = await User.remove(user);
                return removeUser;
            }

            if (!user) {
                throw new Error('User Not Found');
            }
        },
        deleteTutorial: async (root, { _id }, { Tutorial }) => {
            const tutorial = await Tutorial.findOne({ _id });

            if (tutorial) {
                const removeTutorial = await Tutorial.remove(tutorial);
                return removeTutorial;
            }
        },
        changeTutorialName: async (root, { _id, newName, newDescription }, { Tutorial }) => {

            const updatedName = await Tutorial.findOneAndUpdate({ _id }, { $set: { name: newName, description: newDescription } }, { new: true });
            return updatedName;

        },
        addSection: async (root, { name, description, TutorialID }, { Section }) => {
            const section = await Section.findOne({ name });
            if (!section) {
                const newSection = await new Section({
                    name,
                    description,
                    TutorialID,
                    createdDate: new Date().toISOString()
                }).save();
                return newSection;
            }
            if (section) {
                throw new Error('Section already exist');
            }
        },
        deleteSection: async (root, { _id }, { Section }) => {
            const section = await Section.findOne({ _id });
            if (section) {
                const removeSection = await Section.remove(section);
                return removeSection;
            }
        },
        editSection: async (root, { _id, newName, newDescription }, { Section }) => {
            const updatedName = await Section.findOneAndUpdate({ _id }, { $set: { name: newName, description: newDescription } }, { new: true });
            return updatedName;
        },
        addLecture: async (root, { name, description, SectionID }, { Lecture }) => {
            const lecture = await Lecture.findOne({ name });
            if (!lecture) {
                const newLecture = await new Lecture({
                    name,
                    description,
                    SectionID,
                    createdDate: new Date().toISOString()
                }).save();
                return newLecture;
            }
            if (lecture) {
                throw new Error('Section already exist');
            }
        },
        deleteLecture: async (root, { _id }, { Lecture }) => {
            const lecture = await Lecture.findOne({ _id });
            if (lecture) {
                const removeLecture = await Lecture.remove(lecture);
                return removeLecture;
            }
        },
        editLecture: async (root, { _id, newName, newDescription }, { Lecture }) => {
            const updatedName = await Lecture.findOneAndUpdate({ _id }, { $set: { name: newName, description: newDescription } }, { new: true });
            return updatedName;
        },
        addMessages: async (root, { message, userName }, { Messages }) => {

            const newMessage = await new Messages({
                message,
                userName,
                createdDate: new Date().toISOString()
            }).save();
            return newMessage;
        },
        addClaim: async (root, { firstName, lastName, email, subject, description }, { Claims }) => {

            const newClaim = await new Claims({
                firstName,
                lastName,
                email,
                subject,
                description,
            }).save();

            return newClaim;
        },
    }
};