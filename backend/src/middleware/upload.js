// middleware/cloudinaryConfig.js
import cloudinary from 'cloudinary';
require("dotenv").config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export default cloudinary;