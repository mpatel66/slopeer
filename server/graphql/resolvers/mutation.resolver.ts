import bcrypt from 'bcrypt';
import IRoutes from '../../types/route';
import Route from '../../models/route.model';
import User from '../../models/user.model';
import { Response } from 'express';
import { uploadProfilePicture, uploadRoutePicture } from '../../utils/uploads';
import IUser from '../../types/user';


interface IResponse {
  res: Response;
}

interface ICreateRoute {
  input: IRoutes
}

export const createRoute = async (_: any, { input }: ICreateRoute): Promise<IRoutes> => {
  const route = new Route({ ...input, picture: null });
  if (input.picture) {
    const picturePath = await uploadRoutePicture(input.picture, route._id);
    route.picture = picturePath;
  }
  await route.save(); 
  await User.findByIdAndUpdate(input.author, { $push: { 'owned_routes': String(route._id) } },
    { useFindAndModify: false });
  return route;
};


interface IUpdateRoute {
  _id: IRoutes['_id'];
  input: IRoutes;
}

export const updateRoute = async (_: any, { _id, input }: IUpdateRoute): Promise<IRoutes> => {
  if (input.picture) {
    const picturePath = await uploadRoutePicture(input.picture, _id);
    input.picture = picturePath;
  }
  return await Route.findByIdAndUpdate(_id, input, { new: true, useFindAndModify: false });
};

interface IRemoveRoute {
  _id: IRoutes['_id'];
}

export const removeRoute = async (_:any, { _id }: IRemoveRoute): Promise<IRoutes> => {
  const route: IRoutes = await Route.findByIdAndDelete(_id);
  await User.findByIdAndUpdate(route.author, { $pull: { 'owned_routes': _id } }, { useFindAndModify: false });
  await User.updateMany({}, { $pull: { 'saved_routes': _id } });
  return route;
};


export const createUser = async (_: any, { input: { email, username, password }}: {input:IUser}, { res }: IResponse): Promise<string|undefined> => {
  let user = await User.findOne({ email });
  if (user) {
    res.status(409);
    return;
  }

  user = new User({ email, username, password, owned_routes: [], saved_routes: [] });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  return user.generateAuthToken();
};

interface IUpdateUser {
  _id: IUser['_id'];
  input: { 
    userName?: IUser['username']; 
    profile_picture: IUser['profile_picture'];
  }
}

export const updateUser = async (_:any, { _id, input }: IUpdateUser): Promise<IUser> => {
  if (input.profile_picture) {
    const picturePath = await uploadProfilePicture(input.profile_picture, _id);
    input.profile_picture = picturePath;
  }
  return await User.findByIdAndUpdate(_id, input, { new: true, useFindAndModify: false });
};


interface ISaveRoute {
  userId: IUser['_id'];
  routeId: IRoutes['_id'];
}

export const saveRoute = async (_:any, { userId, routeId }: ISaveRoute): Promise<IUser> =>
  await User.findByIdAndUpdate(userId, { $push: { 'saved_routes': routeId } }, { new: true, useFindAndModify: false });


export const unsaveRoute = async (_:any, { userId, routeId }: ISaveRoute): Promise<IUser> =>
  await User.findByIdAndUpdate(userId, { $pull: { 'saved_routes': routeId } }, { new: true, useFindAndModify: false });

interface ILogin {
  email: IUser['email'];
  password: IUser['password'];
}

export const login = async (_:any, { email, password }:ILogin, { res }:IResponse): Promise<string|Response|undefined> => {
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    return;
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400);
  return user.generateAuthToken();
};
