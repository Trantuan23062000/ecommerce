import { uploadImageBrand } from "../../services/brand/create";

const Create = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        EM: 'Brand name is required',
        EC: 1,
      });
    }

    const result = await uploadImageBrand(req.file, req.body);
    if (result && result.EC === 1) {
      return res.status(200).json(result);
    } else if (result) {
      return res.status(201).json({
        mes: 'Brand Created',
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

module.exports = { Create };
