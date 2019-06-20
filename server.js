const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './variables.env' });
const cors = require('cors');
// bring in graphql express middleware
const { ApolloServer } = require('apollo-server-express');

const http = require('http');

const { resolvers } = require('./graphql/resolvers');
const { typeDefs } = require('./graphql/schema');

const User = require('./models/User');
const Tutorial = require('./models/Tutorial');
const Section = require('./models/Section');
const Lecture = require('./models/Lecture');
const Messages = require('./models/Messages');
const TutorialMessages = require('./models/TutorialMessages');
const Claims = require('./models/Claim');
const Orders = require('./models/Order');
const RatingsAndComments = require('./models/RatingAndComment');
const Quizzes = require('./models/Quiz');
const Blogs = require('./models/Blogs');
const BlogComment = require('./models/BlogComments');
const Camp = require('./models/Camp');

// connect to database
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log("DB connected!!")
  })
  .catch(err => console.log(err));
const PORT = process.env.PORT || 3001;
// Initializes application
const app = express();
const server = http.Server(app);

app.use(cors("*"));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'));

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

// Set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
      console.log(currentUser)
    } catch (err) {
      console.error(err);
    }
  }
  next();
});


// Create schema
const schema = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      Tutorial,
      User,
      Section,
      Lecture,
      Messages,
      TutorialMessages,
      Claims,
      Orders,
      RatingsAndComments,
      BlogComment,
      Quizzes,
      Blogs,
      Camp,
      currentUser: req.currentUser
    }
  }
});
// Connect schemas with GraphQL
schema.applyMiddleware({ app });

server.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:3001${schema.graphqlPath}`)
)
