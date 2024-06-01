import db from "../../models/index";

// Hàm so sánh token với verificationToken từ cơ sở dữ liệu
const compareTokenWithVerificationToken = async (token, email) => {
  try {
    // Truy vấn cơ sở dữ liệu để lấy verificationToken tương ứng với email
    const user = await db.Users.findOne({ where: { email } });
    
    // Kiểm tra nếu không tìm thấy user hoặc không có verificationToken
    if (!user || !user.verificationToken) {
      return false;
    }

    // So sánh token với verificationToken
    return token === user.verificationToken;
  } catch (error) {
    console.error("Error comparing token with verificationToken:", error);
    throw new Error("An error occurred while comparing token with verificationToken");
  }
};

module.exports = { compareTokenWithVerificationToken };
