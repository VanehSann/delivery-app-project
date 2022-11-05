const { sale, salesProduct, sequelize, user } = require('../database/models');

const saleService = {
  getSales: async () => {
    const result = await sale.findAll({
      attributes: ['id', 'totalPrice', 'deliveryAddress', 'deliveryNumber', 'saleDate', 'status'],
      include: [{
        model: user,
        as: 'user',
        attributes: {
          exclude: ['password', 'email', 'role'],
        },
      }, {
        model: user,
        as: 'seller',
        attributes: {
          exclude: ['password', 'email', 'role'],
        },
      },
      ],
    });
    return result;
  },
  findSaleByPk: async (id) => {
    const result = await sale.findByPk(id, {
      attributes: ['id', 'totalPrice', 'deliveryAddress', 'deliveryNumber', 'saleDate', 'status'],
      include: [{
        model: user,
        as: 'user',
        attributes: {
          exclude: ['password', 'email', 'role'],
        },
      }, {
        model: user,
        as: 'seller',
        attributes: {
          exclude: ['password', 'email', 'role'],
        },
      },
      ],
    });

    return result;
  },
  createSale: async ({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, pIds }) => {
    const transactionResult = await sequelize.transaction(async (transaction) => {
      const newSaleObject = {
        userId,
        sellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        saleDate: Date.now(),
        status: 'Pendente',
      };
      const { dataValues } = await sale.create(newSaleObject, { transaction });

      const mappedSaleProducts = pIds
        .map((pId) => ({ saleId: dataValues.id, productId: pId.id, quantity: pId.quantity }));

      await salesProduct.bulkCreate(mappedSaleProducts, { transaction });

      return dataValues;
    });

    return transactionResult;
  },
  updateSale: async (id, newData) => {
    const toBeUpdatedSale = await saleService.findSaleByPk(id);

    const result = await toBeUpdatedSale.update({ ...newData });

    return result;
  },
};

module.exports = saleService;
