const errorMiddlewares = {
  invalidFields: { message: 'Invalid fields' },
  notFoundUser: { message: 'User not found' },
  invalidProducts: { message: 'Some productId are not valid or duplicated' },
  notFoundSale: { message: 'Sale not found' },
  missingFields: { message: 'Some fields are missing' },
  alreadyInUse: { message: 'E-mail already in use' },
};

module.exports = errorMiddlewares;