import { getImageById } from "../../services/productSizeColor/getImagebyId";

const GetimageById = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await getImageById(imageId);
    if (image) {
      res.status(200).json({
        EC: 0,
        image,
      });
    } else {
      res.status(201).json({
        EC: 1,
        image: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GetimageById };
