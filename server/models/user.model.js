const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String, default: null },
  owned_routes: { type: [{ type: String, ref: 'Route' }], default: [] },
  saved_routes: { type: [{ type: String, ref: 'Route' }], default: [] }
});

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

module.exports = model('User', userSchema);
