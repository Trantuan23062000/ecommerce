import { deleteBrand } from "../../services/brand/delete"; // Import hàm deleteBrand

// Controller để xóa một thương hiệu
const DeleteBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteBrand(id);

    res.status(200).json({
      EC: 0,
      mes: result.message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errorMessage: "Server Error",
    });
  }
};

module.exports = { DeleteBrand };
