const { User } = require('../../models');

const getRoutes = async (_id, routes) => {
  const user = await User.findById(_id).populate(routes);
  return user[routes];
};

exports.get_owned_routes = async ({ _id }) => await getRoutes(_id, 'owned_routes');

exports.get_saved_routes = async ({ _id }) => await getRoutes(_id, 'saved_routes');

exports.get_author = async ({ author: id }) => await User.findById(id);
