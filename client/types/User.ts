import IRoute from './Route'


export default interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  profile_picture: string;
  owned_routes: IRoute[];
  saved_routes: IRoute[];
}

