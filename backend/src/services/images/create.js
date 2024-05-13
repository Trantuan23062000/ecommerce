import cloudinary from "../../middleware/upload"
import db from "../../models/index";

const Upload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

const isImageExists = async (url) => {
  const image = await db.Images.findOne({ where: { URL: url } });
  return image !== null;
};

const CreateImage = async (fileData) => {
  try {
    const imageURL = await Upload(fileData);

    const imageExists = await isImageExists(imageURL);

    if (imageExists) {
      throw new Error("Image already exists!");
    }
    const images = await db.Images.create({ URL: imageURL});
    //console.log(images);
    return images;
  } catch (error) {
    console.error("Error creating image:", error);
    throw error;
  }
};

module.exports ={
    CreateImage
}