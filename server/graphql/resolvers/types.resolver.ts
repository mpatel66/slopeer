import User from "../../models/user.model";


const getRoutes = async (_id, routes) => {
  const user = await (await User.findById(_id)).execPopulate(routes);
  console.log(user); 

  return user[routes];
};

const types = {
  get_owned_routes: async ({ _id }) => await getRoutes(_id, 'owned_routes'),

  get_saved_routes: async ({ _id }) => await getRoutes(_id, 'saved_routes'),

  get_author: async ({ author: id }) => await User.findById(id),

}


export default types;