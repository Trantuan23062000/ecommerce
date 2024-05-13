import { updateSize } from "../../services/size/update";
const EditSize = async (req, res) => {
  try {
    const data = await updateSize(req.body);
    res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.sizes,
      mes: data.success,
    });
  } catch (error) {
    res.status(500).json({
      EM: "Server Error",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {EditSize}
