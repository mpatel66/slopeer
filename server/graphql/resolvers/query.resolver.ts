import User from '../../models/user.model';
import Route from '../../models/route.model';
import IUser from '../../types/user';
import IRoutes, { routeType } from '../../types/route';

// exports.routes = async (_, args) =>
//   await Route.find({ ...args })
//     .populate('author');

// exports.route = async (_, { _id }) => await Route.findById(_id).populate('author');

// exports.user = async (_, { _id }) =>
//   await User.findById(_id)
//     .populate('saved_routes')
//     .populate('owned_routes');



// routes will take an authorID and a boolean according to the querySchema file.
interface IArgs {
  author: IUser['id'];
  public: boolean;
}

const query = {
  routes: async (_: any, args: IArgs): Promise<IRoutes[]> => await Route.find({ ...args }).populate('author'),

  route: async (_: any, { _id }: IRoutes['_id']): Promise<IRoutes> => await Route.findById(_id).populate('author'),
  
  user: async (_: any, { _id }: IUser['_id']): Promise<IUser> =>
  await User.findById(_id)
    .populate(routeType.SAVED)
    .populate(routeType.OWNED),
}

export default query;