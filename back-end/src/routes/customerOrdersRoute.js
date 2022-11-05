const { Router } = require('express');
const ordersController = require('../controllers/ordersController');

const route = Router();

route.get('/', ordersController.getSales);
route.get('/:id', ordersController.findSaleByPk);
route.put('/:id', ordersController.updateSale);

module.exports = route;