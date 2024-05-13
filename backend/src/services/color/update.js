import db from "../../models";

const updateColor = async (data) => {
    try {
      const color = await db.Colors.findOne({ where: { id: data.id } });
      if (color) {
        await color.update({
          color: data.color,
          codeColor: data.codeColor,
        });
        return {
          success: "Color Update sucessfully!",
          EC: 0,
          color,
        };
      }
      //console.log(brand);
    } catch (error) {
      console.log(error);
      return {
        EM: "Error server....",
        EC: -1,
      };
    }
  };

  module.exports = {
    updateColor
  }