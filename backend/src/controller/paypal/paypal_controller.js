import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox", // Thay 'sandbox' bằng 'live' khi bạn muốn sử dụng trên môi trường sản phẩm
  client_id:
    "AcwytlPb3aDIJriIFhBiwx_NYpKdLkGjyFxo7vK9gvVq0ugvJajcX4_Z0OIXE7RBzDu9nZj-TuCea6-F",
  client_secret:
    "EMWqC7C_GjhbiGahFFufcRTzL5PtS88yr4qq0x2Cb3aUKT2JaEekbu398Fom0zvLIuEuBmOy2q97bdpU",
});

const createPayment = (req, res, next) => {
    // Lấy thông tin payment từ request body
    const { orderDetailData } = req.body;
    // Tạo payment JSON để gửi đến PayPal
    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        transactions: [{
            amount: {
                currency: 'USD',
                total:orderDetailData.total
            },
            description:"Thanh toan hoa don"
        }],
        redirect_urls: {
            return_url: 'http://localhost:3000/oder-success', // URL để chuyển về khi thanh toán thành công
            cancel_url: 'http://localhost:3000/checkout' // URL để chuyển về khi thanh toán bị hủy bỏ
        }
    };
  
    // Tạo payment với PayPal
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to create payment' });
        } else {
            // Tìm URL phê duyệt và trả về cho client
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    return res.json({ EC:0,approval_url: payment.links[i].href });
                }
            }
            return res.status(500).json({ message: 'Approval URL not found' });
        }
    });
  };
  
  const executePayment = (req, res) => {
    const { paymentId, PayerID } = req.query;
    const execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: "100" // Điều chỉnh số tiền cần lưu vào Local Storage nếu cần
                },
            },
        ],
    };

    paypal.payment.execute(
        paymentId,
        execute_payment_json,
        function (error, payment) {
            if (error) {
                console.error(error.response);
                res.status(500).json({ message: "Failed to execute payment" });
            } else {
                // Lưu dữ liệu vào Local Storage sau khi thanh toán thành công
                localStorage.setItem("paymentData", JSON.stringify(payment));

                console.log(JSON.stringify(payment));
                res.status(200).json({ EC: 0 });
            }
        }
    );
};

const cancelPayment = (req, res) => {
  try {
    res.send("Payment canceled");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to cancel payment" });
  }
};

module.exports = { createPayment, executePayment, cancelPayment };
