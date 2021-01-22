import { Document } from 'mongoose';

interface IRoute extends Document {
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

export enum routeType {
  OWNED = 'owned_routes',
  SAVED = 'saved_routes'
}

export default IRoute;