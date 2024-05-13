import db from "../../models/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "../../mail/sendResetPasswordEmail"; // Import hàm gửi email

const ForgotPassword = async (email) => {
  try {
    // Tìm người dùng với email được cung cấp
    const user = await db.Users.findOne({ where: { email } });
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Tạo một mã thông báo (token) để đặt lại mật khẩu
    const resetToken = jwt.sign({ email }, 'reset_secret', { expiresIn: '1h' });

    // Lưu mã thông báo vào cơ sở dữ liệu
    user.resetPasswordToken = resetToken;
    await user.save();

    // Gửi email chứa mã thông báo đến người dùng
    await sendResetPasswordEmail(email, resetToken);
    console.log(resetToken);

    return {  
      success: true,
      message: "Reset password instructions have been sent to your email",
      resetToken
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while processing your request"
    };
  }
};

const ResetPassword = async (token, newPassword) => {
  try {
    // Giải mã token để lấy email
    const decodedToken = jwt.verify(token, 'reset_secret');
    const email = decodedToken.email;

    // Tìm người dùng với email được cung cấp và mã thông báo
    const user = await db.Users.findOne({ where: { email, resetPasswordToken: token } });
    if (!user) {
      return {
        success: false,
        message: "Invalid or expired reset token"
      };
    }

    // Mã hóa mật khẩu mới và lưu vào cơ sở dữ liệu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.resetToken = null; // Xóa mã thông báo đã sử dụng
    await user.save();

    return {
      success: true,
      message: "Password reset successfully"
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while processing your request"
    };
  }
};

module.exports = { ForgotPassword, ResetPassword };
