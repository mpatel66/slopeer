import query from './query.resolver';
import types from './types.resolver';
import { GraphQLUpload } from 'graphql-upload';
import { createRoute, createUser, login, removeRoute, saveRoute, unsaveRoute, updateRoute, updateUser } from './mutation.resolver';

const resolvers = {
  FileUpload: GraphQLUpload,
  Query: {
    routes: query.routes,
    route: query.route,
    user: query.user
  },
  Mutation: {
    createRoute: createRoute,
    updateRoute: updateRoute,
    removeRoute: removeRoute,
    createUser: createUser,
    updateUser: updateUser,
    saveRoute: saveRoute,
    unsaveRoute: unsaveRoute,
    login: login
  },
  User: {
    owned_routes: types.get_owned_routes,
    saved_routes: types.get_saved_routes
  },
  Route: {
    author: types.get_author
  }
};

export default resolvers;