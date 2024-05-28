import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderById } from "../../redux/oder/getorderByid";
import { selectUser } from "../../redux/auth/reducers/authReducer";
import { selectData } from "../../redux/oder/getorderByid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cancelOrder } from "../../api/order/order";
import toast from "react-hot-toast"

const Myorder = () => {
  const user = useSelector(selectUser);
  const orderData = useSelector(selectData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchOrderById(user.id)); // Gọi action để lấy danh sách đơn hàng khi user thay đổi
    }
  }, [dispatch, user]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Số lượng đơn hàng hiển thị trên mỗi trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orderData.slice(indexOfFirstItem, indexOfLastItem);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const totalPages = Math.ceil(orderData.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 mx-1 bg-black text-white rounded-lg ${
            currentPage === i ? "bg-indigo-600 text-white" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const HandleCancel = async (orderId) =>{
    const response = await cancelOrder({orderId})
    if(response && response.data && response.data.EC === 0){
       toast.success(response.data.result.message)
       dispatch(fetchOrderById(user.id))
    }else{
      toast.error(response.data.message)
    }
  }

  return (
    <div>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
            Hi {user.username}
          </h2>
          <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
            Thanks for making a purchase you can check our order summary from
            below
          </p>
          {currentOrders.length > 0 &&
            currentOrders.map((item, index) => (
              <div
                key={index}
                className="main-box border mt-8 border-gray-500 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                  <div className="data">
                    <p className="font-semibold text-base leading-7 text-black">
                      STT:{" "}
                      <span className="text-indigo-600 font-medium">
                        {startIndex + index}
                      </span>
                    </p>
                    <p className="font-semibold text-base leading-7 text-black">
                      Order Id:{" "}
                      <span className="text-indigo-600 font-medium">
                        {item.Order.id}
                      </span>
                    </p>
                    <p className="font-semibold text-base leading-7 text-black">
                      Order_date:{" "}
                      <span className="text-indigo-600 font-medium">
                        {item.Order.order_date}
                      </span>
                    </p>
                    <p className="font-semibold text-base leading-7 text-black mt-4">
                      Order Payment :{" "}
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
                                  Color:{" "}
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
                  <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                    <button onClick={()=>HandleCancel(item.Order.id)} className="flex outline-0 py-3 p-4 sm:p-4 whitespace-nowrap gap-2 items-center text-center justify-center font-semibold group text-lg text-white bg-black hover:text-yellow-300 rounded-3xl transition-all duration-500">
                      Cancel Order
                    </button>
                  </div>
                  <p className="font-semibold text-lg text-black py-6">
                    Total:
                    <span className="text-indigo-600 space-x-2">
                      {item.total}$
                    </span>
                  </p>
                </div>
              </div>
            ))}
          {orderData.length === 0 && (
            <div className="flex items-center justify-center h-40">
              <p className="text-center text-white bg-black rounded-full hover:text-yellow-300 p-3">
                <Link to="/shop">No order back to shop</Link>
              </p>
            </div>
          )}
          <div className="flex justify-center my-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mr-2 bg-black text-white rounded-lg"
            >
              Prev
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= orderData.length}
              className="px-4 py-2 mr-2 bg-black text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Myorder;
