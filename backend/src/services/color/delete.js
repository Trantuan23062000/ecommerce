import db from "../../models";

const deleteColor = async (ColorId) => {
  try {
    const color = await db.Colors.findByPk(ColorId);
    if (!color) {
      return {
        EM: "Color not found",
        EC: 1,
      };
    }

    // Check if the color exists in the productVariant table
    const productVariantExists = await db.productVariant.findOne({
      where: { ColorId },
    });

    if (productVariantExists) {
      return {
        EM: "A color already exists in the product, please delete the corresponding color",
        EC: 1,
      };
    }

    await color.destroy();
    return {
      EM: "Color deleted successfully",
      EC: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "An error occurred while deleting the color",
      EC: 1,
    };
  }
};

module.exports = {
  deleteColor,
};
