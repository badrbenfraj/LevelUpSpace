import { gql } from 'apollo-boost';





// Tutorials Queries
export const GET_ALL_TUTORIALS = gql`
    query {
        getAllTutorials{
            _id
            name
            price
            duration
            description
            createdDate
            userName
        }
    }
`;

export const GET_SECTIONS = gql`
    query ($TutorialID: String!) {
        getSections(TutorialID: $TutorialID){
            _id
            name
            description
            createdDate
            TutorialID
        }
    }
`;

export const GET_LECTURES = gql`
    query ($SectionID: String!){
        getLectures(SectionID: $SectionID){
            _id
            name
            description
            createdDate
            SectionID
        }
    }
`;


// Message Query

export const GET_ALL_MESSAGES = gql`
    query {
        getMessages{
            _id
            userName
            message
            createdDate
        }
    }
`;




// Tutorials Mutation

export const ADD_TUTORIAL = gql`
    mutation($name: String!, $description: String!, $price: String!, $duration: String!, $userName: String!){
        addTutorial( name: $name description: $description price:$price duration:$duration userName:$userName){ 
            name
        }
    }
`;

export const DELETE_Tutorial = gql`
  mutation($_id: ID!) {
    deleteTutorial(_id: $_id) {
      _id
    }
  }
`;


export const CHANGE_TUTORIAL_NAME = gql`
    mutation($_id: ID!, $newName: String!, $newDescription: String!){
        changeTutorialName(_id: $_id, newName: $newName, newDescription: $newDescription){
           _id
        }
    }
`;


export const ADD_SECTION = gql`
    mutation($name: String!, $description: String!, $ID: String!){
        addSection( name: $name description: $description, TutorialID:$ID){ 
            name
        }
    }
`;


export const DELETE_SECTION = gql`
  mutation($_id: ID!) {
    deleteSection(_id: $_id) {
      _id
    }
  }
`;


export const EDIT_SECTION = gql`
    mutation($_id: ID!, $newName: String!, $newDescription: String!){
        editSection(_id: $_id, newName: $newName, newDescription: $newDescription){
           _id
        }
    }
`;

export const ADD_LECTURE = gql`
    mutation($name: String!, $description: String!, $ID: String!){
        addLecture( name: $name description: $description, SectionID:$ID){ 
            name
        }
    }
`;


export const DELETE_LECTURE = gql`
  mutation($_id: ID!) {
    deleteLecture(_id: $_id) {
      _id
    }
  }
`;


export const EDIT_LECTURE = gql`
    mutation($_id: ID!, $newName: String!, $newDescription: String!){
        editLecture(_id: $_id, newName: $newName, newDescription: $newDescription){
           _id
        }
    }
`;








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

export const GET_ALL_USERS = gql`
    query {
        getAllUsers{
            _id
            firstName
            lastName
            joinDate
            userName
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


// Message Mutation

export const SEND_MESSAGE = gql`
    mutation($message: String!, $userName: String!){
        addMessages(message: $message, userName: $userName){
            message
            userName
        }
    }
`;

//Claim mutation
export const ADD_CLAIM = gql`
  mutation($firstName: String!, $lastName: String!, $email: String!, $subject: String!, $description: String!){
    addClaim(firstName: $firstName, lastName : $lastName, email: $email, subject: $subject, description: $description ){
        email
      }
  }
`;


//Claim Query

export const GET_ALL_CLAIMS = gql`
    query {
        getClaims{
            _id
            firstName
            lastName
            email
            subject
            description
        }
    }
`;


//Orders Query

export const GET_ALL_ORDERS = gql`
    query {
        getOrders{
            _id
            TutorialID
            userName
            createdDate
        }
    }
`;

//Orders Mutation

export const ADD_ORDER = gql`
  mutation($TutorialID: String!, $userName: String!){
    addOrders(TutorialID: $TutorialID, userName : $userName){
        TutorialID
        userName
      }
  }
`;


//Orders Query

export const GET_COMMENTS = gql`
    query ($TutorialID: String!){
        getComments(TutorialID: $TutorialID){
            _id
            TutorialID
            userName
            createdDate
            comment
        }
    }
`;

//Orders Mutation

export const ADD_COMMENT = gql`
  mutation($TutorialID: String!, $userName: String!, $comment: String!){
    addComment(TutorialID: $TutorialID, userName : $userName, comment : $comment){
        TutorialID
        userName
      }
  }
`;

//Quiz Query

export const GET_QUIZZES = gql`
    query ($SectionID: String){
        getQuizzes(SectionID: $SectionID){
            _id
            QuizQuestion
            SectionID
            QuizName 
            option1
            option2 
            option3 
            correctAnswer
        }
    }
`;

//Quiz Mutation

export const ADD_QUIZ = gql`
  mutation($SectionID: String!, $QuizName: String!, $QuizQuestion: String!, $option1: String!, $option2: String!, $option3: String!, $correctAnswer: String!){
    addQuiz(SectionID: $SectionID, QuizName: $QuizName, QuizQuestion: $QuizQuestion, option1: $option1, option2: $option2, option3: $option3, correctAnswer: $correctAnswer){
        SectionID
      }
  }
`;

export const EDIT_QUIZ = gql`
    mutation($_id: ID!, $QuizName: String!, $QuizQuestion: String!, $option1: String!, $option2: String!, $option3: String!, $correctAnswer: String!){
        editQuiz(_id: $_id, QuizName: $QuizName, QuizQuestion: $QuizQuestion, option1: $option1, option2: $option2, option3: $option3, correctAnswer: $correctAnswer){
           _id
        }
    }
`;

export const DELETE_QUIZ = gql`
  mutation($_id: ID!) {
    deleteQuiz(_id: $_id) {
      _id
    }
  }
`;