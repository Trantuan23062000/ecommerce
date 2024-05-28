import db from "../../models";
const { Op } = require("sequelize");

const searchProductAndGetDetails = async (name) => {
    try {
      // Tìm kiếm sản phẩm trong bảng Product dựa trên từ khoá
      const products = await db.Products.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
  
      if (products.length > 0) {
        const productDetailsPromises = products.map(async (product) => {
          // Lấy id của sản phẩm và thực hiện tìm kiếm trong bảng Details
          const productId = product.id;
          const productDetails = await db.Detail.findAll({
            where: {
              productId: productId,
            },
            include: [
              {
                model: db.Products,include:[{model:db.Images},{model:db.Brands}]
              },
              {
                model: db.productVariant,include:[{model:db.Sizes},{model:db.Colors}]
              },
            ],
          });
          return productDetails;
        });
  
        // Đợi tất cả các Promise được thực thi và trả về kết quả
        const result = await Promise.all(productDetailsPromises);
        return result.flat();
      } else {
        // Nếu không tìm thấy sản phẩm, trả về null
        return null;
      }
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = { searchProductAndGetDetails };