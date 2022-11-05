const { Router } = require('express');
const userController = require('../controllers/userController');
const validate = require('../middlewares/loginValidation');

const route = Router();

route.get('/', userController.getAllUsers);
route.get('/sellers', userController.getSellers);
route.post('/', validate.register, userController.register);
route.delete('/:id', userController.deleteUser);

module.exports = route;