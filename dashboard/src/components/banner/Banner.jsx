import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ControlPointRounded,
  Delete,
  Edit,
} from "@mui/icons-material";
import {
  getBanner,
  DeletBanner,
} from "../../api/banner";
import DeteteModal from "../banner/DeteteModal";
import ModalCreate from "./ModalCreate";
import toast from "react-hot-toast";

const Banner = () => {
  //set modal show dataBrand
  const [showModalCreate, setShowModalCreate] = useState(false);
  //data
  const [data, setData] = useState([]);
  //xet deu kien bien action
  const [action, setAction] = useState("CREATE");
  //set show modal delete
  const [showDelete, setShowDelete] = useState(false);

  const [edit, setEdit] = useState({});
  //set data moi

  useEffect(() => {
    fetchdata();
    // eslint-disable-next-line
  }, []);

  const cofirmModalDelete = async () => {
    let response = await DeletBanner(edit.id);
    if (response && response.data.EC === 0) {
      toast.success(response.data.mes);
      setShowDelete(false);
      fetchdata();
    } else {
      toast.error(response.data.EM);
    }
  };

  const handdleShowDelete = (data) => {
    setShowDelete(true);
    setEdit(data);
  };

  const closeDelete = () => {
    setShowDelete(false);
  };

  const fetchdata = async () => {
    let response = await getBanner();
    if (response && response.data && response.data.EC === 0) {
      setData(response.data.data);
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
    setEdit(data);
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
        <p className="text-gray-600 font-medium">Brand</p>
      </div>
      <section className="dark:bg-gray-900 p-3 sm:p-5">
        <div className="px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
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
                  Add banner
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
                      Image
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
                          {index + 1}
                        </th>
                        <td className="px-4 py-3">
                          <img
                            src={item.URL}
                            style={{
                              width: "200px",
                              height: "auto",
                              margin: "1px",
                            }}
                            alt=""
                          />
                        </td>
                        <td className="px-4 py-3 flex"></td>
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
                              onClick={() => handdleShowDelete(item)}
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
