import {getOrder} from "../../services/order/get"
const getOrders = async (req, res) => {
    try {
        const {orders } = await getOrder();
        res.status(200).json({ EC:0,success: true, data: orders  });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
module.exports = {
    getOrders
};