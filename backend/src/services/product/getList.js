import db from "../../models";

const GetList = async (pageNumber, pageSize) => {
  // Đếm tổng số sản phẩm
  const totalProducts = await db.Products.count();

  // Tính tổng số trang
  const totalPages = Math.ceil(totalProducts / pageSize);

  // Tính vị trí bắt đầu
  const offset = (pageNumber - 1) * pageSize;
  const Product = await db.Products.findAll({
    include: [
      { model: db.Images, attributes: ["id", "URL"] },
      { model: db.Brands, attributes: ["id", "name"] },
    ],
    order: [["id", "DESC"]],
    nest: true,
    limit: pageSize,
    offset: offset,
  });

  return { Product, totalPages };
};

module.exports = {
  GetList,
};
