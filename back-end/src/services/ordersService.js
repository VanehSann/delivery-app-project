const { sale, salesProduct, product, user } = require('../database/models');

const attributesArr = ['id', 'totalPrice', 'saleDate', 'status'];
const attributesArrTwo = ['deliveryAddress', 'deliveryNumber'];

const excludeArr = ['password', 'email', 'role'];

const ordersService = {
  getSales: async (id, role) => {
    if (role === 'customer') {
      const result = await sale.findAll({
        where: { userId: id },
        attributes: [...attributesArr, ...attributesArrTwo],
        include: [{ model: user, as: 'user', attributes: { exclude: [...excludeArr] } },
        { model: user, as: 'seller', attributes: { exclude: [...excludeArr] } }],
      });
      return result;
    }

    if (role === 'seller') {
      const result = await sale.findAll({
        where: { sellerId: id },
        attributes: [...attributesArr, ...attributesArrTwo],
        include: [{ model: user, as: 'user', attributes: { exclude: [...excludeArr] } },
        { model: user, as: 'seller', attributes: { exclude: [...excludeArr] } }],
      });
      return result;
    }
  },
  findSaleByPk: async (id) => {
    const result = await sale.findByPk(id, {
      attributes: [...attributesArr, ...attributesArrTwo],
      include: [{
        model: user, as: 'user', attributes: { exclude: [...excludeArr] },
      }, {
        model: user, as: 'seller', attributes: { exclude: [...excludeArr] },
      },
      ],
    });

    const salesProductIdQty = await salesProduct.findAll({ where: { saleId: id } });
    const salesProductName = await Promise.all(salesProductIdQty
      .map((el) => product.findByPk(el.productId)));

    const sellerName = result.dataValues.seller.dataValues.name;

    return { ...result.dataValues, salesProductIdQty, salesProductName, sellerName };
  },
  updateSale: async (id, status) => {
    const results = await sale.update({ status }, { where: { id } });
    return results;
  },
};

module.exports = ordersService;
