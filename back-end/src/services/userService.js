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
  loginValidate: async (id) => {
    const result = await user.findOne({ where: { id }, raw: true });

    return result;
  },
};

module.exports = userService;