import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { AccountBox, ChevronLeft } from "@mui/icons-material";

const Show = ({ id }) => {
  const { showDatabyIdUser } = useContext(UserContext);
  const [dataOrder, setDataOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Số lượng mục trên mỗi trang

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

  // Tính toán các mục hiện tại dựa trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataOrder.slice(indexOfFirstItem, indexOfLastItem);

  // Hàm xử lý khi người dùng click vào nút điều hướng trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
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
      {currentItems.length > 0 &&
        currentItems.map((item, index) => (
          <section className="py-2 relative" key={index}>
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
              <div className="main-box border mt-8 border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                  <div className="data">
                    <p className="font-semibold text-base leading-7 text-black">
                      STT:{" "}
                      <span className="text-indigo-600 font-medium">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </span>
                    </p>
                    <p className="font-semibold text-base leading-7 text-black">
                      Order Id:{" "}
                      <span className="text-indigo-600 font-medium">
                        {item.id}
                      </span>
                    </p>
                    <p className="font-semibold text-base leading-7 text-black">
                      Order_date:{" "}
                      <span className="text-indigo-600 font-medium">
                        {item.Order.order_date}
                      </span>
                    </p>
                    <p className="font-semibold text-base leading-7 text-black mt-4">
                      Order Payment:{" "}
                      <span className="text-gray-400 font-medium">
                        {item.payment}
                      </span>
                    </p>
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
                                  Size:{" "}
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
                                  Qty:{" "}
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
                            <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                              <div className="flex gap-3 lg:block">
                                <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                  Expected Delivery
                                </p>
                                <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                  3 days from time of order
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

      {dataOrder.length > 0 && (
        <div className="flex justify-center space-x-2 mt-4 p-2">
          {Array.from(
            { length: Math.ceil(dataOrder.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-full ${
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Show;
