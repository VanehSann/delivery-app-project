const { StatusCodes } = require('http-status-codes');
const md5 = require('md5');
const { user } = require('../database/models');
const { notFoundUser, alreadyInUse } = require('../utils');

const validate = {
  login: async (req, res, next) => {
    const { email, password } = req.body;
    const decodedPassword = md5(password);
    const result = await user.findOne({ where: { email, password: decodedPassword }, raw: true });

    if (!result) return res.status(StatusCodes.NOT_FOUND).json(notFoundUser);

    next();
  },
 register: async (req, res, next) => {
    const { name, email } = req.body;

    // 10 - name e email existem no db + refatorar
    const emailExits = await user.findOne({ where: { email }, raw: true });
    const nameExits = await user.findOne({ where: { name }, raw: true });
  
    if (emailExits && nameExits) {
      return res.status(StatusCodes.CONFLICT).json(alreadyInUse);
    }
    
    next();
  },
};

module.exports = validate;