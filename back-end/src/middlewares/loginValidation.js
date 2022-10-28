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
};

module.exports = validate;