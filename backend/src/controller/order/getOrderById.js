import { getUserOrdersId } from "../../services/order/getOrderById";

// Controller để lấy danh sách các đơn đặt hàng của người dùng hiện tại
const getUserOrdersController = async (req, res) => {
    try {
        // Lấy userId của người dùng từ tham số trong URL
        const userId = req.params.userId;

        // Gọi hàm getUserOrdersId để lấy danh sách các đơn đặt hàng của người dùng hiện tại
        const { orders } = await getUserOrdersId(userId);

        // Trả về kết quả
        return res.status(200).json({ EC:0,success: true, data : orders});
    } catch (error) {
        console.error("Error getting user orders:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = { getUserOrdersController };
