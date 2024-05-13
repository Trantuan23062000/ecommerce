import ProductServiecs from "../../services/product/getList";

const GetList = async (req, res) => {
  try {
    const { pageSize, pageNumber } = req.query;
    const { Product, totalPages } = await ProductServiecs.GetList(
      +pageSize,
      +pageNumber
    );
    res.status(200).json({
      EC:0,
      Product,
      totalPages,
    });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error getting product Product:", error);
    res.status(500).json({ error: "Error getting product Product" });
  }
};

module.exports = {
  GetList,
};
