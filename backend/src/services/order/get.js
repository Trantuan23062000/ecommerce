import db from "../../models";
const getOrder = async () => {
    try {
        // Lấy danh sách đơn hàng từ bảng OrderDetails
        const orders = await db.OrderDetails.findAll({
            include: [{
                model: db.Orders,
                include: [{
                    model: db.Users,
                    attributes: ['id', 'username'] // Chỉ lấy các trường id, username, email từ bảng Users
                }],
                attributes: ['id', 'order_date'] // Chỉ lấy các trường id, createdAt, updatedAt từ bảng Orders
            }],
            attributes: ['id', 'quantity', 'status', 'payment', 'total','data'] // Chỉ lấy các trường id, quantity, status, payment, data từ bảng OrderDetails
        });

        // Trả về danh sách đơn hàng
        return { orders };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {getOrder}
