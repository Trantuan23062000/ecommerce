import { filterData } from "../../services/filter/index";
const filterController = async (req, res) => {
  try {
    // Lấy các tham số từ request body hoặc query string
    const { brandId, sizeId, colorId, minPrice, maxPrice, category } = req.body;
    const{pageSize,pageNumber} = req.query

    // Gom các tham số thành một đối tượng filters
    const filters = { brandId, sizeId, colorId, minPrice, maxPrice, category };

    // Gọi hàm filterData với filters đã tạo
    const filteredData = await filterData(filters);

    // Trả về kết quả lọc
    res.json({ EC:0, data: filteredData });
  } catch (error) {
    console.error(error);
    // Trả về thông báo lỗi nếu có lỗi xảy ra
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {filterController};