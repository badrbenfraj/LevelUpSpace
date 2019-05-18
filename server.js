const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './variables.env' });
const cors = require('cors');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
// bring in graphql express middleware
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const socketIO = require('socket.io');

const { resolvers } = require('./graphql/resolvers');
const { typeDefs } = require('./graphql/schema');

const User = require('./models/User');
const Tutorial = require('./models/Tutorial');
const Section = require('./models/Section');
const Lecture = require('./models/Lecture');
const Messages = require('./models/Messages');
const Claims = require('./models/Claim');
const Blogs = require('./models/Blogs');
const Orders = require('./models/Order');
const Comments = require('./models/Comment');
const Quiz = require('./models/Quiz');



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
const io = socketIO(server);

// const corsOptions = {
//     origin: 'http://localhost:3000/',
//     credentials: 'same-origin' // <-- REQUIRED backend setting
//   };


app.use(cors("*"));


// Set up JWT authentication middleware
app.use(async (req, response, next) => {
  const token = req.headers["authorization"];
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
      // console.log(currentUser)
    } catch (err) {
      console.error(err);
    }
  }
  next();
});


app.post('/password-reset', (req, response) => {

  var mailer = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PW
    }
  });

  mailer.use('compile', hbs({
    viewPath: 'assets/email_templates',
    extName: '.hbs'
  }));

  mailer.sendMail({
    from: process.env.NODEMAILER_FROM_EMAIL,
    to: req.body.email,
    subject: 'Level Up Space - Password Reset',
    template: 'passwordReset',
    context: {
      email: req.body.email,
      password: req.body.generatedPassword
    }
  }, function (err, res) {
    if (err) {
      // console.log(err)
      return response.status(500).send('500 - Internal Server Error')
    }
    response.status(200).send('200 - The request has succeeded.')
  });

});
app.use('/static', express.static('./server/static'));


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
      Claims,
      Blogs,
      Orders,
      Comments,
      Quiz,
      currentUser: req.currentUser
    }
  }
});


// Connect schemas with GraphQL
schema.applyMiddleware({ app });

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function (data) {
    io.emit('RECEIVE_MESSAGE', data);
  })
});

server.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:3001${schema.graphqlPath}`)
)

app.get('/', (req, response) => {
  mongoose.find({}, (err, data) => {
    if (err) return response.status(500).send(err);
    response.json(data);
  });
});