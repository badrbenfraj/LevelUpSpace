import { gql } from 'apollo-boost';

// Tutorials Queries
export const GET_ALL_TUTORIALS = gql`
    query {
        getAllTutorials{
            name, 
            category,
            description,
            createdDate,
            likes,
            username
        }
    }
`;





// Tutorials Mutation




// User Queries




// User Mutation

export const SIGNUP_USER = gql`
    mutation($username:String!, $email:String!, $password:String!){
	    signupUser(username:$username, email:$email, password:$password){
            token
  } 
}
`;

