const { Router } = require('express');
const saleController = require('../controllers/saleController');
const validate = require('../middlewares/saleValidation');

const route = Router();

route.get('/', saleController.getSales);
route.get('/:id', validate.validatePk, saleController.findSaleByPk);
route.post('/', validate.fieldValidation, validate.pIdsValidation, saleController.createSale);
route.put('/:id', validate.validatePk, validate.fieldValidation, saleController.updateSale);

module.exports = route;