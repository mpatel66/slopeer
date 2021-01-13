const mongoose = require('mongoose');

const Route = require('./route.model');
const User = require('./user.model');

const { DB_HOST, DB } = process.env;

const connection = async () => await mongoose.connect(`${DB_HOST}/${DB}`,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log(`Connected database ${DB} 🗄`) //eslint-disable-line no-console
);

module.exports = {
  connection,
  Route,
  User
};
