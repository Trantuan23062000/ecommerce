import db from "../../models/index";
import { Op } from "sequelize";

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
      attributes: ["id", "name", "description","URL"],
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
      console.log("Brand not found");
    } 
    await brand.destroy();
    return {
      EM: "OK delete",
      EC: 0,
      brand,
    };
  } catch (error) {
    console.log(error);
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
  getListBrand,
  deleteBrand,
  getUserPagination,
  SearchBrand,
};
