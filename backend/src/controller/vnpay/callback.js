import VNPayService from "../../services/vnpay/vnpay";
import { CancelVnPay } from "../../services/order/order";

const secretKey = "Q0RHU1SCQ6KX6HVFETZTCAJLEZNARAX3";
const tmnCode = "GT92S6OD";
const returnUrl = "http://localhost:8000/api/v1/payment/callback";

const vnpayService = new VNPayService(secretKey, tmnCode, returnUrl);

const handleVNPAYCallback = async (req, res) => {
  try {
    const queryParams = req.query;
    const isValidCallback = vnpayService.verifyReturn(queryParams);

    if (isValidCallback) {
      const orderId = queryParams.vnp_TxnRef;
      const paymentStatus = queryParams.vnp_ResponseCode;

      if (paymentStatus === "00") {
        res.redirect("http://localhost:3000/oder-success");
      } else {
        await CancelVnPay(orderId, "failed");
        res.redirect("http://localhost:3000/checkout");
      }
    } else {
      res.status(400).send("Invalid callback");
    }
  } catch (error) {
    console.error("Error processing VNPay callback:", error);
    res.status(500).send("Internal server error");
  }
};

const cancelPaymentVNpay =async (req, res) => {
  try {
    await CancelVnPay(orderId, "failed");
    res.redirect("http://localhost:3000/checkout");
  } catch (error) {
    console.error("Error handling VNPay cancel:", error);
    res.status(500).send("Internal server error");
  }
};


module.exports = { handleVNPAYCallback, cancelPaymentVNpay };
