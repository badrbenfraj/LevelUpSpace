const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './variables.env' });
const cors = require('cors');
// bring in graphql express middleware
const { ApolloServer } = require('apollo-server-express');

const { resolvers } = require('./graphql/resolvers');
const { typeDefs } = require('./graphql/schema');

const User = require('./models/User');
const Tutorial = require('./models/Tutorial');

// connect to database
mongoose
    .connect(process.env.Mongo_URL)
    .then(() => {
        console.log("DB connected!!")
    })
    .catch(err => console.log(err));
const PORT = process.env.PORT || 3001;
// Initializes application
const app = express();
// const corsOptions = {
//     origin: 'http://localhost:3000/',
//     credentials: true
// };
app.use(cors());

// Create schema
const schema = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        Tutorial,
        User
    }
});
// Connect schemas with GraphQL
schema.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:3001${schema.graphqlPath}`)
)
