import db from "../../models/index";

const Variant = async () => {
  const variant =  await db.productVariant.findAll();
  return variant
};
module.exports = { Variant };
