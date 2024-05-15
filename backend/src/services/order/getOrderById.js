import db from "../../models";
const getUserOrdersId = async (userId) => {
    try {
        // Lấy danh sách đơn hàng của người dùng hiện tại từ bảng OrderDetails
        const orders = await db.OrderDetails.findAll({
            include: [{
                model: db.Orders,
                where: { userId }, // Lọc các đơn hàng theo userId
                attributes: ['id', 'order_date'], // Chỉ lấy các trường id, order_date từ bảng Orders
                include: [{
                    model: db.Users,
                    attributes: ['id', 'username'] // Chỉ lấy các trường id, username từ bảng Users
                }]
            }],
            attributes: ['id', 'quantity', 'status', 'payment', 'total', 'data'], // Chỉ lấy các trường id, quantity, status, payment, data từ bảng OrderDetails
            order: [["id", "ASC"]],
        });
        // Trả về danh sách đơn hàng của người dùng hiện tại
        return { orders };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = { getUserOrdersId };
