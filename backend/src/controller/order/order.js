import { createOrder,createOrderVnpay,cancelOrder,confirmCancel } from "../../services/order/order"; // Đảm bảo rằng đường dẫn đúng

const Orders = async (req, res) => {
  try {
    const { orderData, orderDetailData } = req.body; // Lấy dữ liệu đơn hàng và chi tiết đơn hàng từ body của request
    const paymentUrl = await createOrder(orderData, orderDetailData); // Gọi hàm createOrder để tạo đơn hàng và nhận link thanh toán
    res.status(201).json({ paymentUrl, EC: 0 }); // Trả về link thanh toán với mã trạng thái 201 (Created)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" }); // Trả về lỗi nếu có bất kỳ lỗi nào xảy ra
  }
};
const vnPay = async (req, res) => {
  try {
    const { orderData, orderDetailData } = req.body; // Lấy dữ liệu đơn hàng và chi tiết đơn hàng từ body của request
    const {  paymentUrl,newOrder, newOrderDetail, } = await createOrderVnpay(orderData, orderDetailData); // Gọi hàm createOrder để tạo đơn hàng và nhận kết quả
    res.status(201).json({ newOrder, newOrderDetail, paymentUrl, EC: 0 }); // Trả về kết quả với mã trạng thái 201 (Created)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" }); // Trả về lỗi nếu có bất kỳ lỗi nào xảy ra
  }
};

const cancelOrders = async (req, res) => {
  const { orderId ,numberPayment,nameBank,nameAccount } = req.body;
  try {
    const result = await cancelOrder(orderId,numberPayment,nameBank,nameAccount);
    res.status(200).json({EC:0 ,result});
  } catch (error) {
    res.status(500).json({ EC:1 ,message: "Failed to cancel order", error: error.message });
  }
};


const ConfirmCancelOrder = async (req, res) => {
  const cancelOrderId = req.params.id;
  try {
    const result = await confirmCancel(cancelOrderId);
    res.status(200).json({EC:0 ,result});
  } catch (error) {
    res.status(500).json({ EC:1 ,message: "Failed to cancel order", error: error.message });
  }
};



module.exports = { Orders,vnPay,cancelOrders,ConfirmCancelOrder };