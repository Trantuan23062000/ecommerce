import db from "../../models/index"
const filterData = async (filters) => {
  try {
    const { brandId, sizeId, colorId, minPrice, maxPrice, category,pageNumber, pageSize } = filters;

    // Khởi tạo đối tượng include để sử dụng trong truy vấn Sequelize
    const include = [
      { model: db.Products, include: [{ model: db.Brands },{model:db.Images}] },
      { model: db.productVariant, include: [{ model: db.Sizes }, { model: db.Colors }] }
    ];

    // Kiểm tra và thêm điều kiện lọc brandId
    if (brandId) {
      include.push({
        model: db.Products,
        where: { brandId: brandId },
        include: [{ model: db.Brands }]
      });
    }
    // Kiểm tra và thêm điều kiện lọc sizeId
    if (sizeId) {
      include.push({
        model: db.productVariant,
        where: { sizeId: sizeId },
        include: [{ model: db.Sizes }]
      });
    }

    // Kiểm tra và thêm điều kiện lọc colorId
    if (colorId) {
      include.push({
        model: db.productVariant,
        where: { colorId: colorId },
        include: [{ model: db.Colors }]
      });
    }

    // Kiểm tra và thêm điều kiện lọc price
    if (minPrice !== undefined && maxPrice !== undefined) {
      include.push({
        model: db.Products,
        where: { price: { [db.Sequelize.Op.gte]: minPrice, [db.Sequelize.Op.lte]: maxPrice } },
        include: [{ model: db.Brands }]
      });
    }

    // Kiểm tra và thêm điều kiện lọc category
    if (category) {
      include.push({
        model: db.Products,
        where: { category: category },
        include: [{ model: db.Brands }]
      });
    }

    // Thực hiện truy vấn Sequelize
    const data = await db.Detail.findAll({ include: include},
      
);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error in filterData function");
  }
};

module.exports = { filterData };
