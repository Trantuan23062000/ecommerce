import Joi from "joi";
import { uploadImage } from "../../services/product/upload";
import { createProduct } from "../../services/product/create";

// Schema for request body validation
const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  sale: Joi.number().required(),
  status: Joi.string().required(),
  category: Joi.string().required(),
  brandId: Joi.string().required(),
});

const addProduct = async (req, res, next) => {
  try {
    const { error: validationError, value } = productSchema.validate(req.body);
    if (validationError) {
      return res.status(201).json({ EC: 1, error: validationError.details[0].message });
    }
    const { name, description, price,sale, status, category, brandId } = value;
    const files = req.files;

    // const existingProduct = await db.Products.findOne({ where: { name } });
    // if (existingProduct) {
    //   return res.status(201).json({EC:1,error:"Name productImage exits"})
    // }

    if (!files || files.length === 0) {
      return res.status(201).json({ EC: 1, error: "Please upload at least one image." });
    }


    if (files.length > 4) {
      return res.status(201).json({ EC: 1, error: "You can only upload up to 4 images at a time." });
    }

    // Upload ảnh và lấy ID của bản ghi Image
    const imageId = await uploadImage(files);

    // Tạo sản phẩm và liên kết với hình ảnh
    const { product } = await createProduct(
      name,
      description,
      price,
      sale,
      status,
      category,
      brandId,
      imageId
    );

    res.status(200).json({
      success: true,
      data: {
        product,
        
      },
      message: "Product added successfully.",
      EC: 0,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addProduct };
