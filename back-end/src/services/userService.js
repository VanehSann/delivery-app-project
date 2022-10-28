const { user } = require('../database/models');
const md5 = require('md5')

const userService = {
  login: async (mail, password) => {
    const decodedPassword = md5(password);
    const result = await user.findOne({ where: { email: mail, password: decodedPassword }, raw: true });
    const { name, email, role } = result;
    const userData = { name, email, role}

    return userData;
  }
}

module.exports = userService;