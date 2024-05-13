import cloudinary from "../../middleware/upload";
import db from "../../models/index";

const DeleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
};

const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];
  return publicId;
};

const DeleteImages = async (imageId) => {
  try {
    const image = await db.Images.findByPk(imageId);
    if (!image) {
      console.log("Image not found");
      return;
    }

    // Delete old image from Cloudinary
    const publicId = getPublicIdFromUrl(image.URL);
    await DeleteFromCloudinary(publicId);


    // Xoá hình ảnh khỏi cơ sở dữ liệu
    await image.destroy();
    console.log("Image deleted from database");

    return {
      image
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  DeleteImages
}
