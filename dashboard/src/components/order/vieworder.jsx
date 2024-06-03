import { PictureAsPdf } from "@mui/icons-material";
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Vieworder = (props) => {
  const data = props.data.data;
  const order = JSON.parse(data);

  const exportPDF = () => {
    const input = document.getElementById('orderDetails');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`order_${props.data.id}.pdf`);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 pb-20 text-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-black opacity-75"></div>
      </div>
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>
      <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" id="orderDetails">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-2xl p-6 leading-6 font-bold text-gray-900">
                Order Information
              </h3>
              <div className="mt-2">
                <div className="flex-col">
                  <div className="justify-between">
                    <div className=" space-x-2">
                      <span className="font-bold">Order ID:</span>
                      <span>{props.data.id}</span>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <span className="font-bold">Date:</span>
                    <span>{props.data.Order.order_date}</span>
                  </div>
                  <div className="space-x-2">
                    <span className="font-bold">Customer:</span>
                    <span>{props.data.Order.User.username}</span>
                  </div>
                  <table className="w-full mt-4 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          STT
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Color
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.Product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.productVariant.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.productVariant.Color.color}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.productVariant.Size.size}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="justify-between font-semibold space-x-5">
                    <span>Total quantity: {props.data.quantity}</span>
                    <span className=" space-x-5">
                      Total price + shipping(5$) :{" "}
                      {props.data.total.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })} 
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={props.close}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Close
          </button>
          <button
            onClick={exportPDF}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            <PictureAsPdf /> Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vieworder;
