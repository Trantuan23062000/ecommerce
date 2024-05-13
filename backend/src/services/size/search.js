import { Op } from "sequelize";
import db from "../../models";

const SearchSize = async (size) => {
    try {
      let data = await db.Sizes.findAll({
        where: {
          size: {
            [Op.like]: `%${size}%`,
          },
        },
        
      });
      return {
        EM: "Data search....",
        EC: 0,
        data
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

module.exports = {SearchSize}