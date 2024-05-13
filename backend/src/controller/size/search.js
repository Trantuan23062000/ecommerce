import {SearchSize} from "../../services/size/search"
const SearchSizes = async (req, res) => {
    try {
      const { size } = req.query;
      const data = await SearchSize(size);
        return res.status(200).json({
          EM: data.EM,
          EC: data.EC,
          DT: data.data
        })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        EM:size.EM,
        EC:size.EC,
        DT:[]
      })
    }
  };

  module.exports = {SearchSizes}