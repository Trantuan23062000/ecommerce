import db from "../../models";
import {validateProduct} from "../product/validate"

const updateProduct = async (productId, newData) => {
  try {
    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!productId) {
      throw new Error('Product ID is required');
    }
    await validateProduct(newData)
    // Lấy thông tin sản phẩm từ cơ sở dữ liệu
    const product = await db.Products.findByPk(productId);

    // Kiểm tra xem sản phẩm có tồn tại không
    if (!product) {
      throw new Error('Product not found');
    }

    // Cập nhật thông tin sản phẩm với dữ liệu mới
    await product.update(newData);

    return product;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error(error);
  }
};

module.exports = { updateProduct };
