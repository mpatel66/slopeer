const express = require('express');
const cors = require('cors');
const { graphqlUploadExpress } = require('graphql-upload');
const { ApolloServer } = require('apollo-server-express');
const { jwtCheck } = require('../middleware/jwtCheck');

const server = new ApolloServer({
  typeDefs: require('./schemas'),
  resolvers: require('./resolvers'),
  context: ({ req, res }) => ({ req, res }),
  uploads: false
});

const app = express();

app.use(
  cors(),
  express.static('public'),
  jwtCheck,
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 11 }));

server.applyMiddleware({ app });

module.exports = app;
