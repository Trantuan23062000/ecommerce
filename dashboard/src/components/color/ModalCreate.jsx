import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CreateColor, UpdateColor } from "../../api/color";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const ModalCreate = (props) => {
  const { action, edit } = props;

  const navigate = useNavigate();

  const defaultColordata = {
    color: "",
    codeColor: "",
  };
  const [colorData, setColordata] = useState(defaultColordata);

  useEffect(() => {
    if (props.action === "UPDATE") {
      setColordata({ ...edit });
    }
    // eslint-disable-next-line
  }, [props.edit]);

  const handleChange = (value, name) => {
    let _colorData = _.cloneDeep(colorData);
    _colorData[name] = value;
    setColordata(_colorData);
  };

  const error = {
    color: true,
    codeColor: true,
  };
  const [inError, setInError] = useState(error);

  const checkError = () => {
    setInError(inError);
    let arr = ["color", "codeColor"];

    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!colorData[arr[i]]) {
        let _inError = _.cloneDeep(error);
        _inError[arr[i]] = false;
        setInError(_inError);
        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleSubmit = async () => {
    let check = checkError();
    if (check === true) {
      let response =
        action === "CREATE"
          ? await CreateColor({
              ...colorData,
            })
          : await UpdateColor({ ...colorData });

      if (response.data && response.data.EC === 0) {
        setColordata({ ...defaultColordata });
        toast.success(response.data.mes);
        props.CloseModalCreate();
        props.fetchdata();
        navigate("/color");
      }

      if (response.data && response.data.EC !== 0) {
        toast.error(response.data.EM);
        let _inError = _.cloneDeep(error);
        _inError[response.data.DT] = false;
        setInError(_inError);
        props.HandleShowModalCreate();
      }
    }
  };

  return (
    <div>
      <div className="overflow-x-hidden p-60 justify-center overflow-y-auto fixed inset-0 z-50 items-center">
        <div className="relative w-auto mx-auto max-w-3xl">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {props.action === "CREATE" ? "Create new Color" : "Edit Color "}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  props.CloseModalCreate();
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Color
                  </label>
                  <input
                    value={colorData.color}
                    onChange={(event) =>
                      handleChange(event.target.value, "color")
                    }
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Color..."
                  />
                </div>
                <div
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  style={{ backgroundColor: colorData.codeColor }}
                ></div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Code
                  </label>
                  <textarea
                    value={colorData.codeColor}
                    onChange={(event) =>
                      handleChange(event.target.value, "codeColor")
                    }
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write Brand description here"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse p-5">
              <button
                onClick={() => {
                  props.CloseModalCreate();
                }}
                type="button"
                className="text-red-600 hover:text-white border border-red-800 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-4 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSubmit();
                }}
                type="submit"
                className="text-blue-600 hover:text-white border border-blue-800 hover:bg-blue-600   focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-4 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                {props.action === "CREATE" ? "Submit" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default ModalCreate;
