/**
* 
* @param {import('DataTypes').Sequelize} sequelize
* @param {import('sequelize').DataTypes} DataTypes
*/

module.exports = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define('salesProduct', {
    sale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
    },
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName: 'salesProducts',
  });

  // salesProduct.associate = (models) => {
  //   models.sales.belongsToMany(models.products, {
  //     through: salesProduct,
  //     foreignKey: 'sale_id',
  //     otherKey: 'product_id',
  //   });
  //   models.products.belongsToMany(models.sales, {
  //     through: salesProduct,
  //     foreignKey: 'product_id',
  //     otherKey: 'sale_id',
  //   });
  // };

  return salesProduct;
};