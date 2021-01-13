const jwt = require('jsonwebtoken');

module.exports.jwtCheck = (req, _, next) => {
  const token = req.headers.authorization;
  if (token) {
    const _id = jwt.verify(token, process.env.JWTPrivateKey);
    req._id = _id;
  }
  next();
};
