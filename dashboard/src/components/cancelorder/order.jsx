import React, { useEffect, useState } from "react";
import { Search, ChevronRight, CheckCircleOutline } from "@mui/icons-material";
import {
  getOrderCancel,
  DatabyCancelDate,
  AcpectCancelOrder,
} from "../../api/oder";
import toast from "react-hot-toast";

const CancelOrder = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Items per page

  const fetchData = async (start, end, page = 1) => {
    const response = await getOrderCancel({
      startDate: start,
      endDate: end,
      page,
      itemsPerPage,
    });
    if (response && response.data && response.data.EC === 0) {
      setData(response.data.data);
    } else {
      toast.error("Fetch data error !");
    }
  };

  const handleClearFilter = async () => {
    setStartDate(""); // Xóa ngày bắt đầu
    setEndDate(""); // Xóa ngày kết thúc
    fetchData(); // Fetch dữ liệu lại
  };

  const handleFilterBydate = async () => {
    if (startDate > endDate) {
      toast.error("Start date cannot be greater than end date");
      return;
    }
    try {
      const response = await DatabyCancelDate(startDate, endDate);
      setData(response.data.data);
    } catch (error) {
      toast.error("Fetch filtered data error !");
    }
  };

  const formatDate = (isoString) => {
    // Tạo một đối tượng Date từ chuỗi thời gian ISO 8601
    const date = new Date(isoString);

    // Lấy các thành phần ngày, tháng và năm từ đối tượng Date
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const year = date.getFullYear();

    // Chuyển đổi thành chuỗi với định dạng "DD/MM/YYYY"
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;

    return formattedDate;
  };

  const hanDleAcpect = async (id) => {
    await AcpectCancelOrder(id);
    toast.success("Apect order")
    fetchData()
   
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(startDate, endDate, page);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <div className="container mx-auto">
        <div className="py-4 ml-4 flex items-center gap-3">
          <span className="text-sm text-gray-400">
            <ChevronRight />
          </span>
          <p className="text-gray-600 font-medium">Order</p>
        </div>
        <section className="dark:bg-gray-900 p-3 sm:p-5">
          <div className="px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                  <div className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                        <Search />
                      </div>
                      <input
                        type="text"
                        className="bg-gray-50 border text-sm rounded-lg block w-full pl-10 p-2"
                        placeholder="Search"
                        required=""
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/4">
                  <input
                    type="date"
                    className="bg-gray-50 border text-sm rounded-lg block w-full pl-2 p-2"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/4">
                  <input
                    type="date"
                    className="bg-gray-50 border text-sm rounded-lg block w-full pl-2 p-2"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
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
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        STT
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Code orders
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Pay
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Number payment
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Name account
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Name bank
                      </th>
                      <th scope="col" className="px-4 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {React.Children.toArray(
                      data && data.length > 0 ? (
                        data
                          .slice(
                            (currentPage - 1) * itemsPerPage,
                            currentPage * itemsPerPage
                          )
                          .map((item, index) => (
                            <tr className="border-b dark:border-gray-700">
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {index + 1 + (currentPage - 1) * itemsPerPage}
                              </th>
                              <td className="px-4 py-3"> {item.id}</td>
                              <td className="px-4 py-3">
                                {" "}
                                <span className="bg-yellow-500 rounded-xl text-white px-1.5 py-2">
                                  {item.pay}$
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                {formatDate(item.date)}
                              </td>

                              <td className="px-4 py-3">
                                {item.status === 2 ? (
                                  <span className="bg-green-500  px-1.5 py-2 rounded-xl text-white">
                                    Hoàn tiền
                                  </span>
                                ) : (
                                  <span className="bg-red-500  px-1.5 py-2 rounded-xl text-white">
                                    Không hoàn tiền
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                {item.numberPayment || "Không có thông tin"}
                              </td>
                              <td className="px-4 py-3">
                                {item.nameAccount || "Không có thông tin"}
                              </td>
                              <td className="px-4 py-3">
                                {item.nameBank || "Không có thông tin"}
                              </td>
                              <td className="px-4 py-3 flex items-center justify-end">
                                <>
                                  <div className="relative">
                                    <div
                                      onClick={() => hanDleAcpect(item.id)}
                                      className="inline-flex items-center p-0.5 text-sm font-medium text-center text-green-500 hover:text-green-800"
                                      type="button"
                                    >
                                      <CheckCircleOutline
                                        style={{ fontSize: 32 }}
                                      />
                                    </div>
                                  </div>
                                </>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            No data
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>

                  {[...Array(totalPages)].map((_, pageIndex) => (
                    <li key={pageIndex}>
                      <button
                        onClick={() => handlePageChange(pageIndex + 1)}
                        className={`flex items-center justify-center text-sm py-2 px-3 leading-tight border ${
                          currentPage === pageIndex + 1
                            ? "text-white bg-blue-500"
                            : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                        } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      >
                        {pageIndex + 1}
                      </button>
                    </li>
                  ))}

                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="flex items-center justify-center h-full py-1.5 px-3 text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CancelOrder;
