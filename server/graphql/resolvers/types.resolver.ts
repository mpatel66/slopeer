import { ObjectId } from "mongoose";
import User from "../../models/user.model";
import IRoute from "../../types/route";
import IUser from "../../types/user";


const getRoutes = async (_id: IRoute["_id"], routes): Promise<IRoute[]> => {
  const user: IUser = await (await User.findById(_id)).execPopulate(routes);
  console.log(user); 

  return user[routes];
};

const types = {
  get_owned_routes: async ({ _id }: IRoute["_id"]) => await getRoutes(_id, 'owned_routes'),

  get_saved_routes: async ({ _id }: IRoute["_id"]) => await getRoutes(_id, 'saved_routes'),

  get_author: async ({ author: id }: IRoute["_id"]) => await User.findById(id),

}


export default types;