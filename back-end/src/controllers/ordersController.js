const { StatusCodes } = require('http-status-codes');
const ordersService = require('../services/ordersService');
const { JWT_VERIFY } = require('../utils/jwt');

const ordersController = {
  getSales: async (req, res) => {
    const { authorization } = req.headers;
    const user = await JWT_VERIFY(authorization);
    const result = await ordersService.getSales(user.id, user.role);
    return res.status(StatusCodes.OK).json(result);
  },
  findSaleByPk: async (req, res) => {
    const { id } = req.params;

    const result = await ordersService.findSaleByPk(id);

    return res.status(StatusCodes.OK).json(result);
  },
  updateSale: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await ordersService.updateSale(id, status);

    return res.status(StatusCodes.OK).json(result);
  },
};

module.exports = ordersController;