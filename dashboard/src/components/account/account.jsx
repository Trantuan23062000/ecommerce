import {
  Airplay,
  ChevronRight,
  Delete,
  Edit,
  Search,
} from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Account = () => {
  const { data, loading, error, showDatabyIdUser } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3); // Số lượng người dùng hiển thị trên mỗi trang
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = data.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="flex items-center justify-center min-h-screen">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto">
        <div className="flex items-center justify-center min-h-screen">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="py-4 ml-4 flex items-center gap-3">
        <span className="text-sm text-gray-400">
          <ChevronRight />
        </span>
        <p className="text-gray-600 font-medium">Account</p>
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
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search />
                    </div>
                    <input
                      type="text"
                      className="bg-gray-50 border text-sm rounded-lg block w-full pl-10 p-2"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/4">
                <input
                  type="date"
                  className="bg-gray-50 border text-sm rounded-lg block w-full pl-2 p-2"
                />
              </div>
              <div className="w-full md:w-1/4">
                <input
                  type="date"
                  className="bg-gray-50 border text-sm rounded-lg block w-full pl-2 p-2"
                />
              </div>
              <div className="w-full md:w-1/4">
                <button className="bg-black w-full rounded-lg text-white font-bold py-2 px-4">
                  Filter
                </button>
              </div>
              <div className="w-full md:w-1/4">
                <button className="bg-red-500 w-full rounded-lg text-white font-bold py-2 px-4">
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
                      ID
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Username
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers
                    .slice(
                      (currentPage - 1) * usersPerPage,
                      currentPage * usersPerPage
                    )
                    .map((item, index) => (
                      <tr
                        key={item.id}
                        className="border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {((currentPage - 1) * usersPerPage) + index + 1}
                        </th>
                        <td className="px-4 py-3">{item.id}</td>
                        <td className="px-4 py-3">{item.username}</td>
                        <td className="px-4 py-3">{item.email}</td>
                        <td className="px-4 py-3">
                          {item.role === 1 ? "User" : "Admin"}
                        </td>
                        <td className="px-4 py-3 flex items-center justify-end">
                          <div className="relative">
                            <div
                              onClick={() => showDatabyIdUser(item.id)}
                              className="inline-flex items-center p-0.5 text-sm font-medium text-center text-blue-500 hover:text-blue-800"
                              type="button"
                            >
                              <Link to={{ pathname: `/myorder/${item.id}` }}>
                                <Airplay />
                              </Link>
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
                    ))}
                </tbody>
              </table>
            </div>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {/* Thông tin trang */}
                Page {currentPage} of{" "}
                {Math.ceil(filteredUsers.length / usersPerPage)}
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                {/* Các nút chuyển trang */}
                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
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
                {Array.from({
                  length: Math.ceil(filteredUsers.length / usersPerPage),
                }).map((_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`flex items-center justify-center text-sm py-2 px-3 leading-tight border ${
                        currentPage === index + 1
                          ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white"
                          : "text-gray-500 bg-white"
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={
                      currentPage === Math.ceil(data.length / usersPerPage)
                    }
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
  );
};

export default Account;
