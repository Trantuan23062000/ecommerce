import db from "../../models/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkEmailExistence = async (email) => {
  try {
    if (email) {
      const existingUser = await db.Users.findOne({ where: { email } });
      return !!existingUser;
    }
    return false;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw new Error("An error occurred while checking email existence");
  }
};

const Login = async (email, password) => {
  let transaction;
  try {
    const isEmailExist = await checkEmailExistence(email);
    if (!isEmailExist) {
      return {
        EC: 1,
        message: "Email is not valid",
      };
    }

    transaction = await db.sequelize.transaction();

    const user = await db.Users.findOne({
      where: { email },
      transaction
    });
    if (!user) {
      return {
        EC: 1,
        message: "Invalid credentials",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        EC: 1,
        message: "Invalid credentials",
      };
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    const users = await db.Users.findByPk(user.id,{transaction})
    await users.update({ verificationToken: token });

    await transaction.commit();

    return {
      EC: 0,
      users,
      token,
    };
  } catch (error) {
    console.log("Error during login:", error);
    if (transaction) await transaction.rollback();
    return {
      EC: 2,
      message: "An error occurred while logging in",
    };
  }
};

module.exports = { Login };
