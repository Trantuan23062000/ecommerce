import { updateBanner } from "../../services/banner/edit"; // Import the updateBrand function

// Controller to edit a brand
const EditBanner = async (req, res) => {
  try {
    const id = req.params.id;
    const file = req.file;

    // Call the updateBrand function to update brand information
    const Banner = await updateBanner(id, file);

    res.status(200).json({
      EC: 0,
      mes: "Brand updated successfully",
      updateBanner: Banner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: error.message || "Server Error",
    });
  }
};

module.exports = { EditBanner };
