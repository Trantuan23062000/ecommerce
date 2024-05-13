import { ForgotPassword, ResetPassword } from "../../services/auth/resetpassword"

// Controller xử lý yêu cầu quên mật khẩu
const forgotPasswordController = async (req, res) => {
  const { email } = req.body; // Lấy địa chỉ email từ request body

  // Gọi function ForgotPassword từ service
  const result = await ForgotPassword(email);

  // Trả về kết quả dưới dạng JSON
  return res.json(result);
};

// Controller xử lý yêu cầu đặt lại mật khẩu
const resetPasswordController = async (req, res) => {
  const { token, newPassword } = req.body; // Lấy token và mật khẩu mới từ request body

  // Gọi function ResetPassword từ service
  const result = await ResetPassword(token, newPassword);

  // Trả về kết quả dưới dạng JSON
  return res.json(result);
};

module.exports =  { forgotPasswordController, resetPasswordController };