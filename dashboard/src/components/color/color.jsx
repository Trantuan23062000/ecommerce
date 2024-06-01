import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ControlPointRounded,
  Delete,
  Edit,
  Search,
} from "@mui/icons-material";
import { getColors,SearchColor,DeletColor } from "../../api/color";
import DeteteModal from "../color/DeteteModal";
import ModalCreate from "../color/ModalCreate";
import toast from "react-hot-toast";

const Color = () => {
  //set modal show dataBrand
  const [showModalCreate, setShowModalCreate] = useState(false);
  //data
  const [data, setData] = useState([]);
  //xet deu kien bien action
  const [action, setAction] = useState("CREATE");
  //set show modal delete
  const [showDelete, setShowDelete] = useState(false);

  const [edit,setEdit] = useState({})
  //set data moi

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit] = useState(10);
  //paginate

  const [key, setKey] = useState("");

  const fetch = async () => {
    if (key !== "") {
      try {
        const res = await SearchColor(key);
        setData(res.data.DT);
      } catch (error) {
        console.log(error);
      }
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    fetchdata();
    fetch();
    // eslint-disable-next-line
  }, [currentPage, key]);

  const cofirmModalDelete = async () => {
    let response = await DeletColor(edit.id);
    if (response && response.data.EC === 0) {
      toast.success(response.data.EM);
      setShowDelete(false);
      fetchdata();
    } else {
      toast.error(response.data.EM);
    }
  };

  const handleChangPage = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handdleShowDelete = (data) => {
    setShowDelete(true);
    setEdit(data)
  };

  const closeDelete = () => {
    setShowDelete(false);
  };

  const fetchdata = async () => {
    let response = await getColors(currentPage, currentLimit);
    if (response && response.data && response.data.EC === 0) {
      setTotalPages(response.data.DT.totalPages);
      setData(response.data.DT.color);
    }
  };

  const HandleShowModalCreate = () => {
    setShowModalCreate(true);
  };

  const CloseModalCreate = () => {
    setShowModalCreate(false);  
  };

  const HandleEdit = (data) => {
    setShowModalCreate(true);
    setAction("UPDATE");
    setEdit(data)
  };

  return (
    <div className="container mx-auto">
      {showDelete ? (
        <DeteteModal
          onclose={closeDelete}
          onCofirm={cofirmModalDelete}
          edit={edit}
        />
      ) : null}
      {showModalCreate ? (
        <ModalCreate
          HandleShowModalCreate={HandleShowModalCreate}
          CloseModalCreate={CloseModalCreate}
          fetchdata={fetchdata}
          action={action}
          edit={edit}
        />
      ) : null}
       <div className="py-4 ml-4 flex items-center gap-3">
        <span className="text-sm text-gray-400">
          <ChevronRight />
        </span>
        <p className="text-gray-600 font-medium">Color</p>
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
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      type="text"
                      className="bg-gray-50 border text-sm rounded-lg block w-full pl-10 p-2"
                      placeholder="Search"
                      required=""
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  onClick={() => {
                    HandleShowModalCreate(true);
                    setAction("CREATE");
                  }}
                  type="button"
                  className="flex items-center justify-center text-white bg-black font-medium rounded-full text-sm px-4 py-2 hover:text-yellow-300"
                >
                  <ControlPointRounded />
                  Add color
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
                      Color
                    </th>
                    <th scope="col" className="px-4 py-3">
                      CodeColor
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Backgroud color
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) &&
                    data.map((item, index) => (
                      <tr className="border-b dark:border-gray-700 justify-around">
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {(currentPage - 1) * currentLimit + index + 1}
                        </th>
                        <td className="px-4 py-3">{item.color}</td>
                        <td className="px-4 py-3">{item.codeColor}</td>
                        <td className="px-4 py-3"><div className="px-2 py-2 rounded-full"style={{ backgroundColor: item.codeColor }}></div></td>
                        <td className="px-4 py-3 flex items-center">
                          <div className="relative">
                            <div
                              onClick={() => {
                                HandleEdit(item);
                              }}
                              className="inline-flex items-center p-0.5 text-sm font-medium text-center text-yellow-500 hover:text-yellow-800"
                              type="button"
                            >
                              <Edit />
                            </div>
                            <div
                             onClick={()=>handdleShowDelete(item)}
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
                Page {currentPage} of {totalPages}
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <div onClick={() => {
                  handlePreviousPage();
                }} className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
                {Array.from({ length: totalPages }, (_, i) => (
                  <li>
                    <div
                      key={i}
                      onClick={() => handleChangPage(i + 1)}
                      disabled={currentPage === i + 1}
                      className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {i + 1}
                    </div>
                  </li>
                ))}
                <li>
                  <div onClick={() => {
                  handleNextPage();
                }} className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
  );
};

export default Color;
