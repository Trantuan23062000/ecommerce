import db from "../../models/index";
import { Op } from "sequelize";

const getImages = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const totalImages = await db.Images.count();
    const images = await db.Images.findAll({
      limit: pageSize,
      offset,
      attributes: ["id", "URL"],
      order: [["URL", "DESC"]],
    });
    return { images, totalImages };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

const SearchImage = async (id) => {
  try {
    let image = await db.Images.findAll({
      where: {
        id: {
          [Op.like]: `%${id}%`,
        },
      },
    });
    return {
      EM: "Data search....",
      EC: 0,
      image,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Server Errrorrr...",
      EC: -1,
      DT: "",
    };
  }
};
module.exports = { getImages,SearchImage };
