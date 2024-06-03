import db from "../../models";
import { Op } from "sequelize";

const CountOrders = async (req, res) => {
  try {
    // Count orders excluding those with status 3
    const totalorder = await db.OrderDetails.count({
      where: {
        status: {
          [Op.ne]: 3, // Exclude orders with status 3
        },
      },
    });

    // Sum total amounts excluding orders with status 3
    const totalAmount = await db.OrderDetails.sum('total', {
      where: {
        status: {
          [Op.ne]: 3, // Exclude orders with status 3
        },
      },
    });

    // Count orders with status 3
    const totalOrderWithStatus3 = await db.OrderDetails.count({
      where: {
        status: 3, // Only include orders with status 3
      },
    });

    // Sum total amounts for orders with status 3
    const totalAmountWithStatus3 = await db.OrderDetails.sum('total', {
      where: {
        status: 3, // Only include orders with status 3
      },
    });

    // Respond with the results
    res.status(200).json({
      data: {
        totalorder,
        totalAmount,
        totalOrderWithStatus3,
        totalAmountWithStatus3,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while counting orders.' });
  }
};

module.exports = { CountOrders };
