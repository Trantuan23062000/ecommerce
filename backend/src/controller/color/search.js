import {SearchColor} from "../../services/color/search"
const SearchColors = async (req, res) => {
    try {
      const { color } = req.query;
      const data = await SearchColor(color);
        return res.status(200).json({
          EM: data.EM,
          EC: data.EC,
          DT: data.data
        })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        EM:color.EM,
        EC:color.EC,
        DT:[]
      })
    }
  };

  module.exports = {SearchColors}