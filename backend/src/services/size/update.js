import db from "../../models";

const updateSize = async (data) => {
    try {
      const sizes = await db.Sizes.findOne({ where: { id: data.id } });
      if (sizes) {
        await sizes.update({
          size: data.size,
          description: data.description,
        });
        return {
          success: "Size Update sucessfully!",
          EC: 0,
          sizes,
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
    updateSize
  }