import db from "../../models";

const checkColor = async (color) => {
  const existingColor = await db.Colors.findOne({
    where: { color: color },
  });
  if (existingColor) {
    return true;
  } else {
    return false;
  }
};

const checkColorCode = async (codeColor) => {
  const existingCode = await db.Colors.findOne({
    where: { codeColor: codeColor },
  });
  if (existingCode) {
    return true;
  } else {
    return false;
  }
};

const CreateColor = async (data) => {
  let isExistsColor = await checkColor(data.color);
  let isExistsCodeColor = await checkColorCode(data.codeColor)
  if (isExistsColor === true) {
    return {
      EM: "Color already exists",
      EC: 1,
    };
  }
  if(isExistsCodeColor === true){
    return{
        EM:"Code color already exits",
        EC:1
    }
  }

  try {
    let color = await db.Colors.create({
      color: data.color,
      codeColor: data.codeColor,
    });
    return {
      success: "Color created",
      EC: 0,
      color,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Server error",
      EC: -1,
    };
  }
};

module.exports = { CreateColor };
