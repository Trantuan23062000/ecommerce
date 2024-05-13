// App.js
import React from "react";
import Navbar from "./layout/navbar";
import Sidebar from "./layout/siderbar"; // Đã sửa thành Sidebar
import Main from "./layout/main";
import { SidebarProvider } from "./context/SidebarContext";
import Footer from "./layout/footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductImage from "./components/productImage/productImage";
import Brand from "./components/brand/Brand";
import { Toaster } from 'react-hot-toast';
import ProductVariant from "./components/productVariant/productVariant";
import Color from "./components/color/color";
import Size from "./components/size/size";
import Order from "./components/order/order";
import Login from "./components/auth/login";

const App = () => {
  return (
    <SidebarProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Toaster/>
          <div className="flex flex-1">
            <Sidebar />
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route exact path="/product-image" element={<ProductImage/>}/>
              <Route exact path="/brand" element={<Brand/>}/>
              <Route exact path="/product-variant" element={<ProductVariant/>}/>
              <Route exact path="/color" element={<Color/>}/>
              <Route exact path="/size" element={<Size/>}/>
              <Route exact path="/order" element={<Order/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </SidebarProvider>
  );
};

export default App;
