import { getProductDetails } from "../../services/productSizeColor/get";

const getProductDetailsController = async (req, res, next) => {
  try {
    // Lấy pageSize và pageNumber từ query string
    const { pageSize, pageNumber } = req.query;

    // Gọi productService để lấy danh sách sản phẩm theo phân trang
    const { productDetails, totalPages } = await getProductDetails(+pageSize, +pageNumber);

    // Trả về danh sách sản phẩm và thông tin phân trang
    res.status(200).json({ EC:0 ,productDetails, totalPages });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error getting product details:', error);
    res.status(500).json({ error: 'Error getting product details' });
  }
};

module.exports = { getProductDetailsController };
