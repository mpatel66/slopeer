import jwt from 'jsonwebtoken';
import { Request, Response,NextFunction } from 'express-serve-static-core';
import {Document} from 'mongoose';

const JWTPrivateKey = process.env.JWTPrivateKey as string;

const jwtCheck = (req: Request, _:Response, next: NextFunction):void => {
  const token = req.headers.authorization;
  if (token) {
    const _id: Document['_id'] = jwt.verify(token, JWTPrivateKey);
    req._id = _id;
  }
  next();
};

export default jwtCheck;