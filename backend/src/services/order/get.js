import db from "../../models";
import { Op, fn, col, literal } from "sequelize";

// Hàm lấy danh sách đơn hàng
const getOrder = async () => {
  try {
    const orders = await db.OrderDetails.findAll({
      include: [
        {
          model: db.Orders,
          include: [
            {
              model: db.Users,
              attributes: ["id", "username"],
            },
          ],
          attributes: ["id", "order_date"],
        },
      ],
      attributes: ["id", "quantity", "status", "payment", "total", "data"],
    });

    return { orders };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getOrderCancel = async () =>{
  try {
    const data = await db.CancelOrder.findAll({})
   return {data}
  } catch (error) {
    console.log(error);
  }
   
}

const getOrdersByDateRangeCancel = async (startDate, endDate) => {
  try {
    // Định dạng lại ngày theo chuẩn ISO hoặc RFC2822
    const [startDay, startMonth, startYear] = startDate.split("-");
    const formattedStartDate = `${startDay.padStart(2, "0")}-${startMonth.padStart(2, "0")}-${startYear}`;

    const [endDay, endMonth, endYear] = endDate.split("-");
    const formattedEndDate = `${endDay.padStart(2, "0")}-${endMonth.padStart(2, "0")}-${endYear}`;

    const data = await db.CancelOrder.findAll({
      where: {
        createdAt: {
          [Op.between]: [formattedStartDate, formattedEndDate],
        }
      },
    });
    return { data };
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// Hàm lấy danh sách đơn hàng theo khoảng thời gian
const getOrdersByDateRange = async (startDate, endDate) => {
  try {
    const orders = await db.OrderDetails.findAll({
      include: [
        {
          model: db.Orders,
          where: {
            order_date: {
              [Op.between]: [startDate, endDate],
            },status: { [db.Sequelize.Op.ne]: 3 }
          },
          include: [
            {
              model: db.Users,
              attributes: ["id", "username"],
            },
          ],
          attributes: ["id", "order_date"],
        },
      ],
      attributes: ["id", "quantity", "status", "payment", "total", "data"],
    });
    return { orders };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const calculateDailyRevenue = async () => {
  try {
    const dailyRevenue = await db.OrderDetails.findAll({
      attributes: [
        [fn("DATE", col("createdAt")), "orderDate"],
        [fn("SUM", col("total")), "totalRevenue"],
      ],
      where: {
        status: { [db.Sequelize.Op.ne]: 3 } // Exclude orders with status 3
      },
      group: [literal("DATE(`createdAt`)")],
      order: [[literal("orderDate"), "ASC"]],
      raw: true,
    });

    return { dailyRevenue };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const calculateDailyRevenueDaily = async (startDate, endDate) => {
  const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  // Sử dụng hàm convertDateFormat để chuyển đổi ngày
  const startDateISO = convertDateFormat(startDate);
  const endDateISO = convertDateFormat(endDate);

  // Thêm một ngày vào ngày kết thúc để bao gồm cả ngày kết thúc
  const endDatePlusOne = new Date(endDateISO);
  endDatePlusOne.setDate(endDatePlusOne.getDate() + 1);
  const endDatePlusOneISO = endDatePlusOne.toISOString().split("T")[0];

  try {
    const dailyRevenue = await db.OrderDetails.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDateISO, endDatePlusOneISO],
        },
        status: {
          [Op.ne]: 3, // Exclude orders with status 3
        },
      },
      attributes: [
        [fn("DATE_FORMAT", col("createdAt"), "%Y-%m-%d"), "orderDate"], // Format ngày đầu ra theo YYYY-MM-DD
        [fn("SUM", col("total")), "totalRevenue"],
      ],
      group: [fn("DATE_FORMAT", col("createdAt"), "%Y-%m-%d")], // Nhóm theo ngày định dạng YYYY-MM-DD
      order: [[fn("DATE_FORMAT", col("createdAt"), "%Y-%m-%d"), "ASC"]], // Sắp xếp theo ngày tăng dần
      raw: true,
    });

    // Format lại ngày trả về thành dd/MM/yyyy
    const formattedDailyRevenue = dailyRevenue.map((item) => ({
      orderDate: formatDate(item.orderDate), // Format ngày theo dd/MM/yyyy
      totalRevenue: item.totalRevenue,
    }));

    return { dailyRevenue: formattedDailyRevenue };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const calculateTotalRevenueByDateRange = async (startDate, endDate) => {
  const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  // Convert date strings to ISO format
  const startDateISO = convertDateFormat(startDate);
  const endDateISO = convertDateFormat(endDate);

  // Add one day to the end date to include it in the range
  const endDatePlusOne = new Date(endDateISO);
  endDatePlusOne.setDate(endDatePlusOne.getDate() + 1);
  const endDatePlusOneISO = endDatePlusOne.toISOString().split("T")[0];

  try {
    const totalRevenue = await db.OrderDetails.findOne({
      where: {
        createdAt: {
          [Op.between]: [startDateISO, endDatePlusOneISO],
        },
        status: {
          [Op.ne]: 3, // Exclude orders with status 3
        },
      },
      attributes: [
        [fn("SUM", col("total")), "totalRevenue"],
        [fn("COUNT", col("id")), "totalOrders"],
      ],
      raw: true,
    });

    return {
      totalRevenue: totalRevenue.totalRevenue || 0,
      totalOrders: totalRevenue.totalOrders || 0,
    }; // Return 0 if no revenue is found
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Hàm format ngày
const formatDate = (dateString) => {
  const dateParts = dateString.split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  return `${day}/${month}/${year}`;
};

module.exports = {
  getOrder,
  getOrdersByDateRange,
  calculateDailyRevenue,
  calculateDailyRevenueDaily,calculateTotalRevenueByDateRange,getOrderCancel,getOrdersByDateRangeCancel
};
