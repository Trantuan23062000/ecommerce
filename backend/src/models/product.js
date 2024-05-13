'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Brands,{ foreignKey: 'brandId' })
      Product.belongsTo(models.Images, { foreignKey: 'imageId' });
      Product.belongsToMany(models.productVariant, { through: 'Detail', foreignKey: 'productId' });
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    sale: DataTypes.FLOAT,
    status: DataTypes.STRING,
    category:DataTypes.STRING,
    brandId: DataTypes.UUID,
    imageId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Product;
};