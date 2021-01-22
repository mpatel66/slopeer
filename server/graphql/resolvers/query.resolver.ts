import User from '../../models/user.model';
import Route from '../../models/route.model';

// exports.routes = async (_, args) =>
//   await Route.find({ ...args })
//     .populate('author');

// exports.route = async (_, { _id }) => await Route.findById(_id).populate('author');

// exports.user = async (_, { _id }) =>
//   await User.findById(_id)
//     .populate('saved_routes')
//     .populate('owned_routes');

const query = {
  routes: async (_, args) => await Route.find({ ...args }).populate('author'),

  route: async (_, { _id }) => await Route.findById(_id).populate('author'),
  
  user: async (_, { _id }) =>
  await User.findById(_id)
    .populate('saved_routes')
    .populate('owned_routes'),

}

export default query;