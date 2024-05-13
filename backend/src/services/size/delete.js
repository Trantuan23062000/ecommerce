import db from "../../models";

const deleteSize = async (SizeId) => {
    try {
      const sizes = await db.Sizes.findByPk(SizeId);
      if (!sizes) {
        console.log("Size not found");
      } 
      await sizes.destroy();
      return {
        EM: "OK delete",
        EC: 0,
      };
    } catch (error) {
      console.log(error);
    }
  };
module.exports = {
  deleteSize
}
