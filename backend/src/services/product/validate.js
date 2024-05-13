import Joi from 'joi'

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().integer().min(0).required(),
  price: Joi.number().min(0).required(),
  sale: Joi.number().min(0).required(),
  brandId: Joi.string().required(),
  category: Joi.string().required()
});

const validateProduct = async (productData) => {
  try {
    await productSchema.validateAsync(productData);
  } catch (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = { validateProduct };
