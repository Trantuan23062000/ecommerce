import {deleteSize} from "../../services/size/delete"

const DeleteSize = async (req, res) => {
    try {
      let { id } = req.params;
      let sizes = await deleteSize(id);
      return res.status(200).json({
        EM: sizes.EM,
        EC: sizes.EC,
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

module.exports = {DeleteSize}