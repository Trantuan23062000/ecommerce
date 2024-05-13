import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginAdmin } from "../../api/auth/login";
import toast from "react-hot-toast";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Get history object

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const response = await LoginAdmin({ email, password });
    console.log(response);
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.message);
      // Lưu thông tin đăng nhập vào localStorage
      localStorage.setItem('admin', response.data.user.username);
      navigate("/");
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="items-center justify-center">
        <div className="py-16">
          <div className="max-w-lg bg-gray-50 text-black mx-auto shadow px-6 py-7 rounded-xl overflow-hidden">
            <div>
              <div className="space-y-2">
                <h2 className="text-2xl text-center font-bold uppercase mb-1">
                  Login Admin doashboard
                </h2>
                <div>
                  <label htmlFor="email" className=" text-black mb-2 block">
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                    placeholder="youremail.@domain.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-black mb-2 block">
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                    placeholder="*******"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="block w-full py-2 text-center text-white rounded-xl bg-black border border-primary hover:bg-red-500 hover:text-primary transition uppercase font-roboto font-medium"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
