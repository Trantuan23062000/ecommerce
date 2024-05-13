import { Op } from "sequelize";
import db from "../../models";

const SearchColor = async (color) => {
    try {
      let data = await db.Colors.findAll({
        where: {
          color: {
            [Op.like]: `%${color}%`,
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

module.exports = {SearchColor}