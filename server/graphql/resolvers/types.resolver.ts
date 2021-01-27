import User from '../../models/user.model';
import { OutcomingUser } from '../../types/user';


const getRoutes = async (_id: OutcomingUser['_id'], routes: string) => {
  try {
    const user = await User.findById(_id);
    if (!user) throw 'No User Found';
    else {
      const populatedUser = await user.populate(routes).execPopulate();
      console.log('populated routes', populatedUser);
      return populatedUser.get(routes);
    }
  } catch (e) {
    console.log(e);
  }
};

const types = {
  get_owned_routes: async ({ _id }: OutcomingUser['_id']):Promise<OutcomingUser['owned_routes']> => {
    try {
      return await getRoutes(_id, 'owned_routes');
    } catch (e) {
      console.log(e);
    }
  },

  get_saved_routes: async ({ _id }: OutcomingUser['_id']):Promise<OutcomingUser['saved_routes']> => {
    try {
      return await getRoutes(_id, 'saved_routes');
    } catch (e) {
      console.log(e);
    }
  },

  get_author: async ({ author: id }: OutcomingUser['_id']): Promise<OutcomingUser|undefined> => {
    try {
      const user = await User.findById(id);
      if (!user) throw 'No user found';
      else return user;
    } catch (e) {
      console.log(e);
    }
  }
};

export default types;