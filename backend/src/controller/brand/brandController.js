import BrandServices from "../../services/brand/brandServices";

const Create = async (req, res) => {
  try {
    let data = await BrandServices.CreateBrand(req.body);
    return res.status(200).json({
      mes: data.success,
      EM: data.EM,
      EC: data.EC,
      DT: data.brand,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Server Error",
      EC: -1,
      DT: "",
    });
  }
};

const EditBrand = async (req, res) => {
  try {
    const data = await BrandServices.updateBrand(req.body);
    res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.data,
      mes: data.success,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      EM: "Server Error",
      EC: -1,
      DT: "",
    });
  }
};

const GetListBrand = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      //console.log(page,limit);
      let data = await BrandServices.getUserPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, //error code
        DT: data.DT, //data
      });
    } else {
      let data = await BrandServices.getListBrand();
      res.status(200).json({
        EM: data.EM, //error message
        EC: data.EC, //error code
        DT: data.data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      EM: "Server Error",
      EC: -1,
      DT: "",
    });
  }
};

const DeleteBrand = async (req, res) => {
  try {
    let { id } = req.params;
    let brand = await BrandServices.deleteBrand(id);
    return res.status(200).json({
      EM: brand.EM,
      EC: brand.EC,
      DT: brand.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};

const Search = async (req, res) => {
  try {
    const { name } = req.query;
    const brand = await BrandServices.SearchBrand(name);
      return res.status(200).json({
        EM: brand.EM,
        EC: brand.EC,
        DT: brand.brand
      })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM:brand.EM,
      EC:brand.EC,
      DT:[]
    })
  }
};

module.exports = {
  Create,
  GetListBrand,
  EditBrand,
  DeleteBrand,
  Search
};
