import db from "../../models/index";

const createOrder = async (orderData, orderDetailData) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    // Thêm đơn hàng vào bảng Orders
    const newOrder = await db.Orders.create(orderData, { transaction });
    const orderId = newOrder.id;

    // Chuyển đổi dữ liệu detail từ mảng sang chuỗi
    const detailString = orderDetailData.details.join(',');

    // Thêm đơn hàng chi tiết vào bảng OrderDetails với orderId đã tạo
    const newOrderDetail = await db.OrderDetails.create(
      { ...orderDetailData, orderId },
      { transaction }
    );

    // Lấy id từ trường detail và tham chiếu đến bảng Details
    const detailIds = orderDetailData.details;
    const productVariantIds = await getProductVariantIds(detailIds, transaction);

    // Cập nhật số lượng sản phẩm trong bảng ProductVariant dựa trên dữ liệu gửi từ client
    await updateProductVariantQuantity(orderDetailData.cart, transaction);

    // Lưu thông tin productVariantId và quantity vào trường data của bảng OrderDetails
    await saveProductVariantInfoToOrderDetails(orderDetailData.cart, newOrderDetail.id, transaction);

    await transaction.commit();
    return { newOrder, newOrderDetail };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.log(error);
    throw new Error("Failed to create order and order details");
  }
};

const saveProductVariantInfoToOrderDetails = async (cart, orderDetailId, transaction) => {
  for (const item of cart) {
    // Tạo hoặc cập nhật dữ liệu trong trường data của bảng OrderDetails
    const orderDetail = await db.OrderDetails.findByPk(orderDetailId, { transaction });
    if (orderDetail) {
      const data = orderDetail.data ? JSON.parse(orderDetail.data) : {};
      // Thêm hoặc cập nhật thông tin productVariantId và số lượng
      data[item.productVariantId] = item.quantity;
      orderDetail.data = JSON.stringify(data);
      await orderDetail.save({ transaction });
    }
  }
};

const getProductVariantIds = async (detailIds, transaction) => {
  const productVariantIds = [];
  // Duyệt qua các id trong mảng detailIds để lấy id của sản phẩm từ bảng Detail
  for (const detailId of detailIds) {
    const detail = await db.Detail.findByPk(detailId, { transaction });
    if (detail) {
      // Thêm id của sản phẩm vào mảng productVariantIds
      productVariantIds.push(detail.productVariantId);
    }
  }
  return productVariantIds;
};

const updateProductVariantQuantity = async (cart, transaction) => {
  for (const item of cart) {
    // Tìm sản phẩm biến thể tương ứng
    const productVariant = await db.productVariant.findByPk(item.productVariantId, { transaction });
    if (productVariant) {
      // Lấy số lượng sản phẩm hiện có từ cơ sở dữ liệu
      const currentQuantity = productVariant.quantity;
      
      // Trừ số lượng sản phẩm trong giỏ hàng từ số lượng hiện có
      const newQuantity = currentQuantity - item.productVariant.quantity;

      // Đảm bảo số lượng không âm
      productVariant.quantity = Math.max(newQuantity, 0);

      // Lưu lại thay đổi vào cơ sở dữ liệu
      await productVariant.save({ transaction });

    }
  }
};


module.exports = { createOrder };
