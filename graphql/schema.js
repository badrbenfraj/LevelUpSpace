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
}

type Token {
    token: String!
}

type Query {
    getCurrentUser: User

    getAllTutorials:[Tutorial]
}

type Mutation{
    addTutorial(name: String!, category: String!, description: String!, username: String): Tutorial
    
    signupUser(firstName: String!, lastName: String!, email: String!, userName: String!, password: String!): Token
    
    signinUser(email: String!, password: String!): Token
}
type Tutorial{ 
    _id : ID
    name: String!
    category: String!
    description: String!
    createdDate: String!
    likes: Int
    username: String!
}
`;



