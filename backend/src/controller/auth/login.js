import { Login } from "../../services/auth/login";

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const result = await Login(email, password);
      
      if (result.EC === 0) {
        // Đăng nhập thành công
        res.status(200).json({
          EC: 0,
          message: "Login successful",
          user: result.user,
          token: result.token
        });
      } else {
        // Đăng nhập thất bại
        res.status(201).json({
          EC: 1,
          message: result.message
        });
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error during login:", error);
      res.status(500).json({
        EC: 1,
        message: "Internal server error"
      });
    }
  };
  
module.exports = { loginUser };
