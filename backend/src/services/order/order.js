  import db from "../../models/index";
  import VNPayService from "../vnpay/vnpay"
  const secretKey = 'Q0RHU1SCQ6KX6HVFETZTCAJLEZNARAX3';
  const tmnCode = 'GT92S6OD'
  const returnUrl = 'http://localhost:8000/api/v1/payment/callback';
  const vnpayService = new VNPayService(secretKey, tmnCode, returnUrl);

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

  const createOrderVnpay = async (orderData, orderDetailData) => {
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
      // Tạo URL thanh toán VNPay
      const paymentParams = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Amount: orderDetailData.total *100 *24000, // Số tiền thanh toán, đơn vị VND
        vnp_CurrCode: 'VND',
        vnp_TxnRef: orderId.toString(), // Mã giao dịch của bạn
        vnp_OrderInfo: `Thanh+toan+don+hang+${orderId}`,
        vnp_OrderType: 'other',
        vnp_Locale: 'vn',
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: orderData.userId, // Địa chỉ IP của khách hàng
        vnp_CreateDate: new Date().toISOString().slice(0, 19).replace(/T|-|:/g, ''),
      };
      const paymentUrl = vnpayService.createPaymentUrl(paymentParams);
      return { newOrder, newOrderDetail, paymentUrl };
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.log(error);
      throw new Error("Failed to create order and order details");
    }
  };
  const cancelOrder = async (orderId) => {
    let transaction;
    try {
      transaction = await db.sequelize.transaction();

      // Tìm đơn hàng
      const order = await db.Orders.findByPk(orderId, { transaction });
      if (!order) {
        throw new Error("Order not found");
      }

      // Lấy chi tiết đơn hàng
      const orderDetails = await db.OrderDetails.findAll({ where: { orderId }, transaction });

      // Hoàn trả số lượng sản phẩm trong bảng ProductVariant
      for (const orderDetail of orderDetails) {
        const data = JSON.parse(orderDetail.data);
        for (const item of data) { // Lặp qua mỗi phần tử trong mảng data
          const productVariantId = item.productVariantId; // Lấy productVariantId
          const productVariant = await db.productVariant.findByPk(productVariantId, { transaction });
          if (productVariant) {
            productVariant.quantity += item.productVariant.quantity; // Sử dụng item.quantity thay vì data[productVariantId]
            await productVariant.save({ transaction });
          }
        }
      }
      // Xóa chi tiết đơn hàng
      await db.OrderDetails.destroy({ where: { orderId }, transaction });
      // Xóa đơn hàng
      await db.Orders.destroy({ where: { id: orderId }, transaction });
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
      const orderDetails = await db.OrderDetails.findAll({ where: { orderId }, transaction });
  
      // Update product variants based on order details
      for (const orderDetail of orderDetails) {
        const data = JSON.parse(orderDetail.data);
        for (const item of data) { // Lặp qua mỗi phần tử trong mảng data
          const productVariantId = item.productVariantId; // Lấy productVariantId
          const productVariant = await db.productVariant.findByPk(productVariantId, { transaction });
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
      console.error('Error deleting order:', error);
      throw error;
    }
  };


  module.exports = { createOrder, createOrderVnpay, cancelOrder,CancelVnPay };
