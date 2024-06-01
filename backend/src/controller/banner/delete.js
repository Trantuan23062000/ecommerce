import { deleteBanner } from "../../services/banner/delete"; // Import hàm deleteBrand

// Controller để xóa một thương hiệu
const DeleteBanner = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteBanner(id);

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

module.exports = { DeleteBanner };
