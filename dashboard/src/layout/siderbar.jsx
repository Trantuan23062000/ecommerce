import React, { useState } from "react";
import {
  AccountBox,
  ArrowDropUpRounded,
  ArrowRightRounded,
  Backspace,
  ChevronRight,
  Home,
  Inventory,
  Logout,
  ShoppingCart,
  WalletRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const [expandedItem, setExpandedItem] = useState("Dashboard");
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (itemName) => {
    setExpandedItem(itemName === expandedItem ? "" : itemName);
    setActiveItem(itemName); // Cập nhật activeItem khi một mục được click
  };

  return (
    <div>
      <div
        className={`bg-gray-300 text-black fixed top-0 left-0 h-full lg:relative lg:translate-x-0 transition-transform transform z-50 ${
          isSidebarOpen ? "" : "hidden"
        } "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        <div className="p-4">
          <div
            className={`cursor-pointer flex items-center mb-4 px-4 py-2 rounded-lg ${
              expandedItem === "Dashboard"
                ? "bg-orange-400"
                : activeItem === "Dashboard" // Sử dụng activeItem để xác định lớp CSS cho mục active
                ? "bg-orange-400"
                : "hover:bg-orange-400"
            }`}
            onClick={() => handleItemClick("Dashboard")}
          >
            <Home className="mr-2" style={{ fontSize: 36 }} />
            <Link to="/" className="flex-grow font-semibold">
              Dashboard
            </Link>
          </div>
          <div className="text-lg mb-2 font-semibold uppercase tracking-wide text-black">
            Menu
          </div>
          <div
            className={`cursor-pointer flex items-center mb-4 px-4 py-2 rounded-lg ${
              expandedItem === "Product"
                ? "bg-orange-400"
                : "hover:bg-orange-400"
            }`}
            onClick={() => handleItemClick("Product")}
          >
            <Inventory style={{ fontSize: 36 }} className="mr-2" />
            <span className="flex-grow font-semibold">Product</span>
            {expandedItem === "Product" ? (
              <ArrowDropUpRounded style={{ fontSize: 48 }} />
            ) : (
              <ArrowRightRounded style={{ fontSize: 48 }} />
            )}
          </div>
          {expandedItem === "Product" && (
            <ul className="pl-2 space-y-2">
              <li>
                <Link to="/Product-image" className="block text-lg">
                  <ChevronRight /> Product image
                </Link>
              </li>
              <li>
                <Link to="/product-variant" className="block text-lg">
                  <ChevronRight /> Product variant
                </Link>
              </li>
              <li>
                <Link to="/brand" className="block text-lg">
                  <ChevronRight /> Brand
                </Link>
              </li>
              <li>
                <Link to="/color" className="block text-lg">
                  <ChevronRight /> Color
                </Link>
              </li>
              <li>
                <Link to="/size" className="block text-lg">
                  <ChevronRight /> Size
                </Link>
              </li>
            </ul>
          )}
          <div
            className={`cursor-pointer flex items-center mb-4 px-4 py-2 rounded-lg ${
              expandedItem === "Order" ? "bg-orange-400" : "hover:bg-orange-400"
            }`}
            onClick={() => handleItemClick("Order")}
          >
            <ShoppingCart style={{ fontSize: 36 }} className="mr-2" />
            <span className="flex-grow font-semibold">Order</span>
            {expandedItem === "Order" ? (
              <ArrowDropUpRounded style={{ fontSize: 48 }} />
            ) : (
              <ArrowRightRounded style={{ fontSize: 48 }} />
            )}
          </div>

          {expandedItem === "Order" && (
            <ul className="pl-2 space-y-2">
              <li>
                <Link to="/order" className="block text-lg">
                  <ChevronRight /> Order
                </Link>
              </li>
              <li>
                <Link to="/cancel-order" className="block text-lg">
                  <ChevronRight /> Order cancel
                </Link>
              </li>
            </ul>
          )}

          <div
            className={`cursor-pointer flex items-center mb-4 px-4 py-2 rounded-lg ${
              expandedItem === "Account"
                ? "bg-orange-400"
                : activeItem === "Account" // Sử dụng activeItem để xác định lớp CSS cho mục active
                ? "bg-orange-400"
                : "hover:bg-orange-400"
            }`}
            onClick={() => handleItemClick("Account")}
          >
            <AccountBox style={{ fontSize: 36 }} className="mr-2" />
            <span className="flex-grow font-semibold">
              {" "}
              <Link to="/account" onClick={() => setExpandedItem("")}>
                Account
              </Link>
            </span>
          </div>
          <div
            className={`cursor-pointer flex items-center mb-4 px-4 py-2 rounded-lg ${
              expandedItem === "Banner"
                ? "bg-orange-400"
                : "hover:bg-orange-400"
            }`}
            onClick={() => handleItemClick("Banner")}
          >
            <WalletRounded style={{ fontSize: 36 }} className="mr-2" />
            <span className="flex-grow font-semibold">
              <Link to="/banner">Banner</Link>
            </span>
          </div>
          <div className="mt-4 cursor-pointer flex items-center px-4 py-2 rounded-lg hover:bg-orange-400">
            <Logout style={{ fontSize: 36 }} className="mr-2" />
            <span className="font-semibold">Logout</span>
          </div>
          <div
            onClick={toggleSidebar}
            className="mt-4 lg:hidden cursor-pointer bg-red-500 rounded-lg flex items-center px-4 py-2 hover:bg-red-600"
          >
            <Backspace style={{ fontSize: 36 }} className="mr-2" />
            <span className="font-semibold">Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
