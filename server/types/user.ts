import { FileUpload } from 'graphql-upload';
import {Document} from 'mongoose';

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  owned_routes?: string[];
  saved_routes?: string[];
  generateAuthToken(): string;
}

export interface OutcomingUser extends IUser {
  profile_picture?: string;
}

export interface IncomingUser extends IUser {
  profileFile?: FileUpload;
}

export default IUser;
