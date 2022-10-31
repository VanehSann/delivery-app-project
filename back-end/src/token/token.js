const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env; 

const encodeToken = (email, role, name) => {
  const token = jwt.sign({ email, role, name }, JWT_SECRET, { expiresIn: '1h' });
  return { token };
};

const decodeToken = (authorization) => {
  const { email } = jwt.decode(authorization);
  return email;
};

module.exports = {
  decodeToken,
  encodeToken,
} 
