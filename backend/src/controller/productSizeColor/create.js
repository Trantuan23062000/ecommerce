
import { addProductData } from "../../services/productSizeColor/create";
import {validateProductData} from "../../utils/validate"

const addProductDataController = async (req, res) => {
  try {
    // Validate request data
    const { error, value } = validateProductData(req.body);
    if (error) {
      return res.status(201).json({ success: false, message: error.details[0].message });
    }

    // Extract necessary data from request body
    const { productId, productvariants } = value;

    // Perform business logic to add product data
    const result = await addProductData(productId, productvariants);

    // Return success response
    return res.status(200).json({
      EC: 0,
      message: "Product data added successfully.",
      data: result,
    });
  } catch (error) {
    // Handle error
    console.error("Error adding product data:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the product data.",
    });
  }
};

module.exports = { addProductDataController };
