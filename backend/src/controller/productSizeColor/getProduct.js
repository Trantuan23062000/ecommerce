import { getProduct } from "../../services/productSizeColor/getProduct";

const GetPorduct = async (req, res, next) => {
  try {
    const product = await getProduct();
    if (product) {
      res.status(200).json({
        EC: 0,
        product,
      });
    } else {
      res.status(201).json({
        EC: 1,
        product: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { GetPorduct };
