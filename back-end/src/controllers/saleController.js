const { StatusCodes } = require('http-status-codes');
const saleService = require('../services/saleService');

const saleController = {
  getSales: async (_req, res) => {
    const result = await saleService.getSales();
    return res.status(StatusCodes.OK).json(result);
  },
  findSaleByPk: async (req, res) => {
    const { id } = req.params;

    const result = await saleService.findSaleByPk(id);

    return res.status(StatusCodes.OK).json(result);
  },
  createSale: async (req, res) => {
    const { id, totalPrice, deliveryAddress, deliveryNumber, pIds, sellerId } = req.body;

    const result = await saleService.createSale({
      userId: id,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      pIds,
    });

    return res.status(StatusCodes.CREATED).json(result);
  },
  updateSale: async (req, res) => {
    const { id } = req.params;

    const result = await saleService.updateSale(id);

    return res.status(StatusCodes.OK).json(result);
  },
};

module.exports = saleController;