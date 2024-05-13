import React from "react";
import {FaAmazonPay, FaHome, FaPaypal, FaTimes} from "react-icons/fa"

const SelecttedPayment = (props) => {
  return (
    <div>
      <div className="overflow-x-hidden justify-center p-24 text-center overflow-y-auto fixed inset-0 z-50 items-center">
        <div className="relative w-auto mx-auto max-w-xl">
          <div className="relative p-2 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-center justify-center text-gray-900 dark:text-white">
                Select payment order
              </h3>
              <button
                onClick={props.close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              <div className="max-w-sm mx-auto">
              <button
                type="button"
                onClick={props.click}
                className="text-white flex bg-green-700 hover:text-white hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-24 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Payment on delivery <FaHome size={24}/>
              </button>
              <button
                type="button"

                className="text-white flex bg-blue-600 hover:text-white hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-24 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Payment CreditCard <FaAmazonPay size={24}/>
              </button>
              <button
                type="button"
                onClick={props.paypal}
                className="text-white flex bg-yellow-500 hover:text-white hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-24 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Payment on Paypay <FaPaypal size={24}/>
              </button>
              </div>
            </div>
            <div className="flex justify-center flex-row-reverse p-2 ">
              <button
                onClick={props.close}
                type="button"
                className=" hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                <FaTimes size={24}/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default SelecttedPayment;
