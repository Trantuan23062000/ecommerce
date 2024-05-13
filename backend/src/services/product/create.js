import db from "../../models/index";
const createProduct = async (
  name,
  description,
  price,
  sale,
  status,
  category,
  brandId,
  imageId
) => {

  try {

    const product = await db.Products.create({
      name,
      description,
      price,
      sale,
      status,
      category,
      brandId,
      imageId
    });


    return { 
      product};
  } catch (error) {
    throw error;
  }
};

module.exports = { createProduct };
