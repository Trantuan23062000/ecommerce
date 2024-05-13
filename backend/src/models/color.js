'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      color.hasMany(models.productVariant, { foreignKey: 'colorId' });
    }
  }
  color.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 
    },
    color: DataTypes.STRING,
    codeColor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Colors',
  });
  return color;
};