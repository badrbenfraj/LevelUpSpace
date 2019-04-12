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

type Query {
    getCurrentUser: User

    getAllTutorials:[Tutorial]

    getAllUsers: [User]

    getAllTeachers: [User]

    getAllMentors: [User]

    getSections: [Section]

    getLectures: [Lecture]

    getMessages: [Messages]

    getClaims: [Claim]
}


type Mutation{
    addTutorial(name: String!, description: String!, userName: String): Tutorial
    
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
}
`;



