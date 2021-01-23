import bcrypt from 'bcrypt';
import IRoutes, { IncomingRoute, OutcomingRoute } from '../../types/route';
import Route from '../../models/route.model';
import User from '../../models/user.model';
import { Response } from 'express';
import { uploadProfilePicture, uploadRoutePicture } from '../../utils/uploads';
import { IncomingUser, OutcomingUser } from '../../types/user';


interface IResponse {
  res: Response;
}

interface ICreateRoute {
  input: IncomingRoute;
}

export const createRoute = async (_: any, { input }: ICreateRoute): Promise<OutcomingRoute> => {
  const route = new Route({ ...input, picture: null });
  if (input.picture) {
    const picturePath = await uploadRoutePicture(input.picture, route._id);
    route.picture = picturePath;
  }
  await route.save(); 
  console.log('route', route);
  await User.findByIdAndUpdate(input.author, { $push: { 'owned_routes': String(route._id) } },
    { useFindAndModify: false });
  return route as OutcomingRoute;
};


interface IUpdateRoute {
  _id: IncomingRoute['_id'];
  input: IncomingRoute;
}

export const updateRoute = async (_: any, { _id, input }: IUpdateRoute): Promise<OutcomingRoute> => {
  if (!input.picture) {
    const updated = {...input} as unknown as OutcomingRoute;
    return await Route.findByIdAndUpdate(_id, updated, { new: true, useFindAndModify: false });
  } else {
    const picturePath = await uploadRoutePicture(input.picture, _id);
    const updated = {...input, picture: picturePath} as OutcomingRoute;
    console.log('updated', updated);
    const route = await Route.findByIdAndUpdate(_id, updated, { new: true, useFindAndModify: false });
    console.log('route', route);
    return route;
  }

};

interface IRemoveRoute {
  _id: OutcomingRoute['_id'];
}

export const removeRoute = async (_:any, { _id }: IRemoveRoute): Promise<OutcomingRoute> => {
  const route: IRoutes = await Route.findByIdAndDelete(_id);
  await User.findByIdAndUpdate(route.author, { $pull: { 'owned_routes': _id } }, { useFindAndModify: false });
  await User.updateMany({}, { $pull: { 'saved_routes': _id } });
  return route;
};


export const createUser = async (_: any, { input: { email, username, password }}: {input:IncomingUser}, { res }: IResponse): Promise<string|undefined> => {
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
  _id: IncomingUser['_id'];
  input: { 
    userName?: IncomingUser['username']; 
    profile_picture?: IncomingUser['profileFile']
  }
}

// picture only, username only, both change
export const updateUser = async (_:any, { _id, input }: IUpdateUser): Promise<OutcomingUser> => {
  if (!input.profile_picture) {
    return await User.findByIdAndUpdate(_id, {userName: input.userName}, { new: true, useFindAndModify: false });
  } else {
    const picturePath: string = await uploadProfilePicture(input.profile_picture, _id);
    const updated = input.userName 
      ? {
        userName: input.userName, profile_picture: picturePath
      } 
      : {profile_picture: picturePath};
    return await User.findByIdAndUpdate(_id, updated, { new: true, useFindAndModify: false });
  }
 
};


interface ISaveRoute {
  userId: IncomingUser['_id'];
  routeId: IncomingRoute['_id'];
}

export const saveRoute = async (_:any, { userId, routeId }: ISaveRoute): Promise<OutcomingUser> =>
  await User.findByIdAndUpdate(userId, { $push: { 'saved_routes': routeId } }, { new: true, useFindAndModify: false });


export const unsaveRoute = async (_:any, { userId, routeId }: ISaveRoute): Promise<OutcomingUser> =>
  await User.findByIdAndUpdate(userId, { $pull: { 'saved_routes': routeId } }, { new: true, useFindAndModify: false });

interface ILogin {
  email: IncomingUser['email'];
  password: IncomingUser['password'];
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
