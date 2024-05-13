import db from "../../models/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Register = async (username, phone, password, email) => {
  try {
    // Check if the phone number has been used
    const existingPhoneUser = await db.Users.findOne({ where: { phone } });
    if (existingPhoneUser) {
      return {
        success: false,
        message: "The phone number is already in use"
      };
    }

    // Check if the email has been used
    const existingEmailUser = await db.Users.findOne({ where: { email } });
    if (existingEmailUser) {
      return {
        success: false,
        message: "The email address is already in use"
      };
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a reset token
    const resetToken = jwt.sign({ email }, 'secret', { expiresIn: '12h' });

    // Create a new user
    const user = await db.Users.create({
      username,
      phone,
      email,
      password: hashedPassword,
      isVerified: 0,
      verificationToken: resetToken
    });

    return {
      success: true,
      user
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error);

    // Return an error object with a specific message
    return {
      success: false,
      message: "An error occurred while registering the user"
    };
  }
};

module.exports = { Register };
