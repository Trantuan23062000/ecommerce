import { updateColor } from "../../services/color/update";
const EditColor = async (req, res) => {
  try {
    const data = await updateColor(req.body);
    res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.color,
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

module.exports = {EditColor}
