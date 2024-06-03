import db from "../../models/index";
import VNPayService from "../vnpay/vnpay";
const secretKey = "Q0RHU1SCQ6KX6HVFETZTCAJLEZNARAX3";
const tmnCode = "GT92S6OD";
const returnUrl = "http://localhost:8000/api/v1/payment/callback";
const vnpayService = new VNPayService(secretKey, tmnCode, returnUrl);

const createOrder = async (orderData, orderDetailData) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    // Thêm đơn hàng vào bảng Orders
    const newOrder = await db.Orders.create(orderData, { transaction });
    const orderId = newOrder.id;

    // Thêm đơn hàng chi tiết vào bảng OrderDetails với orderId đã tạo
    const newOrderDetail = await db.OrderDetails.create(
      { ...orderDetailData, orderId },
      { transaction }
    );
    // Cập nhật số lượng sản phẩm trong bảng ProductVariant dựa trên dữ liệu gửi từ client
    await updateProductVariantQuantity(orderDetailData.cart, transaction);

    // Lưu thông tin productVariantId và quantity vào trường data của bảng OrderDetails
    await saveProductVariantInfoToOrderDetails(
      orderDetailData.cart,
      newOrderDetail.id,
      transaction
    );

    await transaction.commit();
    return { newOrder, newOrderDetail };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.log(error);
    throw new Error("Failed to create order and order details");
  }
};

const saveProductVariantInfoToOrderDetails = async (
  cart,
  orderDetailId,
  transaction
) => {
  for (const item of cart) {
    // Tạo hoặc cập nhật dữ liệu trong trường data của bảng OrderDetails
    const orderDetail = await db.OrderDetails.findByPk(orderDetailId, {
      transaction,
    });
    if (orderDetail) {
      const data = orderDetail.data ? JSON.parse(orderDetail.data) : {};
      // Thêm hoặc cập nhật thông tin productVariantId và số lượng
      data[item.productVariantId] = item.quantity;
      orderDetail.data = JSON.stringify(data);
      await orderDetail.save({ transaction });
    }
  }
};


const updateProductVariantQuantity = async (cart, transaction) => {
  for (const item of cart) {
    // Tìm sản phẩm biến thể tương ứng
    const productVariant = await db.productVariant.findByPk(
      item.productVariantId,
      { transaction }
    );
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

const createOrderVnpay = async (orderData, orderDetailData) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    // Thêm đơn hàng vào bảng Orders
    const newOrder = await db.Orders.create(orderData, { transaction });
    const orderId = newOrder.id;
    // Thêm đơn hàng chi tiết vào bảng OrderDetails với orderId đã tạo
    const newOrderDetail = await db.OrderDetails.create(
      { ...orderDetailData, orderId },
      { transaction }
    );
    // Cập nhật số lượng sản phẩm trong bảng ProductVariant dựa trên dữ liệu gửi từ client
    await updateProductVariantQuantity(orderDetailData.cart, transaction);

    // Lưu thông tin productVariantId và quantity vào trường data của bảng OrderDetails
    await saveProductVariantInfoToOrderDetails(
      orderDetailData.cart,
      newOrderDetail.id,
      transaction
    );
    await transaction.commit();
    // Tạo URL thanh toán VNPay
    const paymentParams = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Amount: orderDetailData.total * 100 * 24000, // Số tiền thanh toán, đơn vị VND
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId.toString(), // Mã giao dịch của bạn
      vnp_OrderInfo: `Thanh+toan+don+hang+${orderId}`,
      vnp_OrderType: "other",
      vnp_Locale: "vn",
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: orderData.userId, // Địa chỉ IP của khách hàng
      vnp_CreateDate: new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/T|-|:/g, ""),
    };
    const paymentUrl = vnpayService.createPaymentUrl(paymentParams);
    return { newOrder, newOrderDetail, paymentUrl };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.log(error);
    throw new Error("Failed to create order and order details");
  }
};
const cancelOrder = async (orderId,numberPayment,nameBank,nameAccount) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    // Tìm đơn hàng
    const order = await db.Orders.findByPk(orderId, { transaction });
    if (!order) {
      throw new Error("Order not found");
    }

    // Lấy chi tiết đơn hàng
    const orderDetails = await db.OrderDetails.findAll({
      where: { orderId },
      transaction,
    });
    // Hoàn trả số lượng sản phẩm trong bảng ProductVariant
    for (const orderDetail of orderDetails) {
      const data = JSON.parse(orderDetail.data);
      for (const item of data) {
        // Lặp qua mỗi phần tử trong mảng data
        const productVariantId = item.productVariantId; // Lấy productVariantId
        const productVariant = await db.productVariant.findByPk(
          productVariantId,
          { transaction }
        );
        if (productVariant) {
          productVariant.quantity += item.productVariant.quantity; // Sử dụng item.quantity thay vì data[productVariantId]
          await productVariant.save({ transaction });
        }
      }
    }
    
    const orderDetailIds = orderDetails.map(detail => detail.id);
    
   
    const total = orderDetails.map(detail => detail.total);
   
    const totalPay = total.join();
    // Chuyển danh sách id thành chuỗi
    const orderDetailIdString = orderDetailIds.join(",");
    const paymentstatus = orderDetails.map(detail=>detail.payment)
    if (paymentstatus === "Delivery") {
      await db.OrderDetails.update(
        { status: 3 },
        {
          where: {
            id: orderDetailIds
          },
          transaction
        }
      );
      await db.CancelOrder.create(
        {
          orderDetailId: orderDetailIdString,
          date: new Date().toISOString(),
          pay: totalPay, // Lấy từ trường total của đơn hàng
          status: "1", // Lấy giá trị status là '1'
          numberPayment: numberPayment,
          nameBank: nameBank,
          nameAccount: nameAccount
        },
        { transaction }
      );
    } else {
      await db.OrderDetails.update(
        { status: 3 },
        {
          where: {
            id: orderDetailIds
          },
          transaction
        }
      );
      await db.CancelOrder.create(
        {
          orderDetailId: orderDetailIdString,
          date: new Date().toISOString(),
          pay: totalPay, // Lấy từ trường total của đơn hàng
          status: "2", // Lấy giá trị status là '2'
          numberPayment: numberPayment,
          nameBank: nameBank,
          nameAccount: nameAccount
        },
        { transaction }
      );
    }
    
    // // Xóa chi tiết đơn hàng
    // await db.OrderDetails.destroy({ where: { orderId }, transaction });
    // // Xóa đơn hàng
    // await db.Orders.destroy({ where: { id: orderId }, transaction });

    await transaction.commit();
    return { message: "Order cancelled successfully" };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.log(error);
    throw new Error("Failed to cancel order");
  }
};

