const { gql } = require('apollo-server-express');
exports.typeDefs = gql`
type User {
    _id: ID
    firstName: String! 
    lastName: String!
    password: String!
    profileImage: String
    email: String!
    userName: String!
    joinDate: String
    isUser: Boolean!
    isAdmin: Boolean!
    isTeacher: Boolean!
    isMentor: Boolean!
}

type Token {
    token: String!
}

type Tutorial{ 
    _id : ID
    name: String!
    description: String!
    price: String!
    image: String
    duration: String!
    createdDate: String!
    User: User!
}

type Section{ 
    _id : ID
    name: String!
    description: String!
    createdDate: String!
    TutorialID: String!
}

type Lecture{ 
    _id : ID
    name: String!
    description: String!
    createdDate: String!
    SectionID: String!
    video: String!
}

type Messages{ 
    _id : ID
    message: String!
    createdDate: String!
    User: User
}

type TutorialMessages{ 
    _id : ID
    message: String!
    userName: String!
    TutorialID: String!
    createdDate: String!
}

type Claim{
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    subject: String!
    description: String!
}

type Order{
    _id: ID
    TutorialID: String!
    userName: String!
    createdDate: String!
}

type RatingsAndComments{
    _id: ID
    comment: String!
    TutorialID: String!
    userName: String!
    createdDate: String!
    rating: Int!
}

type BlogComment{
    _id: ID
    comment: String!
    BlogID: String!
    User: User!
    createdDate: String!
}

type Quiz{
    _id: ID
    QuizName: String!
    LectureID: String!
    answers: [String!]
    correctAnswer: String!
    QuizQuestion: String!
}

type Blogs{ 
    _id : ID
    title: String!
    category: String!
    subject: String!
    content: String!
    image: String
    User: User!
    createdDate: String!
}

type Camp{ 
    _id : ID
    CampName: String!
    url: String!
    DateAndTime: String!
    createdDate: String!
    Mentor: User!
    Canceled: Boolean!
}

type Query {
    getCurrentUser: User

    getAllTutorials:[Tutorial]

    getTutorial(_id: ID):[Tutorial]

    getAllUsers: [User]

    getUser(userName: String!): User

    getAllTeachers: [User]

    getAllMentors: [User]

    getSections(TutorialID: String!): [Section]

    getLectures(SectionID: String!): [Lecture]

    getMessages: [Messages]

    getTutorialMessages(TutorialID: String!): [TutorialMessages]

    getClaims: [Claim]

    getOrders: [Order]

    getSpecificOrder(TutorialID: String!, userName: String!): [Order]

    getRatingsAndComments(TutorialID: String!): [RatingsAndComments]

    getRatingsAndCommentsExcept(TutorialID: String!): [RatingsAndComments]

    getRatingAndComment(TutorialID: String!, rating: Int!): [RatingsAndComments]

    getBlogComments(BlogID: String!): [BlogComment]

    getQuizzes(LectureID: String): [Quiz]!

    getBlogs: [Blogs]

    getBlog(_id: ID!): Blogs

    getCamps: [Camp]
}


type Mutation{
    addTutorial(name: String!, description: String!, price: String!, duration: String!, UserID: ID, image: String!): Tutorial
    
    signupUser(firstName: String!, lastName: String!, email: String!, userName: String!, password: String!, isUser:Boolean!, isAdmin: Boolean!, isTeacher: Boolean!, isMentor: Boolean!, profileImage: String!): Token
    
    signinUser(email: String!, password: String!): Token

    changeEmail(currentEmail: String!, newEmail: String!): User

    changePassword(email: String!, password: String!): User

    editProfileImage(email: String!, profileImage: String!): User

    passwordReset(email: String!): User

    deleteUser(_id: ID): User

    deleteTutorial(_id: ID): Tutorial

    changeTutorialName(_id: ID!, newName: String!, newDescription: String!): Tutorial

    addSection(name: String!, description: String!, TutorialID: String!): Section

    deleteSection(_id: ID): Section

    editSection(_id: ID!, newName: String!, newDescription: String!): Section

    addLecture(name: String!, description: String!, SectionID: String!, video: String): Lecture

    deleteLecture(_id: ID): Lecture

    editLecture(_id: ID!, newName: String!, newDescription: String!): Lecture

    addMessages(message: String!, _id: ID!): Messages

    addTutorialMessages(TutorialID: String!, message: String!, userName: String!): TutorialMessages
    
    addClaim(firstName: String!, lastName: String!, email: String!, subject: String!, description: String!): Claim

    addOrders(TutorialID: String!, userName: String!): Order

    addRatingAndComment(comment: String!, userName: String!, TutorialID: String!, rating: Int!): RatingsAndComments

    addBlogComment(comment: String!, userName: String!, BlogID: String!): BlogComment

    addQuiz(QuizName: String!, answers: [String!], correctAnswer: String!, QuizQuestion:String!, LectureID: String!): Quiz

    editQuiz(_id: ID!, QuizName: String!, answers: [String!], correctAnswer: String!, QuizQuestion:String!): Quiz

    deleteQuiz(_id: ID): Quiz 

    addBlogs(title: String!, category: String!, subject: String!, content: String!, User: ID, image: String!): Blogs

    editBlogs(_id: ID! newTitle: String!, newCategory: String!, newSubject: String!, newContent: String!): Blogs

    deleteBlogs(_id: ID!): Blogs

    addCamp(CampName: String!, url: String!, DateAndTime: String!, _id: ID!): Camp

    editCamp(CampName: String!, url: String!, DateAndTime: String!, _id: ID!): Camp

    cancelCamp(Canceled: Boolean!, _id: ID!): Camp
}
`;



