const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn })
}

exports.resolvers = {
    Query: {
        // return all tutorials from database
        getAllTutorials: async (
            root,
            args,
            { Tutorial }) => {
            const allTutorials = await Tutorial.find();
            return allTutorials;
        }
    },
    Mutation: {
        // add tutorial to database
        addTutorial: async (
            root,
            { name, description, category, username },
            { Tutorial }) => {
            const newTutorial = await new Tutorial({
                name,
                description,
                category,
                username,
                createdDate: new Date().toISOString()
            }).save();
            return newTutorial;
        },
        // add new user to database
        signupUser: async (root, { username, email, password }, { User }) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error('User already exist')
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            return { token: createToken(newUser, process.env.SECRET, '1hr') };
        },
        // signin user by comparing email and password
        signinUser: async (root, { email, password }, { User }) => {
            // search for user by email
            const user = User.findOne({ email });
            if (!user) {
                throw new Error('User Not Found');
            }
            // comapre hashed password by entered password
            const isValidePassword = await bcrypt.compare(password, user.password);
            if (!isValidePassword) {
                throw new Error('Invalide password');
            }
            return { token: createToken(user, process.env.SECRET, '1hr') };
        }
    }
};