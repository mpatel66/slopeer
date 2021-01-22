import User from "../../models/user.model";
import { routeType } from "../../types/route";
import IUser from "../../types/user";

const getRoutes = async (_id: IUser["_id"], routes: routeType): Promise<IUser[routeType]> => {
  const user: IUser = await (await User.findById(_id)).execPopulate(routes);
  console.log(user); 

  return user[routes];
};

const types = {
  get_owned_routes: async ({ _id }: IUser["_id"]) => await getRoutes(_id, routeType.OWNED),

  get_saved_routes: async ({ _id }: IUser["_id"]) => await getRoutes(_id, routeType.SAVED),

  get_author: async ({ author: id }: IUser["_id"]) => await User.findById(id),
}

export default types;