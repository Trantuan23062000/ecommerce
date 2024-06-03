import React from "react";
import Navbar from "./layout/navbar";
import Sidebar from "./layout/siderbar"; // Đã sửa thành Sidebar
import Main from "./layout/main";
import { SidebarProvider } from "./context/SidebarContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductImage from "./components/productImage/productImage";
import Brand from "./components/brand/Brand";
import { Toaster } from 'react-hot-toast';
import ProductVariant from "./components/productVariant/productVariant";
import Color from "./components/color/color";
import Size from "./components/size/size";
import Order from "./components/order/order";
import Login from "./components/auth/login";
import Account from "./components/account/account";
import Show from "./components/account/show";
import Banner from "./components/banner/Banner";
import CancelOrder from "./components/cancelorder/order";


const App = () => {
  return (
    <SidebarProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Toaster />
          <div className="flex flex-1 flex-grow transition-all duration-300">
            <Sidebar />
            <div className="flex-1 overflow-auto p-4"> {/* Thêm lớp overflow-auto để tạo cuộn */}
              <Routes>
                <Route exact path="/" element={<Main />} />
                <Route exact path="/product-image" element={<ProductImage />} />
                <Route exact path="/brand" element={<Brand />} />
                <Route exact path="/product-variant" element={<ProductVariant />} />
                <Route exact path="/color" element={<Color />} />
                <Route exact path="/size" element={<Size />} />
                <Route exact path="/order" element={<Order />} />
                <Route exact path="/banner" element={<Banner />} />
                <Route exact path="/account" element={<Account />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/myorder/:userId" element={<Show />} />
                <Route exact path="/cancel-order" element={<CancelOrder />} />
                <Route />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </SidebarProvider>
  );
};

export default App;
