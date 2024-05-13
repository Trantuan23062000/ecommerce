import db from "../../models/index";
import { Op } from "sequelize";

const SearchProduct = async (name) => {
  try {
    const product = await db.Products.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      include: [
        { model: db.Images, attributes: ["id", "URL"] },
        { model: db.Brands, attributes: ["id", "name"] },
      ],
    });
    return product;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  SearchProduct,
};
