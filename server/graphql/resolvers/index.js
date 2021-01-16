const query = require('./query.resolver');
const mutation = require('./mutation.resolver');
const types = require('./types.resolver');
const { GraphQLUpload } = require('graphql-upload');

module.exports = {
  FileUpload: GraphQLUpload,
  Query: {
    routes: query.routes,
    route: query.route,
    user: query.user
  },
  Mutation: {
    createRoute: mutation.createRoute,
    updateRoute: mutation.updateRoute,
    removeRoute: mutation.removeRoute,
    createUser: mutation.createUser,
    updateUser: mutation.updateUser,
    saveRoute: mutation.saveRoute,
    unsaveRoute: mutation.unsaveRoute,
    login: mutation.login
  },
  User: {
    owned_routes: types.get_owned_routes,
    saved_routes: types.get_saved_routes
  },
  Route: {
    author: types.get_author
  }
};
