import React, { useState } from "react";
import {
  AccountBox,
  Analytics,
  ArrowDropUp,
  ArrowRight,
  Home,
  Inventory,
  Logout,
  ShoppingCart,
} from "@mui/icons-material";
import {Link} from "react-router-dom"
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {
  const [expandedItem, setExpandedItem] = useState("Dashboard");
  const { isSidebarOpen } = useSidebar();


  const handleItemClick = (itemName) => {
    setExpandedItem(itemName === expandedItem ? "Dashboard" : itemName);
  };

  return (
    <div className={`bg-gray-100 text-black w-48 flex flex-col container ${isSidebarOpen ? '' : 'hidden'}`}>
      <div className="p-4 font-sans container mx-auto">
        <div
          className="cursor-pointer flex items-center mb-4 bg-yellow-400 px-4 py-2 rounded-lg"
          onClick={() => handleItemClick("Dashboard")}
        >
          <Home />
          <Link to="/"> Dashboard</Link>
        </div>
        <div className="text-sm mb-2 p-4 font-semibold">Menu</div>
        <div
          className={`cursor-pointer flex items-center mb-4 ${
            expandedItem === "Product"
              ? "bg-gray-300 px-4 py-2 rounded-lg"
              : ""
          }`}
          onClick={() => handleItemClick("Product")}
        >
          <div className="flex">
            <Inventory />
            Product
          </div>
          {expandedItem === "Product" ? <ArrowDropUp /> : <ArrowRight />}
        </div>
        {expandedItem === "Product" && (
          <ul className="pl-1">
            <div className="text-sm mb-2"><Link to="/Product-image">Product image</Link></div>
            <div className="text-sm mb-2"><Link to="/product-variant">Productvariant</Link></div>
            <div className="text-sm mb-2"><Link to="/brand">Brand</Link></div>
            <div className="text-sm mb-2"><Link to="/color">Color</Link></div>
            <div className="text-sm mb-2"><Link to="/size">Size</Link></div>
          </ul>
        )}
        <div
          className={`cursor-pointer flex items-center mb-4 ${
            expandedItem === "Order"
              ? "bg-gray-300 px-4 py-2 rounded-lg"
              : ""
          }`}
          onClick={() => handleItemClick("Order")}
        >
          <span className="flex">
            <ShoppingCart />
           <Link to="/order"> Order </Link>
          </span>
          {expandedItem === "Order" }
        </div>
        <div
          className={`cursor-pointer flex items-center mb-4 ${
            expandedItem === "Account"
              ? "bg-gray-300 px-4 py-2 rounded-lg"
              : ""
          }`}
          onClick={() => handleItemClick("Account")}
        >
          <span className="flex">
            <AccountBox />
            Account
          </span>
          {expandedItem === "Account" ? <ArrowDropUp /> : <ArrowRight />}
        </div>
        {expandedItem === "Account" && (
          <ul className="pl-6">
            <li className="text-sm mb-1">Item 1</li>
            <li className="text-sm mb-1">Item 2</li>
            <li className="text-sm mb-1">Item 3</li>
          </ul>
        )}
        <div>
          <Analytics />
          Analytics
        </div>
        <div className="mt-4">
          <Logout />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
