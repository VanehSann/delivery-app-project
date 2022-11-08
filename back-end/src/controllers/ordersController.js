const { StatusCodes } = require('http-status-codes');
const ordersService = require('../services/ordersService');

const ordersController = {
  getSales: async (req, res) => {
    const { id, role } = req.body;
    const result = await ordersService.getSales(id, role);
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