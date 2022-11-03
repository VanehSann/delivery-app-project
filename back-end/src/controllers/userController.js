const { StatusCodes } = require('http-status-codes');
const userService = require('../services/userService');
const { JWT_VERIFY } = require('../utils/jwt');

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
  getAllUsers: async (_req, res) => {
    const result = await userService.getAllUsers();

    return res.status(StatusCodes.OK).json(result);
  },
  loginValidate: async (req, res) => {
    const { authorization } = req.headers;

    const data = JWT_VERIFY(authorization);
    
    const { email, role } = await userService.loginValidate(data.id);

    return res.status(StatusCodes.OK).json({ email, role });
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;

    await userService.deleteUser(id);

    return res.status(StatusCodes.OK).end();
  },
};

module.exports = userController;