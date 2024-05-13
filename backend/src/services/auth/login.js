import db from "../../models/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const checkEmailAndPhoneExistence = async (email) => {
  try {
    let existingUser;
    if (email) {
      // Kiểm tra xem có người dùng nào đã sử dụng email này chưa
      existingUser = await db.Users.findOne({ where: { email } });
    }
    // Trả về kết quả: true nếu email hoặc số điện thoại đã tồn tại, false nếu không tồn tại
    return !!existingUser;
  } catch (error) {
    // Log lỗi nếu có
    console.error("Error checking email and phone existence:", error);
    throw new Error(
      "An error occurred while checking email and phone existence"
    );
  }
};

const Login = async (email, password) => {
  try {
    // Kiểm tra xem email hoặc số điện thoại đã tồn tại không
    const isEmailOrPhoneExist = await checkEmailAndPhoneExistence(email);
    if (!isEmailOrPhoneExist) {
      return {
        EC: 1,
        message: "Email or Phone is not valid",
      };
    }

    // Tìm người dùng trong cơ sở dữ liệu bằng số điện thoại hoặc email
    const user = await db.Users.findOne({
      where: { email },
    });

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return {
        EC: 1,
        message: "Invalid credentials",
      };
    }

    //console.log(user);

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        EC: 1,
        message: "Invalid credentials",
      };
    }

    // Tạo token JWT để xác thực người dùng
    const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
      expiresIn: "1h",
    });

    // Trả về thông tin người dùng và token
    return {
      EC: 0,
      user,
      token,
    };
  } catch (error) {
    // Log lỗi cho mục đích gỡ lỗi
    console.log(error);

    // Trả về một thông báo lỗi
    return {
      success: false,
      message: "An error occurred while logging in",
    };
  }
};

module.exports = { Login };
