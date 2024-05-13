import db from "../../models";

const checkSize = async (size) => {
  const existingSize = await db.Sizes.findOne({
    where: { size: size },
  });
  if (existingSize) {
    return true;
  } else {
    return false;
  }
};

const CreateSize = async (data) => {
  let isSize = await checkSize(data.size);
  if (isSize === true) {
    return {
      EM: "Size already exists",
      EC: 1,
    };
  }

  try {
    let sizes = await db.Sizes.create({
      size: data.size,
      description: data.description,
    });
    return {
      success: "Size created",
      EC: 0,
      sizes,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Server error",
      EC: -1,
    };
  }
};

module.exports = { CreateSize };
