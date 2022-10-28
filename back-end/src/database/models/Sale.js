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
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    total_price: DataTypes.DECIMAL(9, 2),
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    createdAt: 'sale_date',
    updatedAt: false,
    tableName: 'sales',
  });

  // sale.associate = (models) => {
  //   sale.belongsTo(models.users, {
  //     foreignKey: 'user_id',
  //     as: 'userId',
  //   });
  //   sale.belongsTo(models.users, {
  //     foreignKey: 'seller_id',
  //     as: 'sellerId',
  //   });
  // };

  return sale;
};