import db from "../../models/index";
import { Op } from "sequelize";

const checkBrand = async (brandData) => {
  let check = await db.Brands.findOne({
    where: { name: brandData },
  });
  
  //console.log(check);
  if (check) {
    return true;
  }
  return false;

};

const CreateBrand = async (data) => {
  let isExitbrand = await checkBrand(data.name);
  if (isExitbrand === true) {
    return {
      EM: "Brand is already exits",
      EC: 1,
    };
  }
  try {
    let brand = await db.Brands.create({
      name: data.name,
      description: data.description,
    });
    return {
      success: "Brand Create",
      EC: 0,
      brand,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error server....",
      EC: -1,
    };
  }
};


const updateBrand = async (data) => {
  try {
    const brand = await db.Brands.findOne({ where: { id: data.id } });
    if (brand) {
      await brand.update({
        name: data.name,
        description: data.description,
      });
      return {
        success: "Brand Update sucessfully!",
        EC: 0,
        brand,
      };
    }
    //console.log(brand);
  } catch (error) {
    console.log(error);
    return {
      EM: "Error server....",
      EC: -1,
    };
  }
};

const getListBrand = async () => {
  try {
    let brand = await db.Brands.findAll({
      order: [["name", "DESC"]],
      nest: true,
    });

    if (brand) {
      return {
        EM: "Get data success",
        EC: 0,
        data: brand,
      };
    }
  } catch (error) {}
};

const getUserPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Brands.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "name", "description"],
      order: [["name", "DESC"]],
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      brand: rows,
    };
    return {
      EM: "OK",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs with servies",
      EC: 1,
      DT: [],
    };
  }
};


const deleteBrand = async (BrandID) => {
  try {
    const brand = await db.Brands.findByPk(BrandID);
    if (!brand) {
      return {
        EM: "Brand not found",
        EC: 1,
      };
    }

    // Check if the brand exists in the product table
    const productExists = await db.Products.findOne({
      where: { BrandID },
    });

    if (productExists) {
      return {
        EM: "Brand is associated with a product. Please remove the associated product first.",
        EC: 1,
      };
    }

    await brand.destroy();
    return {
      EM: "Brand deleted successfully",
      EC: 0,
      brand,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "An error occurred while deleting the brand",
      EC: 1,
    };
  }
};

const SearchBrand = async (name) => {
  try {
    let brand = await db.Brands.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      
    });
    return {
      EM: "Data search....",
      EC: 0,
      brand,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Server Errrorrr...",
      EC: -1,
      DT: "",
    };
  }
};

module.exports = {
  CreateBrand,
  getListBrand,
  updateBrand,
  deleteBrand,
  getUserPagination,
  SearchBrand,
};
