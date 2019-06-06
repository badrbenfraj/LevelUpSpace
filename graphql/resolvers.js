const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var generator = require('generate-password');
const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');

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
        getAllTutorials: async (root, agrs, { Tutorial }) => {
            const allTutorials = await Tutorial.find();
            return allTutorials;
        },

        getTutorial: async (root, { _id }, { Tutorial }) => {
            const allTutorials = await Tutorial.find({ _id });
            return allTutorials;
        },

        getAllUsers: async (root, args, { User }) => {
            const users = await User.find();

            return users;
        },
        getUser: async (root, { userName }, { User }) => {
            const user = await User.findOne({ userName });

            return user;
        },
        getAllTeachers: async (root, args, { User }) => {
            const users = await User.find({ isTeacher: { $eq: true } })
            return users;
        },
        getAllMentors: async (root, args, { User }) => {
            const users = await User.find({ isMentor: { $eq: true } })
            return users;
        },
        getSections: async (root, { TutorialID }, { Section }) => {
            const allSections = await Section.find({ TutorialID });
            return allSections;
        },
        getLectures: async (root, { SectionID }, { Lecture }) => {
            const allLectures = await Lecture.find({ SectionID });
            return allLectures;
        },
        getMessages: async (root, args, { Messages }) => {
            const allMessages = await Messages.find();

            return allMessages;
        },
        getTutorialMessages: async (root, { TutorialID }, { TutorialMessages }) => {
            const allMessages = await TutorialMessages.find({ TutorialID });

            return allMessages;
        },
        getClaims: async (root, args, { Claims }) => {
            const allClaims = await Claims.find();
            return allClaims;
        },
        getOrders: async (root, args, { Orders }) => {
            const allOrders = await Orders.find();
            return allOrders;
        },
        getSpecificOrder: async (root, { userName, TutorialID }, { Orders }) => {
            const allOrders = await Orders.find({ userName, TutorialID });
            return allOrders;
        },
        getRatingsAndComments: async (root, { TutorialID }, { RatingsAndComments }) => {
            const comment = await RatingsAndComments.find({ TutorialID }).sort({
                createdDate: -1 // descending
            });
            return comment;
        },
        getRatingsAndCommentsExcept: async (root, { TutorialID }, { RatingsAndComments }) => {
            const comment = await RatingsAndComments.find({ TutorialID, rating: { $ne: 0 } });
            return comment;
        },
        getRatingAndComment: async (root, { TutorialID, rating }, { RatingsAndComments }) => {
            const comment = await RatingsAndComments.find({ TutorialID, rating });
            return comment;
        },
        getBlogComments: async (root, { BlogID }, { BlogComment }) => {
            const comment = await BlogComment.find({ BlogID });

            return comment;
        },
        getQuizzes: async (root, { LectureID }, { Quizzes }) => {
            const Quiz = await Quizzes.find({ LectureID });

            return Quiz;
        },
        getBlogs: async (root, args, { Blogs }) => {
            const allBlogs = await Blogs.find();

            return allBlogs;
        },

    },
    Mutation: {
        // add tutorial to database
        addTutorial: async (root, { name, description, userName, price, image, duration }, { Tutorial }) => {

            const newTutorial = await new Tutorial({
                name,
                description,
                userName,
                price,
                image,
                duration,
                createdDate: new Date().toISOString()
            }).save();
            return newTutorial;
        },
        signupUser: async (root, { firstName, lastName, email, userName, password, isUser, isAdmin, isTeacher, isMentor, profileImage }, { User }) => {

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
                isMentor,
                profileImage
            }).save();

            return { token: createToken(newUser, process.env.SECRET, "1hr") };
        },

        signinUser: async (root, { email, password }, { User }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('Email Not Found');
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

        editProfileImage: async (root, { email, profileImage }, { User }) => {

            const user = await User.findOneAndUpdate({ email }, { $set: { profileImage } }, { new: true });

            if (!user) {
                throw new Error('User Not Found');
            }

            return user;

        },

        passwordReset: async (root, { email }, { User }) => {
            const user = await User.find({ email });
            const userFirstname = user[0].firstName;
            const saltRounds = 10;
            const generatedPassword = generator.generate({ length: 16, numbers: true });

            const generateHTML = (filename, options = {}) => {
                const html = pug.renderFile(`${__dirname}/../assets/${filename}.pug`, options);
                const inlined = juice(html);
                return inlined;
            }

            const mailer = nodemailer.createTransport({
                host: process.env.NODEMAILER_HOST,
                port: process.env.NODEMAILER_PORT,
                auth: {
                    user: process.env.NODEMAILER_AUTH_USER,
                    pass: process.env.NODEMAILER_AUTH_PW
                }
            });
            const html = generateHTML('resetPassword', { generatedPassword, userFirstname, email });
            const text = htmlToText.fromString(html);
            mailer.sendMail({
                from: process.env.NODEMAILER_FROM_EMAIL,
                to: email,
                subject: 'LevelUpSpace - Password Reset',
                html,
                text
            });

            return bcrypt.hash(generatedPassword, saltRounds).then(async function (hash) {

                const user = await User.findOneAndUpdate({ email }, { $set: { password: hash } }, { new: true });

                if (!user) {
                    throw new Error('User Not Found');
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
        addLecture: async (root, { name, description, SectionID, video }, { Lecture }) => {
            const lecture = await Lecture.findOne({ name });
            if (!lecture) {
                const newLecture = await new Lecture({
                    name,
                    description,
                    SectionID,
                    video,
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
        addTutorialMessages: async (root, { TutorialID, message, userName }, { TutorialMessages }) => {

            const newMessage = await new TutorialMessages({
                TutorialID,
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
        addOrders: async (root, { TutorialID, userName }, { Orders }) => {

            const newOrder = await new Orders({
                TutorialID,
                userName,
                createdDate: new Date().toISOString()
            }).save();

            return newOrder;
        },
        addRatingAndComment: async (root, { TutorialID, userName, comment, rating }, { RatingsAndComments }) => {

            const newComment = await new RatingsAndComments({
                TutorialID,
                userName,
                comment,
                rating,
                createdDate: new Date().toISOString()
            }).save();

            return newComment;
        },

        addBlogComment: async (root, { BlogID, userName, comment }, { BlogComment }) => {

            const newComment = await new BlogComment({
                BlogID,
                userName,
                comment,
                createdDate: new Date().toISOString()
            }).save();

            return newComment;
        },

        addQuiz: async (root, { QuizQuestion, QuizName, answers, correctAnswer, LectureID }, { Quizzes }) => {

            const newQuiz = await new Quizzes({
                QuizQuestion,
                LectureID,
                QuizName,
                answers,
                correctAnswer
            }).save();

            return newQuiz;
        },
        editQuiz: async (root, { _id, QuizQuestion, QuizName, answers, correctAnswer }, { Quizzes }) => {
            const updatedQuiz = await Quizzes.findOneAndUpdate({ _id }, { $set: { QuizQuestion, QuizName, answers, correctAnswer } }, { new: true });
            return updatedQuiz;
        },
        deleteQuiz: async (root, { _id }, { Quizzes }) => {
            const quiz = await Quizzes.findOne({ _id });

            if (quiz) {
                const removeQuiz = await Quizzes.remove(quiz);
                return removeQuiz;
            }
        },
        addBlogs: async (root, { title, category, subject, content, userName, image }, { Blogs }) => {
            const newBlog = await new Blogs({
                title,
                category,
                subject,
                content,
                userName,
                image,
                createdDate: new Date().toISOString()
            }).save();
            return newBlog;
        },
        editBlogs: async (root, { _id, newTitle, newCategory, newSubject, newContent }, { Blogs }) => {

            const changeBlogs = await Blogs.findOneAndUpdate({ _id }, { $set: { title: newTitle, category: newCategory, subject: newSubject, content: newContent } }, { new: true });
            return changeBlogs;

        },
        deleteBlogs: async (root, { _id }, { Blogs }) => {
            const blog = await Blogs.findOne({ _id });

            if (blog) {
                const removeBlogs = await Blogs.remove(blog);
                return removeBlogs;
            }
        },
    }
};