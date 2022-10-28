const { product } = require('../database/models');

const productService = {
  getAllProducts: async () => {
    const result = await product.findAll();
    return result;
  },
};

module.exports = productService;