import {getOrder,getOrdersByDateRange,calculateDailyRevenue,calculateDailyRevenueDaily,calculateTotalRevenueByDateRange,getOrderCancel,getOrdersByDateRangeCancel} from "../../services/order/get"
const getOrders = async (req, res) => {
    try {
        const {orders } = await getOrder();
        res.status(200).json({ EC:0,success: true, data: orders  });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getOrdersCancel = async (req, res) => {
    try {
        const {data } = await getOrderCancel();
        res.status(200).json({ EC:0,success: true, data: data  });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const filterRateOrders = async (req,res)=>{
    const { startDate, endDate } = req.query;

    try {
        // Gọi hàm getOrder và truyền các tham số lọc
        const { orders } = await getOrdersByDateRange(startDate, endDate);

        // Trả về kết quả cho client
        res.status(200).json({EC:0,orders });
    } catch (error) {
        // Nếu có lỗi, chuyển sang middleware xử lý lỗi
        next(error);
    }
}

const filterRateOrdersCancel = async (req,res)=>{
    const { startDate, endDate } = req.query;

    try {
        // Gọi hàm getOrder và truyền các tham số lọc
        const { data } = await getOrdersByDateRangeCancel(startDate, endDate);

        // Trả về kết quả cho client
        res.status(200).json({EC:0,data });
    } catch (error) {
        // Nếu có lỗi, chuyển sang middleware xử lý lỗi
        next(error);
    }
}

const Dailyrevenue = async (req,res) =>{
    try {
        const { dailyRevenue } = await calculateDailyRevenue();
        res.status(200).json({ EC:0,data:dailyRevenue });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const DailyrevenueDaily = async (req,res) =>{
    try {
        const { startDate, endDate } = req.query;
  
        if (!startDate || !endDate) {
          return res.status(400).json({ error: 'Start date and end date are required' });
        }
        const { dailyRevenue } = await calculateDailyRevenueDaily(startDate, endDate);
        res.status(200).json({ EC:0,daily:dailyRevenue });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const TotalByDate = async (req,res) =>{
    try {
        const { startDate, endDate } = req.query;
  
        if (!startDate || !endDate) {
          return res.status(400).json({ error: 'Start date and end date are required' });
        }
        const { totalRevenue,totalOrders } = await calculateTotalRevenueByDateRange(startDate, endDate);
        res.status(200).json({ EC:0,totalRevenue,totalOrders});
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    getOrders,filterRateOrders,Dailyrevenue,DailyrevenueDaily,TotalByDate,getOrdersCancel,filterRateOrdersCancel
};