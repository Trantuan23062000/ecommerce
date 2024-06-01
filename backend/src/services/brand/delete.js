import db from "../../models";
import cloudinary from "../../middleware/upload"; // Đảm bảo import đúng file config của Cloudinary

const deleteBrand = async (id) => {
  try {
    // Lấy thông tin thương hiệu từ cơ sở dữ liệu
    const brand = await db.Brands.findByPk(id);
    if (!brand) {
      throw new Error("Brand not found");
    }

    // Xóa ảnh từ Cloudinary (nếu có)
    if (brand.URL) {
      try {
        // Lấy public_id từ URL của ảnh
        const publicId = brand.URL.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Lỗi xoá ảnh từ Cloudinary:", error);
      }
    }

    // Xóa thương hiệu khỏi cơ sở dữ liệu
    await brand.destroy();

    return { message: "Brand deleted successfully" };
  } catch (error) {
    console.error("Lỗi:", error);
    throw new Error(error.message);
  }
};

module.exports = { deleteBrand };
