'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      brandId: {
        type: Sequelize.UUID
      },
      imageId: {
        type: Sequelize.UUID,
        references: {
          model: 'Images', // Tên bảng mà imageId đề cập đến
          key: 'id' // Tên cột trong bảng Images
        },
        onDelete: 'CASCADE' // Quy tắc xử lý khi xóa: Xoá các hình ảnh tương ứng khi sản phẩm bị xoá
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
    await queryInterface.dropTable('Products');
  }
};