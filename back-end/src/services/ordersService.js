const { sale, salesProduct, products, user } = require('../database/models');

const attributesArr = ['id', 'totalPrice', 'saleDate', 'status'];
const attributesArrTwo = ['deliveryAddress', 'deliveryNumber'];

const excludeArr = ['password', 'email', 'role'];

const ordersService = {
  getSales: async (id, role) => {
    if (role === 'customer') {
      const result = await sale.findAll({ where: { userId: id },
         attributes: [...attributesArr, ...attributesArrTwo],
        include: [{ model: user, as: 'user', attributes: { exclude: [...excludeArr] } }, 
        { model: user, as: 'seller', attributes: { exclude: [...excludeArr] } }] });
      return result;
    }
    if (role === 'seller') {
      const result = await sale.findAll({ where: { sellerId: id },
        attributes: [...attributesArr, ...attributesArrTwo],
        include: [{ model: user, as: 'user', attributes: { exclude: [...excludeArr] },
        }, { model: user, as: 'seller', attributes: { exclude: [...excludeArr] },
        },
        ],
      });
      return result;
    }
  },
  findSaleByPk: async (id) => {
    const result = await sale.findByPk(id, {
      attributes: [...attributesArr, ...attributesArrTwo],
      include: [{ model: user, as: 'user', attributes: { exclude: [...excludeArr] },
      }, { model: user, as: 'seller', attributes: { exclude: [...excludeArr] },
      },
      ],
    });

  // quantity - name
  const { productId, quantity } = await salesProduct.findByPk(id);
  const { name } = await products.findByPk(productId);

  // sellerName
 const sellerName = await user.findOne({ where: { id: result.sellerId, role: 'seller' } });

    return { ...result, quantity, name, sellerName: sellerName.name };
  },
  updateSale: async (id, status) => {
    const results = await sale.update({ status }, { where: { id } });
    return results;
  },
};

module.exports = ordersService;
