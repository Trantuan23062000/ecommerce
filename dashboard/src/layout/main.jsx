import React, { useEffect, useState } from "react";
import {
  AccountBox,
  ChevronRight,
  Inventory,
  ReviewsOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import { CountOders, CountProducts, CountUsers } from "../api/statics";
import { Dailytotal, FilterDaylyTotal, DatabyDate } from "../api/oder";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import toast from "react-hot-toast";

const Main = () => {
  const [coutOrders, setCountOders] = useState([]);
  const [countProducts, setProducts] = useState([]);
  const [countUsers, setCountUsers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [filter, Setfilter] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [showCharts, setShowCharts] = useState(false);

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
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatOrderDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

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
      const data = await DatabyDate(formattedStartDate, formattedEndDate);
      if (data.data.EC === 0) {
        setDataFilter(data.data);
      } else {
        setDataFilter([]);
      }
      Setfilter(response.data.daily);
    } catch (error) {
      toast.error("Fetch filtered data error !");
    }
  };

  const handleClearFilter = async () => {
    setStartDate("");
    setEndDate("");
    window.location.reload();
  };

  const fetchDataOrders = async () => {
    try {
      const response = await Dailytotal({});
      if (response.data.EC === 0) {
        setData(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Fail to fetch data");
    }
  };

  const orderDates =
    formattedFilter.length > 0
      ? formattedFilter.map((item) => item.orderDate)
      : data.map((item) => item.orderDate);

  const chartData = {
    labels: orderDates,
    datasets: [
      {
        label: "Revenue",
        data:
          filter.length > 0
            ? filter.map((item) => item.totalRevenue)
            : data.map((item) => item.totalRevenue),
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const lineChartData = {
    labels: orderDates,
    datasets: [
      {
        label: "Total Orders",
        data:
          filter.length > 0
            ? filter.map((item) => item.totalRevenue)
            : data.map((item) => item.totalRevenue),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "x",
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "dd/MM/yyyy",
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value, context) => value.toFixed(2),
        color: "black",
        font: {
          weight: "bold",
        },
      },
    },
    barThickness: 30,
  };

  useEffect(() => {
    fetchCountOders();
    fetchProducts();
    fetchUsers();
    fetchDataOrders();
    // eslint-disable-next-line
  }, []);


  return (
    <div className="container mx-auto p-6 flex-1">
      <div className="flex items-center gap-3">
        <ChevronRight />
        <p className="text-xl font-bold text-black">Dashboard</p>
      </div>

      {/* Filter section */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 mt-12 bg-gray-50 rounded-lg p-4">
        <div className="w-full md:w-1/4">
          <input
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            className="bg-gray-100 border text-sm rounded-lg block w-full pl-2 py-2"
          />
        </div>
        <div className="w-full md:w-1/4">
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            className="bg-gray-100 border text-sm rounded-lg block w-full pl-2 py-2"
          />
        </div>
        <div className="w-full md:w-1/4">
          <button
            onClick={handleFilterBydate}
            className="bg-black w-full hover:bg-yellow-500 rounded-lg text-white font-bold py-2 px-4 transition duration-300 ease-in-out"
          >
            Filter
          </button>
        </div>
        <div className="w-full md:w-1/4">
          <button
            onClick={handleClearFilter}
            className="bg-red-500 hover:bg-blue-500 w-full rounded-lg text-white font-bold py-2 px-4 transition duration-300 ease-in-out"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-12">
        {/* Orders */}
        <div className="bg-gray-100 text-black rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <ShoppingCart style={{ fontSize: 48, marginRight: 12 }} />
            Orders
          </h2>
          <p>Total Orders: {dataFilter.totalOrders || coutOrders.totalorder}</p>
          <p>Total cancel Orders: {coutOrders.totalOrderWithStatus3}</p>
        </div>
        {/* Products */}
        <div className="bg-gray-100 text-black rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Inventory style={{ fontSize: 48, marginRight: 12 }} />
            Products
          </h2>
          <p>Total Products all time: {countProducts}</p>
        </div>
        {/* Accounts */}
        <div className="bg-gray-100 text-black rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AccountBox style={{ fontSize: 48, marginRight: 12 }} />
            Accounts
          </h2>
          <p>Total accounts all time: {countUsers}</p>
        </div>
        {/* Total Revenue */}
        <div className="bg-gray-100 text-black rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <ReviewsOutlined style={{ fontSize: 48, marginRight: 12 }} />
            Total Revenue
          </h2>
          {dataFilter.totalAmount !== undefined ? (
            <>no data</>
          ) : dataFilter.totalRevenue !== undefined ? (
            <>
              <p>Total startDate to endDate: {dataFilter.totalRevenue} $</p>
              <p>
                To VND:{" "}
                {(dataFilter.totalRevenue * 25457).toLocaleString("vi-VN")} VND
              </p>
            </>
          ) : (
            <>
              <p>Total Revenue all time: {coutOrders.totalAmount} $</p>
              <p>
                To VND:{" "}
                {(coutOrders.totalAmount * 25457).toLocaleString("vi-VN")} VND
              </p>
            </>
          )}
          {dataFilter.totalRevenue && (
            <p>
              Two decimal digits:{" "}
              {dataFilter.totalRevenue.toString().includes(".")
                ? dataFilter.totalRevenue.toString().split(".")[1].slice(0, 2)
                : "00"}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setShowCharts(!showCharts)}
          className="bg-black text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500 hover:text-black animate-bounce"
        >
          {showCharts ? "Hide Charts" : "Show Charts"}
        </button>
      </div>

      {showCharts && (
        <>
          {/* Charts */}
          <div className="pt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Total Revenue Barchar
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              {dataFilter.totalRevenue === 0 ? (
                <p>No data available</p>
              ) : (
                <Bar data={chartData} options={chartOptions} />
              )}
            </div>
          </div>

          <div className="pt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Total Revenue Linechar
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              {dataFilter.totalRevenue === 0 ? (
                <p>No data available</p>
              ) : (
                <Line data={lineChartData} options={chartOptions} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
