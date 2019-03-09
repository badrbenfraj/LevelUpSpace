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

type Tutorial{ 
    _id : ID
    name: String!
    category: String!
    description: String!
    createdDate: String!
    likes: Int
    userName: String!
}

type Team {
    owner: User!
    members: [User!]!
    channel:[Channel!]!
}

type Channel {
    _id: ID
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]!
}

type Message {
    _id: ID
    text: String!
    user: User!
    channel: Channel!
}

type Query {
    getCurrentUser: User

    getAllTutorials:[Tutorial]

    getAllUsers: [User]
}

type Mutation{
    addTutorial(name: String!, category: String!, description: String!, username: String): Tutorial
    
    signupUser(firstName: String!, lastName: String!, email: String!, userName: String!, password: String!): Token
    
    signinUser(email: String!, password: String!): Token

    changeEmail(currentEmail: String!, newEmail: String!): User

    changePassword(email: String!, password: String!): User

    passwordReset(email: String!): User

    createTeam(name: String!): Boolean!

    createMessage(channelId: Int!, text: String!): Boolean!

    createChannel(name: String!, public: Boolean=false): Boolean!

}

`;



