import {getUserPagination} from "../../services/color/getpaginate"

const GetListColor = async (req, res) => {
    try {
        let page = req.query.page;
        let limit = req.query.limit;
        //console.log(page,limit);
        let data = await getUserPagination(+page, +limit);
        return res.status(200).json({
          EM: data.EM, //error message
          EC: data.EC, //error code
          DT: data.DT, //data
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

module.exports = {GetListColor}