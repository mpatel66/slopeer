import { Document } from 'mongoose';

declare module 'express-serve-static-core' {
  interface Request {
    _id?: Document['_id'];
  }
}