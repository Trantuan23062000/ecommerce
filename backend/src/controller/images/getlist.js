import GetList from "../../services/images/getlist"
const listImages = async (req, res) => {
    try {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 10;
      const images = await GetList.getImages(+page, +pageSize);
      return res.status(200).json({
        success: "Get image success !",
        images,
        EC: 0,
        DT: images.totalImages,
      });
    } catch (error) {
      console.error("Error listing images:", error);
      return res.status(500).json({ error: "Failed to list images" });
    }
  };

  const Search = async (req, res) => {
    try {
      const { id } = req.query;
      const image = await GetList.SearchImage(id);
        return res.status(200).json({
          EM: image.EM,
          EC: image.EC,
          DT: image.image
        })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        EM:image.EM,
        EC:image.EC,
        DT:[]
      })
    }
  };



module.exports = {
    listImages,Search
}