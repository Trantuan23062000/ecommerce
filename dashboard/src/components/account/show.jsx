import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import {
  AccountBox,
  ChevronLeft,
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@mui/icons-material";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const Show = ({ id }) => {
  const { showDatabyIdUser } = useContext(UserContext);
  const [dataOrder, setDataOrder] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(2); // Initial limit
  const [showAll, setShowAll] = useState(false);

  // Hàm kiểm tra và gán dataOrder từ local storage theo id tương ứng
  const checkAndSetDataOrderFromLocalStorage = () => {
    const storedData = localStorage.getItem("dataOrder");
    if (storedData) {
      setDataOrder(JSON.parse(storedData));
    }
  };

  useEffect(() => {
    // Kiểm tra và gán dataOrder từ local storage khi component được tạo
    checkAndSetDataOrderFromLocalStorage();

    // Nếu có id, thực hiện gọi API để lấy dataOrder
    if (id) {
      showDatabyIdUser(id);
    }
    // eslint-disable-next-line
  }, [id, showDatabyIdUser]);

  const handleClearLocalStorage = () => {
    localStorage.removeItem("dataOrder");
    setDataOrder([]); // Clear dataOrder trong state của component
  };

  const handleShowMore = () => {
    setDisplayLimit((prevLimit) => prevLimit + 2);
    if (displayLimit + 2 >= dataOrder.length) {
      setShowAll(true);
    }
  };

  const handleShowLess = () => {
    setDisplayLimit(2);
    setShowAll(false);
  };

  const exportOrderToPDF = (order) => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(20);
    doc.text("Order Summary", 105, 10, null, null, "center");

    // Order Information
    doc.setFontSize(12);
    doc.text(`Order Id: ${order.id}`, 10, 30);
    doc.text(`Order Date: ${order.Order.order_date}`, 10, 40);
    doc.text(`Payment: ${order.payment}`, 10, 50);
    doc.text(`Total: ${order.total} $`, 10, 60);

    let yOffset = 80;

    JSON.parse(order.data).forEach((product, index) => {
      // Draw a larger border for each product section
      doc.rect(10, yOffset - 10, 190, 80);

      doc.setFontSize(14);
      doc.text(`Product ${index + 1}`, 105, yOffset, null, null, "center");

      doc.setFontSize(12);
      doc.text(`Name: ${product.Product.name}`, 15, yOffset + 10);
      doc.text(`Size: ${product.productVariant.Size.size}`, 15, yOffset + 20);
      doc.text(
        `Color: ${product.productVariant.Color.codeColor}`,
        15,
        yOffset + 30
      );
      doc.text(
        `Price: ${(
          product.Product.price -
          (product.Product.price * product.Product.sale) / 100
        ).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}`,
        15,
        yOffset + 40
      );
      doc.text(
        `Quantity: ${product.productVariant.quantity}`,
        15,
        yOffset + 50
      );

      yOffset += 90; // Adjusted for the larger rectangles
    });

    doc.save(`Order_${order.id}.pdf`);
  };

  const exportAllOrdersToPDF = () => {
    const doc = new jsPDF();

    dataOrder.forEach((order, orderIndex) => {
      // Add a title for each order
      doc.setFontSize(20);
      doc.text(`Order Id: ${order.id}`, 105, 10, null, null, "center");

      // Order Information
      doc.setFontSize(12);
      doc.text(`Order Date: ${order.Order.order_date}`, 10, 30);
      doc.text(`Payment: ${order.payment}`, 10, 40);
      doc.text(`Total: ${order.total} $`, 10, 50);

      let yOffset = 80;

      JSON.parse(order.data).forEach((product, index) => {
        // Draw a larger border for each product section
        doc.rect(10, yOffset - 10, 190, 80);

        doc.setFontSize(14);
        doc.text(`Product ${index + 1}`, 105, yOffset, null, null, "center");

        doc.setFontSize(12);
        doc.text(`Name: ${product.Product.name}`, 15, yOffset + 10);
        doc.text(`Size: ${product.productVariant.Size.size}`, 15, yOffset + 20);
        doc.text(
          `Color: ${product.productVariant.Color.codeColor}`,
          15,
          yOffset + 30
        );
        doc.text(
          `Price: ${(
            product.Product.price -
            (product.Product.price * product.Product.sale) / 100
          ).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}`,
          15,
          yOffset + 40
        );
        doc.text(
          `Quantity: ${product.productVariant.quantity}`,
          15,
          yOffset + 50
        );

        yOffset += 90; // Adjusted for the larger rectangles
      });

      if (orderIndex < dataOrder.length - 1) {
        doc.addPage();
      }
    });

    doc.save("All_Orders.pdf");
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    dataOrder.forEach((order) => {
      const sheetName = `Order_${order.id}`.substring(0, 31); // Ensure sheet name is within 31 characters

      const wsData = [
        ["Order Id", order.id],
        ["Order Date", order.Order.order_date],
        ["Payment", order.payment],
        ["Total", order.total],
        [],
        ["Product Name", "Size", "Color", "Price", "Quantity"],
      ];

      JSON.parse(order.data).forEach((product) => {
        wsData.push([
          product.Product.name,
          product.productVariant.Size.size,
          product.productVariant.Color.codeColor,
          (
            product.Product.price -
            (product.Product.price * product.Product.sale) / 100
          ).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }),
          product.productVariant.quantity,
        ]);
      });

      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    XLSX.writeFile(wb, "Orders.xlsx");
  };

  const exportAllOrdersToExcel = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      [
        "Order Id",
        "Order Date",
        "Payment",
        "Total",
        "Product Name",
        "Size",
        "Color",
        "Price",
        "Quantity",
      ],
    ];
  
    // Lặp qua mỗi đơn hàng và thêm dữ liệu vào sheet chung
    dataOrder.forEach((order) => {
      JSON.parse(order.data).forEach((product) => {
        wsData.push([
          order.id,
          order.Order.order_date,
          order.payment,
          order.total,
          product.Product.name,
          product.productVariant.Size.size,
          product.productVariant.Color.codeColor,
          (
            product.Product.price -
            (product.Product.price * product.Product.sale) / 100
          ).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }),
          product.productVariant.quantity,
        ]);
      });
    });
  
    // Tạo sheet từ dữ liệu đã thu thập
    const ws = XLSX.utils.aoa_to_sheet(wsData);
  
    // Thêm sheet vào workbook
    XLSX.utils.book_append_sheet(wb, ws, "All Orders");
  
    // Xuất workbook ra file Excel
    XLSX.writeFile(wb, "All_Orders.xlsx");
  };
  
  
  

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 justify-between">
        <div className="py-4 ml-4 flex items-center gap-3">
          <div className="text-black text-base">
            <Link to="/account">
              <AccountBox
                style={{ fontSize: 36 }}
                onClick={handleClearLocalStorage}
              />
            </Link>
          </div>
          <span className="text-sm text-gray-400">
            <ChevronLeft />
          </span>
          <p className="text-gray-600 font-medium">Myorder</p>
        </div>

        <div className="flex justify-center mt-6 ml-6 md:ml-80">
          <button
            className="bg-yellow-500 text-black hover:bg-amber-700 hover:text-white px-4 py-2 rounded mr-4"
            onClick={exportAllOrdersToPDF}
          >
            Export All to PDF
          </button>
          <button
            className="bg-blue-500 text-white hover:bg-amber-700 px-4 py-2 rounded"
            onClick={exportAllOrdersToExcel}
          >
            Export All to Excel
          </button>
        </div>
      </div>

      {dataOrder.slice(0, displayLimit).map((item, index) => (
        <section className="py-2 relative" key={index}>
          <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
            <div className="main-box border mt-8 border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
              <div className="flex flex-col lg:flex-row items-center justify-between px-6">
                <div>
                  <p className="font-semibold text-base leading-7 text-black mb-4">
                    Order:
                    <span className="text-indigo-600 font-medium">
                      {index + 1}
                    </span>
                  </p>
                  <p className="font-semibold text-base leading-7 text-black">
                    Order Id:
                    <span className="text-indigo-600 font-medium">
                      {item.id}
                    </span>
                  </p>
                  <p className="font-semibold text-base leading-7 text-black">
                    Order Date:
                    <span className="text-indigo-600 font-medium">
                      {item.Order.order_date}
                    </span>
                  </p>
                  <p className="font-semibold text-base leading-7 text-black mt-4">
                    Order Payment:
                    <span className="text-gray-400 font-medium">
                      {item.payment}
                    </span>
                  </p>
                </div>
                <div className="flex gird grid-cols-2 space-x-2 justify-center mb-8 mt-4">
                  <div>
                    <button
                      className="bg-black text-white hover:bg-yellow-500 hover:text-black px-4 py-2 rounded"
                      onClick={() => exportOrderToPDF(item)}
                    >
                      Export to PDF
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-green-500 text-black hover:bg-green-700 hover:text-white px-4 py-2 rounded"
                      onClick={exportToExcel}
                    >
                      Export to Excel
                    </button>
                  </div>
                </div>
              </div>

              {JSON.parse(item.data).map((product, productIndex) => (
                <div
                  key={productIndex}
                  className="w-full px-3 min-[400px]:px-6"
                >
                  <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                    <div className="img-box max-lg:w-full">
                      <img
                        src={JSON.parse(product.Product.Image.URL)[0]}
                        alt="product 1"
                        className="aspect-square w-full lg:max-w-[140px]"
                      />
                    </div>
                    <div className="flex flex-row items-center w-full ">
                      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                        <div className="flex items-center">
                          <div>
                            <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                              {product.Product.name}
                            </h2>
                            <div className="flex items-center ">
                              <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                Size:
                                <span className="text-gray-500">
                                  {product.productVariant.Size.size}
                                </span>
                              </p>
                              <p className="font-medium flex text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                <label
                                  htmlFor={`color-${product.id}`}
                                  className="border border-gray-200 rounded-lg h-6 w-6 cursor-pointer block"
                                  style={{
                                    backgroundColor: `${product.productVariant.Color.codeColor}`,
                                  }}
                                ></label>
                              </p>
                              <p className="font-medium text-base leading-7 text-black ">
                                Qty:
                                <span className="text-gray-500">
                                  {product.productVariant.quantity}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-5">
                          <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm leading-7 text-black">
                                Price
                              </p>
                              <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                {(
                                  product.Product.price -
                                  (product.Product.price *
                                    product.Product.sale) /
                                    100
                                ).toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm leading-7 text-black">
                                Status
                              </p>
                              <p
                                className={`font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3`}
                              >
                                {product.Product.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="w-full border-t grid sm:grid-cols-2 grid-cols-2 border-gray-200 px-6 items-center justify-between ">
                <p className="font-semibold text-lg text-black py-6">
                  Total:
                  <span className="text-indigo-600 space-x-2">
                    {item.total} $
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {dataOrder.length === 0 && (
        <div className="flex items-center justify-center h-40">
          <p className="text-center text-white bg-black rounded-full hover:text-yellow-300 p-3">
            <Link to="/account">Go to back</Link>
          </p>
        </div>
      )}

      {dataOrder.length > displayLimit && (
        <div className="flex justify-center mt-6">
          <button
            className="text-black px-4 py-2 bg-slate-300 rounded"
            onClick={handleShowMore}
          >
            <ExpandMoreOutlined style={{ fontSize: 24 }} />
          </button>
        </div>
      )}

      {showAll && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleShowLess}
          >
            <ExpandLessOutlined style={{ fontSize: 24 }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Show;
