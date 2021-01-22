import {Document} from 'mongoose';
// import IRoute from './route';

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  profile_picture?: string;
  owned_routes?: string[];
  saved_routes?: string[];
}

export default IUser;