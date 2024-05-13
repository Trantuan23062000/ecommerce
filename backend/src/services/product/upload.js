import cloudinary from "../../middleware/upload";
import db from "../../models";
const uploadImage = async (files) => {
  try {
    const imageURLs = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path);
      const imageURL = result.secure_url;
      imageURLs.push(imageURL);
    }

    // Lưu các URL vào cơ sở dữ liệu dưới dạng một mảng JSON
    const image = await db.Images.create({ URL: JSON.stringify(imageURLs) });
    return image.id; // Trả về ID của bản ghi Image
  } catch (error) {
    throw error;
  }
};
  
  module.exports = { uploadImage };