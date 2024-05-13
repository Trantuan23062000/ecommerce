'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Orders)
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 
    },
    username: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    adress: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    verificationToken:DataTypes.STRING,
    resetPasswordToken:DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Users',
  });
  return User;
};