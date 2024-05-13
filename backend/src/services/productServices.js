import db from "../models/index";
import { Op } from "sequelize";

const updateProduct = async (data) => {
  if (!data.name) {
    return {
      EM: "Name required !",
      EC: -1,
    };
  }
  if (!data.description) {
    return {
      EM: "Description required !",
      EC: -1,
    };
  }
  if (!data.quantity) {
    return {
      EM: "Quantity required !",
      EC: -1,
    };
  }
  if (!data.price) {
    return {
      EM: "Price required !",
      EC: -1,
    };
  }
  if (!data.category) {
    return {
      EM: "Category required !",
      EC: -1,
    };
  }
  if (!data.brandId) {
    return {
      EM: "BrandId required !",
      EC: -1,
    };
  }

  try {
    const product = await db.Products.findOne({ where: { id: data.id } });
    console.log(product);
    if (product) {
      await product.update({
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        category: data.category,
        brandId: data.brandId,
      });
      return {
        EM: "Product Update sucessfully!",
        EC: 0,
        product,
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
const getBrand = async () => {
  let brand = await db.Brands.findAll({});
  if (brand) {
    return {
      EM: "Get data brand succes !",
      EC: 0,
      brand,
    };
  } else {
    return {
      EM: "Data error !",
      EC: 1,
      brand: [],
    };
  }
};

const getProduct = async () => {
  let product = await db.Products.findAll({
    include: { model: db.Brands, attributes: ["id", "name"] },
    order: [["id", "DESC"]],
    nest: true,
  });
  if (product) {
    return {
      EM: "Get data product !",
      EC: 0,
      product,
    };
  } else {
    return {
      EM: "No data !",
      EC: 0,
      product: [],
    };
  }
};

const checkProduct = async (brandData) => {
  let check = await db.Products.findOne({
    where: { name: brandData },
  });
  //console.log(check);
  if (check) {
    return true;
  }
  return false;
};
const createProduct = async (data) => {
  let isExitproduct = await checkProduct(data.name);
  if (isExitproduct === true) {
    return {
      EM: "Product is already exits",
      EC: 1,
    };
  }

  if (!data.name) {
    return {
      EM: "Name required !",
      EC: -1,
    };
  }
  if (!data.description) {
    return {
      EM: "Description required !",
      EC: -1,
    };
  }
  if (!data.quantity) {
    return {
      EM: "Quantity required !",
      EC: -1,
    };
  }
  if (!data.price) {
    return {
      EM: "Price required !",
      EC: -1,
    };
  }
  if (!data.category) {
    return {
      EM: "Category required !",
      EC: -1,
    };
  }
  if (!data.brandId) {
    return {
      EM: "BrandId required !",
      EC: -1,
    };
  }

  try {
    let product = await db.Products.create({
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      category: data.category,
      brandId: data.brandId,
    });
    console.log(product);
    return {
      EM: "Product Create",
      EC: 0,
      product,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error server....",
      EC: -1,
    };
  }
};

const getProductPagition = async(page,limit) =>{
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.Products.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "name", "description","price","quantity","category","brandId"],
      order: [["name", "DESC"]],
      include: { model: db.Brands, attributes: ["id", "name"] },
    })

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      product: rows,
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

}

const getListProduct =async () =>{
    const data = await db.Products.findAll()
    return {
      EM: "OK",
      EC: 0,
      DT: data,
    }
}

const deleteProduct = async (productId) => {
  try {
    const product = await db.Products.findByPk(productId);
    if (!product) {
      console.log("Product not found");
    }
    await product.destroy();
    return {
      EM: "OK product delete success !",
      EC: 0,
      product,
    };
  } catch (error) {
    console.log(error);
  }
};

const SearchProduct = async (name) => {
  try {
    let product = await db.Products.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      include: { model: db.Brands, attributes: ["id", "name"] },
    });
    return {
      EM: "Data search....",
      EC: 0,
      product,
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
  createProduct,
  getProduct,
  getBrand,
  updateProduct,deleteProduct,getProductPagition,SearchProduct,getListProduct
};
