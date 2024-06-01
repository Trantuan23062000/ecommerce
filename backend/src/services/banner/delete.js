import db from "../../models";
import cloudinary from "../../middleware/upload"; // Đảm bảo import đúng file config của Cloudinary

const deleteBanner = async (id) => {
  try {
    // Lấy thông tin thương hiệu từ cơ sở dữ liệu
    const banner = await db.Banner.findByPk(id);
    if (!banner) {
      throw new Error("Banner not found");
    }

    // Xóa ảnh từ Cloudinary (nếu có)
    if (banner.URL) {
      try {
        // Lấy public_id từ URL của ảnh
        const publicId = banner.URL.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Lỗi xoá ảnh từ Cloudinary:", error);
      }
    }

    // Xóa thương hiệu khỏi cơ sở dữ liệu
    await banner.destroy();

    return { message: "Banner deleted successfully" };
  } catch (error) {
    console.error("Lỗi:", error);
    throw new Error(error.message);
  }
};

module.exports = { deleteBanner };
