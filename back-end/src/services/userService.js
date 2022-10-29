const md5 = require('md5');
const { user } = require('../database/models');

const userService = {
  login: async (mail, password) => {
    const decodedPassword = md5(password);
    const result = await user
          .findOne({ where: { email: mail, password: decodedPassword }, raw: true });
    const { name, email, role } = result;
    const userData = { name, email, role };

    return userData;
  },
 register: async (name, email, password) => {

   // 9 - pode cadastrar com dados validos
    const decodedPassword = md5(password);
    const created = await user.create({ name, email, password: decodedPassword, role: '' });

    return created;
  },
};

module.exports = userService;