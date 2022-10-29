const Jwt = require('jsonwebtoken');
const JWT_SECRET = require('fs')
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

const JWT_OPTIONS = { algorithm: 'HS256', expiresIn: '1d' };

const JWT_SIGN = (payload) => Jwt.sign(
  { id: payload.id, name: payload.name, email: payload.email, role: payload.role },
  JWT_SECRET,
  JWT_OPTIONS,
);

const JWT_VERIFY = (authorization) => {
  try {
    const userData = Jwt.verify(authorization, JWT_SECRET);

    return userData;
  } catch (error) {
    return error;
  }
};

module.exports = {
  JWT_SIGN,
  JWT_VERIFY,
};