const app = require('express')();
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const server = new ApolloServer();
app.use(cors());
server.applyMiddleware({ app });

module.exports = app;
