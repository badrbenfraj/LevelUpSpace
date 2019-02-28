const { gql } = require('apollo-server-express');
exports.typeDefs = gql`
type Query {
    getAllTutorials:[Tutorial]
}

type Mutation{
    addTutorial(name: String!, category: String!, description: String!, username: String): Tutorial
    signupUser(username: String!, email:String!, password: String!): Token
    signinUser(email:String!, password:String!): Token
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
type Token{
    token: String!
}
type User {
    _id : ID
    username: String! 
    password: String!
    email: String!
    joinDate: String
    favorites: [Tutorial]
}
`;



