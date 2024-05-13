import cloudinary from "../../middleware/upload";
import db from "../../models/";

const Upload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

const DeleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
};

const UpdateImage = async (imageId, file) => {
  try {
    const newImageUrl = await Upload(file);
    
    const image = await db.Images.findByPk(imageId);
    if (!image) {
      throw new Error("Image not found");
    }

    // Delete old image from Cloudinary
    const publicId = getPublicIdFromUrl(image.URL);
    await DeleteFromCloudinary(publicId);

    // Update image URL in the database
    image.URL = newImageUrl;
    await image.save();

    return image;
  } catch (error) {
    console.error("Error updating image:", error);
    throw new Error("Failed to update image");
  }
};

const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];
  return publicId;
};

module.exports = { UpdateImage };
