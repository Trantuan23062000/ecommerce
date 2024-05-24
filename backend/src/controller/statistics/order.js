import db from "../../models";

const CountOrders = async (req,res) =>{
    const totalorder = await db.OrderDetails.count()
    const totalAmount = await db.OrderDetails.sum('total');
    res.status(200).json({data : {totalorder, totalAmount} });
}


module.exports = {CountOrders}