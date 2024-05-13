'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    static associate(models) {
      Detail.belongsTo(models.Products, { foreignKey: 'productId' });
      Detail.belongsTo(models.productVariant, { foreignKey: 'productVariantId' });
    }
  }
  Detail.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Products', // Thay đổi thành tên của bảng
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    productVariantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'productVariants', // Thay đổi thành tên của bảng
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Detail',
  });
  return Detail;
};  