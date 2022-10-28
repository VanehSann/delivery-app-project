const Jwt = require('jsonwebtoken');
require('dotenv/config');

const { JWT_SECRET } = process.env;

const JWT_OPTIONS = { algorithm: 'HS256', expiresIn: '1d' };

const JWT_SIGN = (payload) => Jwt.sign(
  { id: payload.id, name: payload.name, email: payload.email, role: payload.role },
  JWT_SECRET,
  JWT_OPTIONS,
);

const JWT_VERIFY = (authorization) => Jwt.verify(authorization, JWT_SECRET); 

module.exports = {
  JWT_SIGN,
  JWT_VERIFY,
};