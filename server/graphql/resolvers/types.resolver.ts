import User from '../../models/user.model';
import { OutcomingUser } from '../../types/user';


const getRoutes = async (_id: OutcomingUser['_id'], routes: string): Promise<string[]> => {
  const user: OutcomingUser = await (await User.findById(_id)).execPopulate(routes);
  return user[routes as keyof typeof user];
  // return user[routes];x
};

const types = {
  get_owned_routes: async ({ _id }: OutcomingUser['_id']):Promise<OutcomingUser['owned_routes']> => await getRoutes(_id, 'owned_routes'),

  get_saved_routes: async ({ _id }: OutcomingUser['_id']):Promise<OutcomingUser['saved_routes']> => await getRoutes(_id, 'saved_routes'),

  get_author: async ({ author: id }: OutcomingUser['_id']): Promise<OutcomingUser> => {
    const user = await User.findById(id);
    return user;
  }
};

export default types;