import db from "../../models";

const deleteSize = async (SizeId) => {
  try {
    const size = await db.Sizes.findByPk(SizeId);
    if (!size) {
      return {
        EM: "Size not found",
        EC: 1,
      };
    }

    // Check if the size exists in the productVariant table
    const productVariantExists = await db.productVariant.findOne({
      where: { SizeId },
    });

    if (productVariantExists) {
      return {
        EM: "Size is associated with a product variant. Please remove the associated product variant first.",
        EC: 1,
      };
    }

    await size.destroy();
    return {
      EM: "Size deleted successfully",
      EC: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "An error occurred while deleting the size",
      EC: 1,
    };
  }
};

module.exports = {
  deleteSize,
};
