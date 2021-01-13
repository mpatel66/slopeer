const app = require('express')();
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const server = new ApolloServer();
app.use(cors(), jwtCheck);
server.applyMiddleware({ app });

module.exports = app;
