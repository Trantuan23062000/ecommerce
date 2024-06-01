import db from "../../models";
import cloudinary from "../../middleware/upload"; // Đảm bảo import đúng file config của Cloudinary

const updateBanner = async (id, file) => {
  try {
    // Lấy thông tin thương hiệu từ cơ sở dữ liệu
    const banner = await db.Banner.findByPk(id);
    if (!banner) {
      throw new Error("Banner not found");
    }

    // Kiểm tra xem có file ảnh mới không
    let newImageURL = null;
    if (file) {
      // Kiểm tra tính hợp lệ của file
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.mimetype)) {
        throw new Error("Invalid file type");
      }

      // Nếu có file mới, tải lên Cloudinary
      const result = await cloudinary.uploader.upload(file.path);
      newImageURL = result.secure_url;

      // Xóa ảnh cũ từ Cloudinary (nếu có)
      if (banner.URL) {
        try {
          const publicId = banner.URL.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error("Lỗi xoá ảnh từ Cloudinary:", error);
        }
      }
    }


    // Nếu có URL mới, cập nhật URL ảnh
    if (newImageURL) {
      banner.URL = newImageURL;
    }

    // Lưu các thay đổi vào cơ sở dữ liệu
    await banner.save();

    return banner;
  } catch (error) {
    console.error("Lỗi:", error);
    throw new Error(error.message);
  }
};

module.exports = { updateBanner };
