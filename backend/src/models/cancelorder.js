'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CancelOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CancelOrder.belongsTo(models.OrderDetails, { foreignKey: 'orderDetailId' });
    }
  }
  CancelOrder.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 
    },
    orderDetailId: DataTypes.UUID,
    date: DataTypes.STRING,
    pay:DataTypes.STRING,
    status:DataTypes.INTEGER,
    numberPayment:DataTypes.STRING,
    nameBank:DataTypes.STRING,
    nameAccount:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CancelOrder',
  });
  return CancelOrder;
};