import { uploadBanner } from "../../services/banner/create";

const CreateBanner = async (req, res) => {
  try {
    const result = await uploadBanner(req.file);
    if (result && result.EC === 1) {
      return res.status(200).json(result);
    } else if (result) {
      return res.status(201).json({
        mes: 'Banner Created',
        EC: 0,
        DT: result.DT,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'Server Error',
      EC: -1,
      DT: '',
    });
  }
};

module.exports = { CreateBanner };
