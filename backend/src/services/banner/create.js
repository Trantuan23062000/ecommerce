import db from "../../models";
import cloudinary from "../../middleware/upload";

const uploadBanner = async (file) => {
  try {
    if (!file) {
      throw new Error("File is required");
    }

    // Kiểm tra tính hợp lệ của file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error("Invalid file type");
    }

    // Tải lên Cloudinary
    const result = await cloudinary.uploader.upload(file.path);
    const newImageURL = result.secure_url;

    // Tạo thương hiệu mới
    const banner = await db.Banner.create({
      URL: newImageURL,
    });

    return {
      EC: 0,
      mes: 'Banner created successfully',
      DT: banner,
    };
  } catch (error) {
    console.error("Lỗi:", error);
    return {
      EC: 1,
      EM: error.message || "Error creating brand",
    };
  }
};

module.exports = { uploadBanner };
