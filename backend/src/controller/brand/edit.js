import { updateBrand } from "../../services/brand/edit"; // Import the updateBrand function

// Controller to edit a brand
const EditBrand = async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = req.params.id;
    const file = req.file;

    // Call the updateBrand function to update brand information
    const updatedBrand = await updateBrand(id, file, name, description);

    res.status(200).json({
      EC: 0,
      mes: "Brand updated successfully",
      updatedBrand: updatedBrand,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: error.message || "Server Error",
    });
  }
};

module.exports = { EditBrand };
