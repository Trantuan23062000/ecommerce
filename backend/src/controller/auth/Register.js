import { Register } from "../../services/auth/register";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.number().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const RegisterUser = async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(201).json({
      EC: 1,
      message: error.details[0].message,
    });
  }

  const { username, phone, password, email } = value; // Retrieve email from validated data
  try {
    const result = await Register(username, phone, password, email); // Pass email to Register function
    if (result.success) {
      res.status(200).json({
        EC: 0,
        message: "Register success! An email has been sent to verify your account.",
        User: result.user,
      });
    } else {
      res.status(201).json({
        EC: 1,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      EC: 1,
      message: "Internal server error",
    });
  }
};

module.exports = { RegisterUser };
