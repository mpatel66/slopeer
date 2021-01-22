import { Schema, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema: Schema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String, default: null },
  owned_routes: { type: [{ type: String, ref: 'Route' }], default: [] },
  saved_routes: { type: [{ type: String, ref: 'Route' }], default: [] }
}, {autoCreate: true});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWTPrivateKey,
    { expiresIn: '3d' }
  );
  return token;
};

const User = model('User', userSchema);

export default User;
