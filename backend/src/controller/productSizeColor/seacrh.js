import { searchProductAndGetDetails } from "../../services/productSizeColor/search";

const searchProduct = async (req, res, next) => {
    try {
      const { name } = req.query;
      
      // Gọi hàm searchProductAndGetDetails từ service
      const result = await searchProductAndGetDetails(name);
      
      // Kiểm tra xem kết quả có tồn tại hay không
      if (result === null) {
        return res.status(201).json({ EC: 1, message: 'Không tìm thấy sản phẩm nào phù hợp.' });
      }
      
      // Trả về kết quả thành công
      res.status(200).json({ EC: 0, Details: result });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { searchProduct };