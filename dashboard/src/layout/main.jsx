import React, { useEffect, useState } from "react";
import {
  AccountBox,
  ChevronRight,
  Inventory,
  ReviewsOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import { CountOders, CountProducts, CountUsers } from "../api/statics";
import { Dailytotal, FilterDaylyTotal } from "../api/oder";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import toast from "react-hot-toast";

const Main = () => {
  const [coutOrders, setCountOders] = useState([]);
  const [countPdoducts, setProducts] = useState([]);
  const [countUsers, setCountUsers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [filter, Setfilter] = useState([]);
  const fetchCountOders = async () => {
    const response = await CountOders();
    setCountOders(response.data.data);
  };
  const fetchProducts = async () => {
    const response = await CountProducts();
    setProducts(response.data.Product);
  };

  const fetchUsers = async () => {
    const response = await CountUsers();
    setCountUsers(response.data.users);
  };

  const formatDateToSend = (dateString) => {
    // Chuyển đổi từ chuỗi 'yyyy-mm-dd' sang mảng [yyyy, mm, dd]
    const [year, month, day] = dateString.split("-");

    // Định dạng lại chuỗi ngày tháng năm theo định dạng 'dd/mm/yyyy'
    return `${day}/${month}/${year}`;
  };

  const formatOrderDate = (dateString) => {
    // Tách ngày, tháng và năm từ chuỗi
    const [day, month, year] = dateString.split("/");
  
    // Định dạng lại theo định dạng 'yyyy-mm-dd'
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  
  // Sử dụng formatOrderDate để định dạng lại orderDate trong filter
  const formattedFilter = filter.map((item) => ({
    ...item,
    orderDate: formatOrderDate(item.orderDate),
  }));

  const handleFilterBydate = async () => {
    if (startDate > endDate) {
      toast.error("Start date cannot be greater than end date");
      return;
    }
    try {
      const formattedStartDate = formatDateToSend(startDate);
      const formattedEndDate = formatDateToSend(endDate);
      const response = await FilterDaylyTotal(
        formattedStartDate,
        formattedEndDate
      );

      // Set filter data and mark as filtered
      Setfilter(response.data.daily);
    } catch (error) {
      toast.error("Fetch filtered data error !");
    }
  };


  const handleClearFilter = async () => {
    setStartDate(""); // Xóa ngày bắt đầu
    setEndDate(""); // Xóa ngày kết thúc
    window.location.reload()
     
  };

  const fetchDataOrdders = async () => {
    try {
      const response = await Dailytotal({});
      if (response.data.EC === 0) {
        setData(response.data.data);
      } else {
        toast.error("errr");
      }
    } catch (error) {
      toast.error("fail data");
    }
  };

  const orderDates = formattedFilter.length > 0 ? formattedFilter.map((item) => item.orderDate) : data.map((item) => item.orderDate);

  const chartData = {
    labels: orderDates,
    datasets: [
      {
        label: "Revenue",
        data: filter.length > 0 ? filter.map((item) => item.totalRevenue) : data.map((item) => item.totalRevenue),
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };
  const chartOptions = {
    indexAxis: "x", // Hiển thị trục x theo chiều ngang
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "dd/MM/yyyy", // Định dạng ngày tháng
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // Ẩn chú thích
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: function (value, context) {
          return context.dataset.data[context.dataIndex].totalRevenue.toFixed(
            2
          );
        },
        color: "black",
        font: {
          weight: "bold",
        },
      },
    },
    barThickness: 30, // Độ dày của các cột, chỉnh sửa theo nhu cầu
  };

  useEffect(() => {
    fetchCountOders();
    fetchProducts();
    fetchUsers();
    fetchDataOrdders();
  }, []);
  return (
    <div className="flex-1 p-6 mx-auto container">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">
          <ChevronRight />
        </span>
        <p className="text-black text-xl font-bold">Doashboard</p>
      </div>
      <div className="flex flex-col bg-gray-50 rounded-lg md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 mt-12">
        <div className="w-full md:w-1/4">
          <input
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            className="bg-gray-50 border text-sm rounded-lg block w-full pl-2 p-2"
          />
        </div>
        <div className="w-full md:w-1/4">
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            className="bg-gray-50 border text-sm rounded-lg block w-full pl-2 p-2"
          />
        </div>
        <div className="w-full md:w-1/4">
          <button
            onClick={handleFilterBydate}
            className="bg-black w-full rounded-lg text-white font-bold py-2 px-4"
          >
            Filter
          </button>
        </div>
        <div className="w-full md:w-1/4">
          <button
            onClick={handleClearFilter}
            className="bg-red-500 w-full rounded-lg text-white font-bold py-2 px-4"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-12">
        <div className="bg-gray-100 text-black rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <ShoppingCart style={{ fontSize: 48, marginRight: 12 }} />
            Orders
          </h2>
          <p>Total Oders all time:{coutOrders.totalorder} Oders</p>
        </div>
        <div className="bg-gray-100 text-black rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Inventory style={{ fontSize: 48, marginRight: 12 }} />
            Products
          </h2>
          <p>Total Product all times : {countPdoducts} Products</p>
        </div>
        <div className="bg-gray-100 text-black rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AccountBox style={{ fontSize: 48, marginRight: 12 }} />
            Account
          </h2>
          <p>Total account all the time: {countUsers} Acount</p>
        </div>
        <div className="bg-gray-100 text-black rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <ReviewsOutlined style={{ fontSize: 48, marginRight: 12 }} />
            Total Revenue
          </h2>
          {coutOrders && coutOrders.totalAmount !== undefined ? (
            <>
              <p>
                Total Revenue all the time : {coutOrders.totalAmount.toFixed(2)}{" "}
                $
              </p>
              <p>
                to VND :{" "}
                {(coutOrders.totalAmount * 25457).toLocaleString("vi-VN")}VND
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <div className="pt-8">
        <h2 className="text-2xl font-semibold mb-4">Order Statistics</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Main;
