import { Schema, model, Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { OutcomingUser } from '../types/user';
const JWTPrivateKey = process.env.JWTPrivateKey as string;

// interface IUserModel extends IUser, Document { }
// : Schema<IUser, Model<IUser>>
const userSchema: Schema<OutcomingUser, Model<OutcomingUser>> = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String, default: null },
  owned_routes: { type: [{ type: String, ref: 'Route' }], default: [] },
  saved_routes: { type: [{ type: String, ref: 'Route' }], default: [] }
}, {autoCreate: true});

userSchema.methods.generateAuthToken = function (): string {

  const token = jwt.sign(
    {
      _id: this._id,
    },
    JWTPrivateKey,
    { expiresIn: '3d' }
  );
  return token;
};

const User = model<OutcomingUser>('User', userSchema);

export default User;
