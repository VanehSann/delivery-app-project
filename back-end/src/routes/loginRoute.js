const { Router } = require('express');
const userController = require('../controllers/userController');
const validate = require('../middlewares/loginValidation');

const route = Router();

route.post('/', validate.login, userController.login);

module.exports = route;