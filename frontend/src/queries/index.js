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
            isUser
            isAdmin
            isTeacher
            isMentor
        }
    }
`;

export const GET_ALL_TEACHERS = gql`
    query {
        getAllTeachers{
            _id
            firstName
            lastName
            userName
        }
    }
`;

export const GET_ALL_MENTORS = gql`
    query {
        getAllMentors{
            _id
            firstName
            lastName
            userName
        }
    }
`;



// User Mutation

export const SIGNUP_USER = gql`
    mutation($firstName: String!, $lastName: String!, $email: String!, $userName: String!, $password: String!, $isUser:Boolean!, $isAdmin: Boolean!, $isTeacher: Boolean!, $isMentor: Boolean!){
        signupUser(firstName: $firstName, lastName: $lastName, email: $email, userName: $userName, password: $password, isUser:$isUser, isAdmin:$isAdmin, isTeacher:$isTeacher, isMentor:$isMentor){ 
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

export const CHANGE_EMAIL = gql`
    mutation($currentEmail: String!, $newEmail: String!){
        changeEmail(currentEmail: $currentEmail, newEmail: $newEmail){
            email
        }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation($email: String!, $password: String!){
        changePassword(email: $email, password: $password){
            email
        }
    }
`;

export const RESET_PASSWORD = gql`
    mutation($email: String!){
        passwordReset(email: $email){
            email
        }
    }
`;

export const DELETE_USER = gql`
  mutation($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`;