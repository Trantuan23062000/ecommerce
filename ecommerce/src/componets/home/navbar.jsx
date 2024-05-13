import React, { useEffect, useReducer, useState } from "react";
import { FaBars, FaShoppingCart, FaSearch, FaTrash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchShop from "../search/searchShop";
import { selectUser } from "../../redux/auth/reducers/authReducer";
import {
  updateCartdata,
  selectCartItems,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const initialState = {
  isOpen: false,
  isMobile: false,
  isSearchOpen: false,
  activeDropdown: null, // State để lưu trữ dropdown đang mở
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_OPEN":
      return {
        ...state,
        isOpen: !state.isOpen,
        activeDropdown: state.activeDropdown === "main" ? null : "main", // Toggle dropdown và kiểm tra xem dropdown này đã được mở chưa
      };
    case "TOGGLE_CART_DROPDOWN":
      return {
        ...state,
        activeDropdown: state.activeDropdown === "cart" ? null : "cart", // Toggle dropdown giỏ hàng và kiểm tra xem dropdown này đã được mở chưa
      };
    case "TOGGLE_MOBILE_DROPDOWN":
      return {
        ...state,
        activeDropdown: state.activeDropdown === "mobile" ? null : "mobile", // Toggle dropdown mobile và kiểm tra xem dropdown này đã được mở chưa
      };
    case "CHECK_MOBILE":
      return { ...state, isMobile: window.innerWidth <= 430 };
    case "HIDE_DROPDOWN":
      return { ...state, activeDropdown: null }; // Ẩn dropdown khi không cần thiết
    default:
      return state;
  }
};

const Navbar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchdelete = useDispatch();
  const [initialized, setInitialized] = useState(false);
  const location = useLocation();
  const cartItems = useSelector(selectCartItems);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [showSearchModal, setShowSearchModal] = useState(false); // State để điều khiển hiển thị modal search
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const isOdersuccessPage = location.pathname === "/oder-success";
  const isOrder = user && location.pathname === `/myorder/${user.id}`;

  const handleRemoveFromCart = (item) => {
    dispatchdelete(removeFromCart({ id: item.id }));
    toast.success(`Product removed from cart`);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    const newTotalQuantity = cartItems.reduce(
      (total, item) => total + item.productVariant.quantity,
      0
    );
    setTotalQuantity(newTotalQuantity);
  }, [cartItems]); // Lưu trữ dữ liệu vào Local Storage mỗi khi cartItems thay đổi và tính toán lại totalQuantity

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      dispatch(updateCartdata(JSON.parse(storedCartItems)));
    }
  }, [dispatch, cartItems]);

  const toggleCartDropdown = () => {
    dispatch({ type: "TOGGLE_CART_DROPDOWN" }); // Toggle dropdown giỏ hàng
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems && !initialized) {
      dispatch(updateCartdata(JSON.parse(storedCartItems)));
      setInitialized(true);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const checkWindowSize = () => {
      dispatch({ type: "CHECK_MOBILE" });
    };

    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, [location]);

  const { isOpen, isMobile, activeDropdown } = state;

  // Hàm xử lý sự kiện để mở dropdown
  const handleDropdownOpen = () => {
    dispatch({ type: "TOGGLE_OPEN" }); // Toggle dropdown chính
  };

  // Hàm để hiển thị modal search
  const showModal = () => {
    setShowSearchModal(true);
  };

  // Hàm để ẩn modal search
  const hideModal = () => {
    setShowSearchModal(false);
  };

  // Hàm xử lý khi nhấn vào nút "Go to Cart"
  const handleGoToCart = () => {
    dispatch({ type: "HIDE_DROPDOWN" }); // Ẩn dropdown khi nhấn vào nút "Go to Cart"
    // Thêm logic để điều hướng đến trang giỏ hàng ở đây nếu cần
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  // Hàm xử lý khi nhấn vào các thành phần trong dropdown
  const handleDropdownItemClick = () => {
    dispatch({ type: "HIDE_DROPDOWN" }); // Ẩn dropdown
  };

  return (
    <div>
      <nav className="bg-black mx-auto p-3 px-4 py-8 sticky top-0 z-50">
        <div className="">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <div className="text-white hover:text-yellow-300 text-lg font-semibold">
                <Link to="/">
                  {" "}
                  <img
                    src="/images/logo.png"
                    alt="logo"
                    className="w-20 h-10 rounded-lg"
                  />
                </Link>
              </div>
            </div>
            {!isMobile && (
              <div className="hidden md:flex justify-center w-full">
                <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-lg font-semibold">
                  <Link to="/shop"> SHOP</Link>
                </div>
                <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-lg font-semibold">
                  ABOUT
                </div>
                <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-lg font-semibold">
                  <Link to="/contact">CONTACT</Link>
                </div>
                <div className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-lg font-semibold">
                  {user && (
                    <Link to={{ pathname: `/myorder/${user.id}` }}>
                      MY ORDER
                    </Link>
                  )}
                </div>
              </div>
            )}
            <div
              className={`flex items-center ${
                isMobile ? "md:hidden" : "hidden"
              }`}
            >
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={showModal}
                    type="button"
                    className="text-white hover:text-yellow-300 focus:outline-none"
                  >
                    <FaSearch size={24} />
                  </button>
                </div>
              </div>
              <div className="text-white ml-4 relative">
                <Link to="/cart">
                  <FaShoppingCart size={24} onClick={toggleCartDropdown} />
                  {totalQuantity > 0 && (
                    <span className="bg-yellow-300 text-red-500 rounded-full h-5 w-5 flex items-center justify-center absolute -top-3 -right-2 font-bold">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
              </div>
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={handleDropdownOpen} // Gọi hàm xử lý khi click
                    type="button"
                    className="text-white hover:text-white focus:outline-none"
                  >
                    <FaBars size={24} />
                  </button>
                </div>
                {/* Chỉ hiển thị dropdown khi isOpen === true và activeDropdown === "main" */}
                {isOpen && activeDropdown === "main" && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div
                        className="flex mr-2 px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
                        onClick={handleDropdownItemClick} // Ẩn dropdown khi click
                      >
                        <Link to="/">HOME</Link>
                      </div>
                      <div
                        className="flex mr-2 px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
                        onClick={handleDropdownItemClick} // Ẩn dropdown khi click
                      >
                        <Link to="/about">ABOUT</Link>
                      </div>
                      <div
                        className="flex mr-2 px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
                        onClick={handleDropdownItemClick} // Ẩn dropdown khi click
                      >
                        <Link to="/contact">CONTACT</Link>
                      </div>
                      <div
                        className="flex mr-2 px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition"
                        onClick={handleDropdownItemClick} // Ẩn dropdown khi click
                      >
                        <Link to="/myoder">My order</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`flex items-center ${isMobile ? "hidden" : "md:flex"}`}
            >
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={showModal}
                    type="button"
                    className="text-white hover:text-yellow-300 focus:outline-none"
                  >
                    <FaSearch size={24} />
                  </button>
                </div>
              </div>
              <div className="text-white ml-4 relative">
                <FaShoppingCart size={24} onClick={toggleCartDropdown} />
                {totalQuantity > 0 && (
                  <span className="bg-yellow-300 text-red-500 rounded-full h-5 w-5 flex items-center justify-center absolute -top-3 -right-2 font-bold">
                    {totalQuantity}
                  </span>
                )}
                {activeDropdown === "cart" && cartItems.length > 0 && (
                  <div className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-gray-200 ring-1 ring-black ring-opacity-5">
                    <div className="py-4 ml-3 font-semibold justify-around mx-auto">
                      {cartItems.map((item) => (
                        <div key={item.id}>
                          <div className="flex justify-around">
                            <div className="text-black">
                              {item.Product.name} X{" "}
                              {item.productVariant.quantity}{" "}
                            </div>
                            <img
                              src={JSON.parse(item.Product.Image.URL)[0]}
                              alt="product 1"
                              className="w-8 h-8"
                            />
                            <div
                              onClick={() => handleRemoveFromCart(item)}
                              className="text-red-500 hover:text-red-900"
                            >
                              <FaTrash />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-around w-full space-x-4 mx-auto">
                      <div className="bg-black justify-center text-white px-8 py-2 font-medium rounded-lg uppercase flex items-center gap-2 hover:bg-yellow-500 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-120">
                        <Link
                          className="justify-center text-center"
                          to="/cart"
                          onClick={handleGoToCart}
                        >
                          Go to Cart
                        </Link>
                      </div>

                      <div className="bg-black justify-center text-white px-8 py-2 font-medium rounded-lg uppercase flex items-center gap-2 hover:bg-yellow-500 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-120">
                        {user ? (
                          <Link
                            className="justify-center text-center"
                            to="/checkout"
                          >
                            Checkout
                          </Link>
                        ) : (
                          <Link
                            className="justify-center text-center"
                            to="/login"
                          >
                            Login to checkout
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeDropdown === "cart" && cartItems.length === 0 && (
                  <div className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-gray-200 ring-1 ring-black ring-opacity-5">
                    <div className="py-4 ml-3 flex text-black text-center font-semibold justify-center mx-auto">
                      No items in the cart
                    </div>
                  </div>
                )}
              </div>
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={() => dispatch({ type: "TOGGLE_MOBILE_DROPDOWN" })}
                    type="button"
                    className="text-white hover:text-yellow-300 focus:outline-none"
                  >
                    <FaBars size={24} />
                  </button>
                </div>
                {activeDropdown === "mobile" && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {user ? (
                        <>
                          <div
                            onClick={handleLogout}
                            className="flex px-4 py-2 text-sm text-black hover:text-yellow-500 transition"
                          >
                            Logout
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="flex px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition"
                            onClick={handleDropdownItemClick} // Ẩn dropdown khi click
                          >
                            <Link to="/login">Login</Link>
                          </div>
                          <div
                            className="flex px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition"
                            onClick={handleDropdownItemClick} // Ẩn dropdown khi click
                          >
                            <Link to="/register">Register</Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {showSearchModal && (
        <SearchShop close={hideModal} className="transition-opacity" />
      )}
      {user !== "" && user && !isOdersuccessPage && !isOrder && (
        <p className="text-black text-center m-3">Welcome, {user.username}!</p>
      )}
    </div>
  );
};

export default Navbar;
