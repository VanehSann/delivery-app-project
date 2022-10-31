const { StatusCodes } = require('http-status-codes');
const userService = require('../services/userService');

const userController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    return res.status(StatusCodes.OK).json(result);
  },
  register: async (req, res) => {
    const { name, email, password, role } = req.body;
    const result = await userService.register(name, email, password, role);
    return res.status(StatusCodes.CREATED).json(result);
  },
  getAll: async (req, res) => {
    const result = await userService.getAll();
    return res.status(StatusCodes.OK).json(result);
  },
};

module.exports = userController;