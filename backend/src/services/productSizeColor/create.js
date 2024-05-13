import db from "../../models/index";

const addProductData = async (productId, productvariants) => {
    const transaction = await db.sequelize.transaction();
    try {
        const productVariantIds = [];
        // Thêm mới các product variants và lưu id vào productVariantIds
        for (const variant of productvariants) {
            const productVariant = await db.productVariant.create({
                colorId: variant.colorId,
                sizeId: variant.sizeId,
                quantity: variant.quantity
                // Các trường dữ liệu khác của product variant
            }, { transaction });
            productVariantIds.push(productVariant.id);
        }

        // Thêm dữ liệu vào bảng Details
        const detailsData = productVariantIds.map(productVariantId => ({ productId, productVariantId }));
        const data = await db.Detail.bulkCreate(detailsData, { transaction });
  
        // Commit transaction
        await transaction.commit();
  
        return {
            success: true,
            message: "Product data added successfully."
        };
    } catch (error) {
        // Rollback transaction nếu có lỗi xảy ra
        await transaction.rollback();
        console.log(error);
        return {
            success: false,
            message: "Failed to add product data."
        };
    }
};


module.exports = {
  addProductData,
};
