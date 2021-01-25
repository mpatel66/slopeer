import { CombinedError } from '@urql/preact';
import IUser from './User'

export default interface IRoute {
  _id: string;
  name: string;
  author: IUser;
  public: boolean;
  picture: string;
  description: string;
  type: string;
  lat: string
  lng: string;
  grade: string;

};

export interface IPicture {
  profile: boolean;
  picture: string;
  type?: string;
  username?: IUser['username'];
  routename?: string;
  pictureStyle?: string;
  imageStyle: string;
}

export interface IData {
  user: IUser;
  route: IRoute;
  error: string;

}

export interface IMatches {
  matches: Id;
}

interface Id {
  id: IUser['_id']
}

export interface RouteId {
  id: IRoute['_id']
}