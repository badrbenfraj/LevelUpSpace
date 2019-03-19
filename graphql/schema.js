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
    category: String!
    description: String!
    createdDate: String!
    likes: Int
    userName: String!
}

type Chat {
  id: ID! @unique
  createdAt: DateTime!
  updatedAt: DateTime!
  message: String!
  author: User
}

type Query {
    getCurrentUser: User

    getAllTutorials:[Tutorial]

    getAllUsers: [User]

    getAllTeachers: [User]

    getAllMentors: [User]
}

type Mutation{
    addTutorial(name: String!, category: String!, description: String!, username: String): Tutorial
    
    signupUser(firstName: String!, lastName: String!, email: String!, userName: String!, password: String!, isUser:Boolean!, isAdmin: Boolean!, isTeacher: Boolean!, isMentor: Boolean!): Token
    
    signinUser(email: String!, password: String!): Token

    changeEmail(currentEmail: String!, newEmail: String!): User

    changePassword(email: String!, password: String!): User

    passwordReset(email: String!): User

    deleteUser(_id: ID): User
}

`;



