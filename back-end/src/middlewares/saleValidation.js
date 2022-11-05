const { StatusCodes } = require('http-status-codes');
const { product, sale } = require('../database/models');
const { invalidProducts, notFoundSale, missingFields } = require('../utils');

const validate = {
  fieldValidation: async (req, res, next) => {
    const { totalPrice, deliveryAddress, deliveryNumber, pIds } = req.body;
    const reqBody = [totalPrice, deliveryAddress, deliveryNumber, pIds];

    const validateBody = reqBody.some((field) => !field);

    if (validateBody) {
      return res.status(StatusCodes.BAD_REQUEST).json(missingFields);
    }

    next();
  },
  pIdsValidation: async (req, res, next) => {
    const { pIds } = req.body;
    const mappedPIds = pIds.map((e) => e.id);

    const { count } = await product.findAndCountAll({ where: { id: mappedPIds } });

    if (count !== mappedPIds.length) {
      return res.status(StatusCodes.BAD_REQUEST).json(invalidProducts);
    }

    next();
  },
  validatePk: async (req, res, next) => {
    const { id } = req.params;

    const result = await sale.findByPk(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json(notFoundSale);
    }

    next();
  },
};

module.exports = validate;