import db from "../../models/index";

const getProduct = async () => {
  const product = await db.Products.findAll({
    include: [{ model: db.Images }, { model: db.Brands }],
  });
  return product;
};

module.exports = {
  getProduct,
};
