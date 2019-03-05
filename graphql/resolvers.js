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
        // // add new user 
        // signupUser: async (root, { username, email, password }, { User }) => {
        //     const user = await User.findOne({ email });
        //     if (user) {
        //         throw new Error('User already exist')
        //     }
        //     const newUser = await new User({
        //         username,
        //         email,
        //         password
        //     }).save();
        //     return { token: createToken(newUser, process.env.SECRET, '1hr') };
        // },
        // // signin user by comparing email and password
        // signinUser: async (root, { email, password }, { User }) => {
        //     // search for user by email
        //     const user = await User.findOne({ email });
        //     if (!user) {
        //         throw new Error("User not found");
        //     }
        //     // comapre hashed password by entered password
        //     const isValidPassword = await bcrypt.compare(password, user.password);
        //     if (!isValidPassword) {
        //         throw new Error("Invalid password");
        //     }
        //     return { token: createToken(user, process.env.SECRET, "1hr") };
        // }
        signupUser: async (root, { firstName, lastName, email, userName, password }, { User }) => {

            const user = await User.findOne({ email, userName });

            if (user) {
                throw new Error('User already exits');
            }

            const newUser = await new User({
                firstName,
                lastName,
                email,
                userName,
                password
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

        }
    }
};