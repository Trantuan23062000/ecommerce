import { deleteProductAndImage } from "../../services/product/delete"

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Gọi hàm xóa sản phẩm và hình ảnh tương ứng từ services
    const result = await deleteProductAndImage(productId);

    // Trả về kết quả thành công
    res.status(200).json(result);
  } catch (error) {
    // Trả về thông báo lỗi nếu có lỗi xảy ra
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { deleteProduct };
