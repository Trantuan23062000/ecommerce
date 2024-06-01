import db from "../../models";
import cloudinary from "../../middleware/upload";

const uploadImageBrand = async (file, brandData) => {
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
    const newBrand = await db.Brands.create({
      name: brandData.name,
      description: brandData.description,
      URL: newImageURL,
    });

    return {
      EC: 0,
      mes: 'Brand created successfully',
      DT: newBrand,
    };
  } catch (error) {
    console.error("Lỗi:", error);
    return {
      EC: 1,
      EM: error.message || "Error creating brand",
    };
  }
};

export { uploadImageBrand };
