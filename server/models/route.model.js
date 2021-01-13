const { Schema, model } = require('mongoose');

const routeSchema = new Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  author: { type: String, ref: 'User', required: true },
  public: { type: Boolean, default: true },
  picture: { type: String, default: null },
  description: { type: String, default: null },
  type: { type: String, default: null },
  lat: { type: String, required: true },
  lng: { type: String, required: true }
});

module.exports = model('Route', routeSchema);
