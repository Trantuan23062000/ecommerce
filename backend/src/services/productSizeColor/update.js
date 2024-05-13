import db from "../../models/index";

const updateData = async (detailId, newData) => {
  let transaction;
  try {
    // Bắt đầu một transaction
    transaction = await db.sequelize.transaction();

    // Bước 1: Tìm detailId trong bảng Detail
    const detail = await db.Detail.findByPk(detailId, { transaction });

    if (!detail) {
      throw new Error("Detail not found");
    }

    // Bước 2: Lấy productVariantId từ detail
    const productVariantId = detail.productVariantId;

    // Bước 3: Tìm bản ghi trong bảng productVariant dựa trên productVariantId
    const productVariant = await db.productVariant.findByPk(productVariantId, {
      include: [db.Sizes, db.Colors], // Kết hợp với bảng Size và Color
      transaction,
    });
    const size = await db.Sizes.findByPk(productVariant.sizeId, {
      transaction,
    });
    const color = await db.Colors.findByPk(productVariant.colorId, {
      transaction,
    });
    if (size || color || productVariant) {
      // Cập nhật thông tin của size
      await color.update(newData, { transaction });
      await size.update(newData, { transaction });
      await productVariant.update(newData, { transaction });
    } else {
      // Nếu không tìm thấy size, ném ra một lỗi
      throw new Error("Data not found");
    }

    // Commit transaction nếu mọi thứ diễn ra thành công
    await transaction.commit();

    // Trả về kết quả sau khi cập nhật
    return productVariant
  } catch (error) {
    // Rollback transaction nếu có lỗi xảy ra
    if (transaction) await transaction.rollback();

    // Bắt lỗi và xử lý tại đây
    console.log(error);
  }
};

module.exports = {
  updateData,
};
