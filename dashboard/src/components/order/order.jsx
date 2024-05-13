import React, { useEffect, useState } from "react";
import { Edit, Delete, Search, Airplay } from "@mui/icons-material";
import { GetOders } from "../../api/oder";
import toast from "react-hot-toast";
import Vieworder from "./vieworder";

const Order = () => {
  const [data, setData] = useState([]);
  const [show,setShow] = useState(false)
  const [order,setOrder] = useState([])
  const fetchData = async () => {
    const response = await GetOders();
    if (response && response.data && response.data.EC === 0) {
      setData(response.data.data);
      setOrder(response.data.data)
    } else {
      toast.error("Fetch data error !");
    }
  };

  const handleShow = (order) =>{
    setOrder(order)
    setShow(true)
  }

  const handleClose = () =>{
    setShow(false)
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <div className="container mx-auto">
    {show && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-transparent opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <Vieworder data={order} close={handleClose} />
          </div>
        </div>
      )}
      <section className="dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
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
                      Total
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Payment
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {React.Children.toArray(
                    data && data.length > 0 ? (
                      data.map((item,index) => (
                        <tr className="border-b dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >{index+1}</th>
                          <td className="px-4 py-3"> {item.id}</td>
                          <td className="px-4 py-3">  {item.total.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}</td>
                          <td className="px-4 py-3">{item.payment}</td>
                          <td className="px-4 py-3"> {item.status ===0 ? 'Have not paid yet':'Paid money'}</td>
                          <td className="px-4 py-3 flex items-center justify-end">
                            <div className="relative">
                            <div
                             onClick={()=>{handleShow(item)}}
                              className="inline-flex items-center p-0.5 text-sm font-medium text-center text-blue-500 hover:text-blue-800"
                              type="button"
                            >
                              <Airplay />
                            </div>
                              <div
                                className="inline-flex items-center p-0.5 text-sm font-medium text-center text-yellow-500 hover:text-yellow-800"
                                type="button"
                              >
                                <Edit />
                              </div>
                              <div
                                className="inline-flex items-center p-0.5 text-sm font-medium text-center text-red-500 hover:text-red-900"
                                type="button"
                              >
                                <Delete />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div>No data</div>
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
                {/* Page {currentPage} of {totalPages} */}
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <div className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
                  </div>
                </li>

                <li>
                  <div className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    1
                  </div>
                </li>

                <li>
                  <div className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
                  </div>
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

export default Order;
