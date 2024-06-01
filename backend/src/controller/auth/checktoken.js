import { compareTokenWithVerificationToken } from "../../services/auth/checktoken";

// Controller để xác minh token với verificationToken từ cơ sở dữ liệu
const verifyTokenWithVerificationToken = async (req, res) => {
  try {
    const { token, email } = req.body;

    if (!token || !email) {
      return res.status(400).json({ message: "Token and email are required." });
    }

    // Gọi hàm kiểm tra token với verificationToken từ cơ sở dữ liệu
    const match = await compareTokenWithVerificationToken(token, email);

    if (match) {
      return res.status(200).json({EC:0, message: "Token matches verificationToken." });
    } else {
      return res.status(201).json({EC:1, message: "Token does not match verificationToken." });
    }
  } catch (error) {
    console.error("Error verifying token with verificationToken:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { verifyTokenWithVerificationToken };
