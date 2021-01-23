import { Document } from 'mongoose';
import {FileUpload} from 'graphql-upload';

interface IRoutes extends Document {
  name: string;
  grade: string;
  author: string;
  public?: boolean;
  type?: routeType;
  lat?: string;
  lng?: string;
  description?: string;
}

export interface OutcomingRoute extends IRoutes {
  picture?: string;
}

export interface IncomingRoute extends IRoutes {
  picture: FileUpload;
}



export enum routeType {
  OWNED = 'owned_routes',
  SAVED = 'saved_routes'
}

export default IRoutes;