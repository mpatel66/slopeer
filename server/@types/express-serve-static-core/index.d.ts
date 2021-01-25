import { Document } from 'mongoose';

// declare global {
//   namespace Express {
//     export interface Request {
//       _id?: Document['_id'];
//     }
//   }
// }

// declare namespace Express {
//   export interface Request {
//     _id?: Document['_id'];
//   }
// }

declare module 'express-serve-static-core' {
  interface Request {
    _id?: Document['_id'];
  }
}