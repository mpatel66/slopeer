
import {Document, ObjectId} from 'mongoose';

interface IRoute extends Document {
  _id?: ObjectId;
  name: string;
  grade: string;
  author: string; // or objectId?
  public?: boolean;
  picture?: string;
  description?: string;
  type?:string;
  lat?: string;
  lng?: string;
}
export default IRoute;