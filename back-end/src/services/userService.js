const md5 = require('md5');
const { user } = require('../database/models');

const { JWT_SIGN } = require('../utils/jwt');

const userService = {
  login: async (mail, password) => {
    const decodedPassword = md5(password);
    const result = await user
      .findOne({ where: { email: mail, password: decodedPassword }, raw: true });
    const token = JWT_SIGN(result);
    const { name, email, role } = result;
    const userData = { name, email, role, token };

    return userData;
  },
  register: async (userName, mail, password, userRole) => {
    const decodedPassword = md5(password);    
    const created = await user
      .create({ name: userName, email: mail, password: decodedPassword, role: userRole });

    const token = JWT_SIGN(created);
    const { name, email, role } = created;
    const userData = { name, email, role, token };

    return userData;
  },
  getAll: async () => {
    const results = await user.findAll();

    return results;
  },
  loginValidate: async (id) => {
    const result = await user.findOne({ where: { id }, raw: true });

    return result;
  },
};

module.exports = userService;