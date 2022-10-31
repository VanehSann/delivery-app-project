const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');

const productController = {
  getAllProducts: async (_req, res) => {
    const result = await productService.getAllProducts();
    return res.status(StatusCodes.OK).json(result);
  },
};

module.exports = productController;