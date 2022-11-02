const { Router } = require('express');
const userController = require('../controllers/userController');
const validate = require('../middlewares/loginValidation');

const route = Router();

route.post('/', validate.register, userController.register);
route.get('/', userController.getAllUsers);

module.exports = route;