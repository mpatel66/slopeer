import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express'

const jwtCheck: RequestHandler = (req, _, next) => {
  const token = req.headers.authorization;
  if (token) {
    const _id = jwt.verify(token, process.env.JWTPrivateKey);
    req._id = _id;
  }
  next();
};

export default jwtCheck;