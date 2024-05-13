import {deleteColor} from "../../services/color/delete"

const DeleteColor = async (req, res) => {
    try {
      let { id } = req.params;
      let color = await deleteColor(id);
      return res.status(200).json({
        EM: color.EM,
        EC: color.EC,
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

module.exports = {DeleteColor}