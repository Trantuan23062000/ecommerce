import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ResetPasswordU } from "../../redux/auth/actions/forgot-password"
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password is not match !")
      return;
    }
    try {
      await dispatch(ResetPasswordU(password));
      navigate('/login')
      localStorage.clear()
      
      // Xử lý khi reset mật khẩu thành công và điều hướng người dùng đến trang chủ hoặc trang đăng nhập
    } catch (error) {
      // Xử lý khi có lỗi xảy ra trong quá trình reset mật khẩu
      console.error("Reset password error:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-3 items-center justify-center">
        <div className="py-16">
          <div className="max-w-lg bg-gray-50 text-black mx-auto shadow px-6 py-7 rounded-xl overflow-hidden">
            <form onSubmit={handleResetPassword}>
              <div>
                <h2 className="text-2xl text-center font-bold uppercase mb-1">
                  Reset Password
                </h2>
                <div>
                  <label htmlFor="password" className="text-black mb-2 block">
                    Password new
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="text-black mb-2 block">
                    Confirm password new
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                    placeholder="Enter confirm password"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="block w-full py-2 text-center text-white rounded-xl bg-black border border-primary hover:bg-red-500 hover:text-primary transition uppercase font-roboto font-medium"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
