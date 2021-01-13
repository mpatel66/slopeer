const app = require('express')();
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { jwtCheck } = require('../middleware/jwtCheck');

const server = new ApolloServer({
  typeDefs: require('./schemas'),
  resolvers: require('./resolvers'),
  context: ({ req, res }) => ({ req, res })
});
app.use(cors(), jwtCheck);
server.applyMiddleware({ app });

module.exports = app;
