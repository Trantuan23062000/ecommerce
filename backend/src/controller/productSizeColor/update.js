import { updateData } from "../../services/productSizeColor/update";

const updateProductDataController = async (req, res) => {
  try {
    const { detailId } = req.params;
    const newData = req.body;

    // Kiểm tra xem mỗi trường được gửi lên có tồn tại và có giá trị không rỗng không
    const requiredFields = ["colorId", "sizeId",];
    for (const field of requiredFields) {
      if (!newData[field] || newData[field].trim() === "") {
        return res.status(400).json({ EC: 1, error: `${field} is required and cannot be empty.` });
      }
    }
   
    // Validate detailId
    if (!detailId || isNaN(parseInt(detailId))) {
      return res.status(400).json({ EC: 1, error: "Invalid detailId." });
    }

    // Nếu dữ liệu hợp lệ, tiến hành cập nhật
    try {
      const updatedProductVariant = await updateData(detailId, newData);
      res.status(200).json({ EC: 0, message: "Update product details success !", updatedProductVariant });
    } catch (error) {
      console.log(error);
      res.status(500).json({ EC: 1, error: "Failed to update product details." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ EC: 1, error: "Internal server error." });
  }
};

module.exports = { updateProductDataController };
