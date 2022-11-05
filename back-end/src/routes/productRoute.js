const { Router } = require('express');
const productController = require('../controllers/productController');

const route = Router();

route.get('/', productController.getAllProducts);

module.exports = route;