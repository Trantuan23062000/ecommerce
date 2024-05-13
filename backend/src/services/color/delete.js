import db from "../../models";

const deleteColor = async (ColorId) => {
    try {
      const color = await db.Colors.findByPk(ColorId);
      if (!color) {
        console.log("Color not found");
      } 
      await color.destroy();
      return {
        EM: "OK delete",
        EC: 0,
      };
    } catch (error) {
      console.log(error);
    }
  };
module.exports = {
    deleteColor
}
