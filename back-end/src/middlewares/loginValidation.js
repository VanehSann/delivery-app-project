const { StatusCodes } = require('http-status-codes');
const md5 = require('md5');
const { user } = require('../database/models');
const notFoundUser = require('../utils');

const validate = {
  login: async (req, res, next) => {
    const { email, password } = req.body;
    const decodedPassword = md5(password);
    const result = await user.findOne({ where: { email, password: decodedPassword }, raw: true });

    if (!result) return res.status(StatusCodes.NOT_FOUND).json(notFoundUser);

    next();
  },
 register: async (req, res, next) => {
    const { name, email, password } = req.body;
    const decodedPassword = md5(password);
    const emailExits = await user.findOne({ where: { email }, raw: true });
    const nameExits = await user.findOne({ where: { name }, raw: true });
    if (emailExits
    && nameExits) {
      return res.status(404).json({ "message": "email or name already exits" });
    }
    if (result) return res.status(404).json({ "message": "this email already exits" });
  
    next();
  },
};

module.exports = validate;