const { gql } = require('apollo-server-express');
exports.typeDefs = gql`
type User {
    _id: ID
    firstName: String! 
    lastName: String!
    password: String!
    bio: String
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
    duration: String!
    createdDate: String!
    userName: String!
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
}

type Messages{ 
    _id : ID
    message: String!
    userName: String!
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

type Comment{
    _id: ID
    comment: String!
    TutorialID: String!
    userName: String!
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
    userName: String!
    createdDate: String!
}

type Query {
    getCurrentUser: User

    getAllTutorials:[Tutorial]

    getAllUsers: [User]

    getAllTeachers: [User]

    getAllMentors: [User]

    getSections(TutorialID: String!): [Section]

    getLectures(SectionID: String!): [Lecture]

    getMessages: [Messages]

    getClaims: [Claim]

    getOrders: [Order]

    getComments(TutorialID: String!): [Comment]

    getQuizzes(LectureID: String): [Quiz]!

    getBlogs: [Blogs]
}


type Mutation{
    addTutorial(name: String!, description: String!, price: String!, duration: String!, userName: String): Tutorial
    
    signupUser(firstName: String!, lastName: String!, email: String!, userName: String!, password: String!, isUser:Boolean!, isAdmin: Boolean!, isTeacher: Boolean!, isMentor: Boolean!): Token
    
    signinUser(email: String!, password: String!): Token

    changeEmail(currentEmail: String!, newEmail: String!): User

    changePassword(email: String!, password: String!): User

    passwordReset(email: String!): User

    deleteUser(_id: ID): User

    deleteTutorial(_id: ID): Tutorial

    changeTutorialName(_id: ID!, newName: String!, newDescription: String!): Tutorial

    addSection(name: String!, description: String!, TutorialID: String!): Section

    deleteSection(_id: ID): Section

    editSection(_id: ID!, newName: String!, newDescription: String!): Section

    addLecture(name: String!, description: String!, SectionID: String!): Lecture

    deleteLecture(_id: ID): Lecture

    editLecture(_id: ID!, newName: String!, newDescription: String!): Lecture

    addMessages(message: String!, userName: String!): Messages
    
    addClaim(firstName: String!, lastName: String!, email: String!, subject: String!, description: String!): Claim

    addOrders(TutorialID: String!, userName: String!): Order

    addComment(comment: String!, userName: String!, TutorialID: String!): Comment

    addQuiz(QuizName: String!, answers: [String!], correctAnswer: String!, QuizQuestion:String!, LectureID: String!): Quiz

    editQuiz(_id: ID!, QuizName: String!, answers: [String!], correctAnswer: String!, QuizQuestion:String!): Quiz

    deleteQuiz(_id: ID): Quiz 

    addBlogs(title: String!, category: String!, subject: String!, content: String!, userName: String): Blogs

    editBlogs(_id: ID! newTitle: String!, newCategory: String!, newSubject: String!, newContent: String!): Blogs

    deleteBlogs(_id: ID!): Blogs
}
`;



