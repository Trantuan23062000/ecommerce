import db from "../../models/index";
import Sequelize from 'sequelize'; // Import Sequelize

const productRelated = async () => {
  try {
    // Tìm tất cả các bản ghi trong bảng details có cùng productId
    const relatedDetails = await db.Detail.findAll({
      include: [
        {
          model: db.Products,include:[{ model: db.Images},{model: db.Brands}],
        },
        {
          model: db.productVariant
          ,include:[
            { model: db.Sizes},
            { model: db.Colors}
          ],
          group: ['size','color']
        },
      ],
      order: Sequelize.literal('RAND()'), // Sắp xếp ngẫu nhiên
      limit: 8, // Giới hạn kết quả trả về là 4 sản phẩm
    });

    // Trả về các dữ liệu có productId giống nhau
    return relatedDetails;
  } catch (error) {
    //console.log(error);
  }
};

module.exports = { productRelated };
