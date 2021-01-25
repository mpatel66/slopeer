import User from '../../models/user.model';
import Route from '../../models/route.model';
import IUser, { OutcomingUser } from '../../types/user';
import IRoutes, { OutcomingRoute } from '../../types/route';

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
  routes: async (_: any, args: IArgs): Promise<OutcomingRoute[]> => await Route.find({ ...args }).populate('author'),

  route: async (_: any, { _id }: IRoutes['_id']): Promise<OutcomingRoute|null> => {
    const route = await Route.findById(_id);
    if (route) {
      return (await route.populate('author'));
    }
    else {
      return null;
    }
  },
  
  user: async (_: any, { _id }: IUser['_id']): Promise<OutcomingUser|null> => {
    const user = await User.findById(_id);
    if (user) {
      return (await user
        .populate('saved_routes')
        .populate('owned_routes'));
    } else {
      return null;
    }
  }

};

export default query;