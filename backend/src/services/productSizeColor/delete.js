import db from "../../models/index";

const deleteData = async (detailId) => {
  try {
    // Bước 1: Tìm detailId trong bảng Detail
    const detail = await db.Detail.findByPk(detailId);

    if (!detail) {
      throw new Error('Detail not found');
    }

    // Bước 2: Lấy productVariantId từ detail
    const productVariantId = detail.productVariantId;

    // Bước 3: Xóa bản ghi trong bảng Detail
    await detail.destroy();

    // Bước 4: Xóa bản ghi trong bảng ProductVariant dựa trên productVariantId
    const deletedProductVariantCount = await db.productVariant.destroy({
      where: { id: productVariantId }
    });

    if (deletedProductVariantCount === 0) {
      throw new Error('Product variant not found');
    }

    return { message: 'Data deleted successfully' };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  deleteData,
};
