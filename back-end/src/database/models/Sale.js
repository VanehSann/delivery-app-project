/**
* 
* @param {import('DataTypes').Sequelize} sequelize
* @param {import('sequelize').DataTypes} DataTypes
*/

module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    createdAt: 'saleDate',
    updatedAt: false,
    tableName: 'sales',
    underscored: true,
  });

  sale.associate = (models) => {
    sale.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
    });
    sale.belongsTo(models.user, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
  };

  return sale;
};