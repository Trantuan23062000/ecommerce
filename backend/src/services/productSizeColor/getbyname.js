import db from "../../models/index";

const getByName = async (detailId) => {
  try {
    // Tìm productId từ detailId
    const detail = await db.Detail.findByPk(detailId);

    const productId = detail.productId;

    // Tìm tên sản phẩm từ productId
    const product = await db.Products.findByPk(productId);

    // Tìm các sản phẩm có tên giống với sản phẩm cụ thể
    const productName = product.name;

    // Tìm các thông tin từ bảng Details dựa trên productId
    const details = await db.Detail.findAll({
      include: [
        {
          model: db.Products,
          where: {
            name: productName,
            id: { [db.Sequelize.Op.ne]: productId } // Không bao gồm sản phẩm cụ thể
          },
          include: [{ model: db.Brands }, { model: db.Images }]
        },
        {
          model: db.productVariant,
          include: [{ model: db.Sizes }, { model: db.Colors }]
        }
      ]
    });

    // Trả về kết quả mong muốn
    return details;
  } catch (error) {
    throw error;
  }
};

module.exports = { getByName };
