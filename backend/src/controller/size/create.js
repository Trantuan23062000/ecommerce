import {CreateSize}  from "../../services/size/create"

const CreateSizes = async (req, res) => {
    try {
      let data = await CreateSize(req.body);
      return res.status(200).json({
        mes: data.success,
        EM: data.EM,
        EC: data.EC,
        DT: data.sizes,
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

  module.exports = {
    CreateSizes
  }