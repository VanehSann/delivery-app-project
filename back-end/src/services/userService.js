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
 register: async (name, email, password, role) => {
    const decodedPassword = md5(password);
    const created = await user.create({ name, email, password: decodedPassword, role });

    return created;
  },
  getAll: async () => {

     const results = await user.findAll();
 
     return results;
   },
};

module.exports = userService;