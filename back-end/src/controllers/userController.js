const { StatusCodes } = require('http-status-codes');
const userService = require('../services/userService');
const { JWT_VERIFY } = require('../utils/jwt');

const userController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    return res.status(StatusCodes.OK).json(result);
  },
  loginValidate: async (req, res) => {
    const { token } = req.body;
    const data = JWT_VERIFY(token);
    
    const { email } = await userService.loginValidate(data.id);

    return res.status(StatusCodes.OK).json({ email });
  },
};

module.exports = userController;