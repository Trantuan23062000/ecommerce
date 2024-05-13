'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.Orders, { foreignKey: 'orderId' });
    }
  }
  OrderDetail.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 
    },
    orderId: DataTypes.UUID,
    total:DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    status:DataTypes.INTEGER,
    payment:DataTypes.STRING,
    data:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetail;
};