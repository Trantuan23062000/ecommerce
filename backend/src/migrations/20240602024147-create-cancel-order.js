'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CancelOrders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      orderDetailId: {
        type: Sequelize.UUID
      },
      date: {
        type: Sequelize.STRING
      },
      status:{
        type:Sequelize.INTEGER
      },
      numberPayment: {
        type: DataTypes.INTEGER,
        allowNull: true // Cho phép giá trị null
      },
      nameBank: {
        type: DataTypes.STRING,
        allowNull: true // Cho phép giá trị null
      },
      nameAccount: {
        type: DataTypes.STRING,
        allowNull: true // Cho phép giá trị null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CancelOrders');
  }
};