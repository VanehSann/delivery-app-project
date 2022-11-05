const { sale, salesProduct, products, sequelize, user } = require('../database/models');

const ordersService = {
  getSales: async (id, role) => {
    if(role === 'customer') {
      const result = await sale.findAll({
        where: { userId: id },
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
    }
    if(role === 'seller') {
      const result = await sale.findAll({
        where: { sellerId: id },
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
    }
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

  // quantity - name
  const { productId, quantity } = await salesProduct.findByPk(id);
  const { name } = await products.findByPk(productId);

  // sellerName
 const sellerName = await user.findOne({ where: { id: result.sellerId, role: 'seller' } })

    return { ...result, quantity, name, sellerName: sellerName.name };
  },
  updateSale: async (id, status) => {
    const results = await sale.update({ status }, { where: { id } });
    return results;
  },
};

module.exports = ordersService;
