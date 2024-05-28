import React, { useEffect, useState } from "react";
import ShowFilter from "./showFilter";
import Filter from "./filter";
import {
  setCurrentPage,
  setSelectedProduct,
  fetchData,
  setTotalPages,
  setSearchKeyword
} from "../../redux/slices/ productSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  CgChevronRight,
  CgHeart,
  CgPushChevronLeft,
  CgPushChevronRight,
  CgSearch,
  CgShoppingCart,
} from "react-icons/cg";
import {
  addToCart,
  updateCart,
  updateCartdata,
  selectCartItems,
} from "../../redux/slices/cartSlice";
import { FaHome, FaStar, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Drawer = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const originalData = useSelector((state) => state.products.data) || [];
  const totalPages = useSelector((state) => state.products.totalPages);
  const currentPage = useSelector((state) => state.products.currentPage);
  const currentLimit = useSelector((state) => state.products.currentLimit);
  const cartItems = useSelector(selectCartItems);
  const searchKeyword = useSelector((state) => state.products.searchKeyword);
  const [initialized, setInitialized] = useState(false);

  const handleAddToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const existingItem = { ...cartItems[existingItemIndex] };
      const totalQuantity = existingItem.productVariant.quantity + 1;
      if (totalQuantity > item.productVariant.quantity) {
        toast.error(
          `The quantity has exceeded the limit product ${item.Product.name}: ${item.productVariant.quantity}`
        );
        return;
      }
      const updatedProductVariant = { ...existingItem.productVariant };
      updatedProductVariant.quantity += 1;
      const updatedItem = {
        ...existingItem,
        productVariant: updatedProductVariant,
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = updatedItem;
      dispatch(updateCart(updatedCartItems));
      toast.success(`Product ${item.Product.name} added to cart`);
    } else {
      const newItem = {
        ...item,
        productVariant: { ...item.productVariant, quantity: 1 },
      };
      dispatch(addToCart(newItem));
      toast.success(`Product ${item.Product.name} added to cart`);
    }
  };

  useEffect(() => {
    dispatch(setTotalPages(totalPages));
    dispatch(setCurrentPage(currentPage));
  }, [totalPages, currentPage, dispatch]);

  useEffect(() => {
    if (!initialized) {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        dispatch(updateCartdata(JSON.parse(storedCartItems)));
      }
      setInitialized(true);
    }
  }, [initialized, dispatch]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleProductSelect = (item) => {
    dispatch(setSelectedProduct(item));
    localStorage.setItem("selectedProductDrawer", JSON.stringify(item));
  };

  const handleChangePage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (originalData.length === 0) {
      dispatch(fetchData({ currentPage, currentLimit }));
    }
  }, [currentPage, currentLimit, originalData.length, dispatch]);
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  useEffect(() => {
    if (originalData.length > 6) {
      const totalPageCount = Math.ceil(originalData.length / 6);
      dispatch(setTotalPages(totalPageCount));
    } else {
      dispatch(setTotalPages(1));
    }
  }, [originalData.length, dispatch]);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    return originalData.slice(startIndex, endIndex);
  };

  const handleClear = () => {
    dispatch(setSearchKeyword(null)); // Xoá search keyword khi nhấn nút "Clear"
    dispatch(fetchData({ currentPage, currentLimit }));
  };

  const paginatedData = getPaginatedData();

  return (
    <div>
      <div className="py-4 flex items-center gap-3">
        <div className="text-black text-base">
          <Link to="/">
            <FaHome />
          </Link>
        </div>
        <span className="text-sm text-gray-400">
          <CgChevronRight />
        </span>
        <p className="text-gray-600 font-medium">Shop</p>
      </div>
      {showModal && <ShowFilter close={handleClose} />}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <Filter />
        <div className="col-span-2 grid sm:col-span-3">
          <div className="flex items-center mb-4">
            <select
              name="sort"
              id="sort"
              className="w-42 text-sm rounded-xl text-black py-3 px-4 border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="">Default sorting</option>
              <option value="price-low-to-high">Price low to high</option>
              <option value="price-high-to-low">Price high to low</option>
              <option value="latest">Latest product</option>
            </select>

            {searchKeyword ? (
               <div className="w-32 rounded-xl bg-white ml-4 text-sm text-black py-3 px-4 border-gray-300 shadow-sm focus:ring-primary focus:border-primary flex items-center">
               <span className="flex-grow ">
                 {searchKeyword}
               </span>
               <button
                 onClick={handleClear}
                 className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
               >
                 <FaWindowClose size={24}/>
               </button>
             </div>
            ) : null}

            <div className="flex gap-2 ml-auto">
              <button
                className="w-16 rounded-xl bg-white ml-4 text-sm text-black py-3 px-4 border-gray-300 shadow-sm focus:ring-primary focus:border-primary items-center block md:hidden"
                type="button"
                onClick={handleModalToggle}
              >
                Filter
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            {paginatedData.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow rounded-lg overflow-hidden group"
              >
                <div className="relative">
                  {item.Product &&
                  item.Product.Image &&
                  item.Product.Image.URL ? (
                    <Link to={{ pathname: `/product/${item.id}` }}>
                      <img
                        src={JSON.parse(item.Product.Image.URL)[0]}
                        alt="product 1"
                        className="w-full h-64 object-cover"
                      />
                    </Link>
                  ) : null}

                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <div
                      onClick={() => handleAddToCart(item)}
                      className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0"
                    >
                      <CgShoppingCart />
                    </div>
                    <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                      <CgHeart />
                    </div>
                    <div
                      onClick={() => handleProductSelect(item)}
                      className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0"
                    >
                      <Link to={{ pathname: `/product/${item.id}` }}>
                        <CgSearch />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="pt-4 pb-3 px-4">
                  <div className="flex space-x-2">
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                      {item.Product?.name}
                    </h4>
                    {item.productVariant?.Color?.codeColor && (
                      <label
                        htmlFor={`color-${item.id}`}
                        className="border border-gray-200 rounded-lg h-6 w-6 cursor-pointer shadow-sm block"
                        style={{
                          backgroundColor: `${item.productVariant.Color.codeColor}`,
                        }}
                      ></label>
                    )}
                  </div>
                  <div className="flex items-baseline mb-1 space-x-2">
                    {item.Product.sale ? (
                      <>
                        <p className="text-xl text-gray-500  font-semibold">
                          {(
                            item.Product.price -
                            (item.Product.price * item.Product.sale) / 100
                          ).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          {item.Product.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                        <p className="text-sm bg-red-500 text-white rounded p-1">
                          {item.Product.sale}%
                        </p>
                        <p className="text-sm font-bold text-red-500">
                          Quantity: {item.productVariant.quantity}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-xl text-gray-500 font-semibold">
                          {item.Product.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                        <p className="text-sm font-bold text-red-500">
                          Quantity: {item.productVariant.quantity}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                  </div>
                </div>
                <div
                  onClick={() => handleAddToCart(item)}
                  className="block w-full py-1 rounded-b-lg text-center text-yellow-300 hover:text-red-500 font-bold bg-black border transition"
                >
                  Add to cart
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex container mx-auto justify-center items-center sm:justify-between mt-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePreviousPage}
                  className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-full select-none ${
                    currentPage === 1
                      ? "text-gray-400"
                      : "text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                  }`}
                  type="button"
                  disabled={currentPage === 1}
                >
                  <CgPushChevronLeft />
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handleChangePage(i + 1)}
                      disabled={currentPage === i + 1}
                      className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase shadow-md shadow-gray-900/10 transition-all ${
                        currentPage === i + 1
                          ? "bg-gray-900 text-white"
                          : "bg-gray-300 text-gray-900 hover:shadow-lg hover:shadow-slate-400 focus:opacity-[0.85] active:opacity-[0.85]"
                      }`}
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        {i + 1}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleNextPage}
                  className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-full select-none ${
                    currentPage === totalPages
                      ? "text-gray-400"
                      : "text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                  }`}
                  type="button"
                  disabled={currentPage === totalPages}
                >
                  Next
                  <CgPushChevronRight />
                </button>
              </div>
              <span>
                page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
