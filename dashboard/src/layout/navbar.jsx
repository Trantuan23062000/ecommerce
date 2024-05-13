import React, { useEffect } from "react";
import {
  Dehaze,
  CircleNotifications,
  AccountCircle,
} from "@mui/icons-material";
import { useSidebar } from "../context/SidebarContext";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const admin = localStorage.getItem("admin");
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    if (!admin) {
      // Nếu không có, chuyển hướng đến trang đăng nhập
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [navigate]);
  return (
    <nav className="bg-black px-3 py-3 md:px-6 flex justify-between items-center">
      <div className="flex container mx-auto space-x-4 text-white font-bold">
        <div className="hover:text-yellow-500">
          <Dehaze onClick={toggleSidebar} style={{ fontSize: 48 }} />
        </div>
      </div>
      <div className="flex">
        <button className="text-white focus:outline-none focus:ring-2 px-3 py-1 rounded-md bg-transparent hover:text-yellow-500">
          <CircleNotifications style={{ fontSize: 32 }} />
        </button>
        {admin ? (
          <>
          <button
            onClick={handleLogout}
            className="text-black hover:text-yellow-700 flex text-base md:text-lg font-bold focus:ring-2 px-8 py-3 rounded-full bg-white"
          >
            <AccountCircle style={{ fontSize: 32 }} />
            Logout
          </button>
          </>
          
        ) : (
          <Link
            to="/login"
            className="text-black hover:text-yellow-700 flex text-base md:text-lg font-bold focus:ring-2 px-8 py-3 rounded-full bg-white"
          >
            <AccountCircle style={{ fontSize: 32 }} />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
