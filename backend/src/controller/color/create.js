import {CreateColor}  from "../../services/color/create"

const CreateColors = async (req, res) => {
    try {
      let data = await CreateColor(req.body);
      return res.status(200).json({
        mes: data.success,
        EM: data.EM,
        EC: data.EC,
        DT: data.color,
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
    CreateColors
  }