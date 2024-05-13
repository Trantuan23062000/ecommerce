'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class productVariant extends Model {
    static associate(models) {
      productVariant.belongsToMany(models.Products, {
        through: "Detail",
        foreignKey: "productVariantId",
      });
      productVariant.belongsTo(models.Colors,{ foreignKey: 'colorId' })
      productVariant.belongsTo(models.Sizes,{ foreignKey: 'sizeId' })
    }
  }
  productVariant.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      colorId: DataTypes.STRING,
      sizeId: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "productVariant",
    }
  );
  return productVariant;
};