const CancelVnPay = async (orderId) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    // Find the order
    const order = await db.Orders.findByPk(orderId, { transaction });
    if (!order) {
      await transaction.rollback();
      throw new Error("Order not found");
    }

    // Find the order details
    const orderDetails = await db.OrderDetails.findAll({
      where: { orderId },
      transaction,
    });

    // Update product variants based on order details
    for (const orderDetail of orderDetails) {
      const data = JSON.parse(orderDetail.data);
      for (const item of data) {
        // Lặp qua mỗi phần tử trong mảng data
        const productVariantId = item.productVariantId; // Lấy productVariantId
        const productVariant = await db.productVariant.findByPk(
          productVariantId,
          { transaction }
        );
        if (productVariant) {
          productVariant.quantity += item.productVariant.quantity; // Sử dụng item.quantity thay vì data[productVariantId]
          await productVariant.save({ transaction });
        }
      }
      await orderDetail.destroy({ transaction });
    }

    // Delete the order
    await order.destroy({ transaction });

    // Commit the transaction
    await transaction.commit();
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error deleting order:", error);
    throw error;
  }
};


const confirmCancel = async (cancelOrderId) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    // Lấy CancelOrder từ cancelOrderId
    const cancelOrder = await db.CancelOrder.findByPk(cancelOrderId, { transaction });
    if (!cancelOrder) {
      throw new Error("CancelOrder not found");
    }
    
    // Lấy danh sách các OrderDetailIds từ CancelOrder
    const orderDetailIds = cancelOrder.orderDetailId.split(","); // Assuming orderDetailId is a string of comma-separated IDs

    // Lấy danh sách các OrderDetails tương ứng từ CancelOrder
    const orderDetails = await db.OrderDetails.findAll({
      where: {
        id: orderDetailIds
      },
      transaction
    });

    // Lấy danh sách các OrderId từ OrderDetails
    const orderIds = orderDetails.map(detail => detail.orderId);

    // Xóa các bản ghi từ bảng OrderDetails
    await db.OrderDetails.destroy({
      where: {
        id: orderDetailIds
      },
      transaction
    });

    // Xóa các bản ghi từ bảng Orders
    await db.Orders.destroy({
      where: {
        id: orderIds
      },
      transaction
    });

    // Xóa bản ghi từ bảng CancelOrders
    await db.CancelOrder.destroy({
      where: {
        id: cancelOrderId
      },
      transaction
    });

    await transaction.commit();
    return { message: "Order cancelled and records deleted successfully" };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.log(error);
    throw new Error("Failed to confirm cancel and delete records");
  }
};

module.exports = { createOrder, createOrderVnpay, cancelOrder, CancelVnPay,confirmCancel };
