import { gql } from 'apollo-boost';

// Tutorials Queries
export const GET_ALL_TUTORIALS = gql`
    query {
        getAllTutorials{
            name
            category
            description
            createdDate
            likes
            username
        }
    }
`;





// Tutorials Mutation




// User Queries
export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            firstName
            lastName
            joinDate
            userName
            email
            profileImage
        }
    }
`;



// User Mutation

export const SIGNUP_USER = gql`
    mutation($firstName: String!, $lastName: String!, $email: String!, $userName: String!, $password: String!){
        signupUser(firstName: $firstName, lastName: $lastName, email: $email, userName: $userName, password: $password){ 
            token 
        }
    }
`;

export const SIGNIN_USER = gql`
    mutation($email: String!, $password: String!){
        signinUser(email: $email, password: $password){ 
            token 
        }
    }
`;

