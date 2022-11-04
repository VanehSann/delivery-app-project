/**
* 
* @param {import('DataTypes').Sequelize} sequelize
* @param {import('sequelize').DataTypes} DataTypes
*/

module.exports = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define('salesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
    },
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName: 'salesProducts',
    underscored: true,
  });

  salesProduct.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      through: salesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.product.belongsToMany(models.sale, {
      through: salesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return salesProduct;
};