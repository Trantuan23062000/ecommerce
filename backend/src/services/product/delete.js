import db from "../../models";
import cloudinary from "../../middleware/upload";

const deleteProductAndImage = async (productId) => {
  try {
    // Tìm kiếm thông tin sản phẩm từ cơ sở dữ liệu
    const product = await db.Products.findByPk(productId);

    // Kiểm tra xem sản phẩm có tồn tại không
    if (!product) {
      return { EC: 1, message: "Product not found" };
    }

    // Check if the product exists in the Details table
    const productDetailsExists = await db.Detail.findOne({
      where: { productId },
    });

    if (productDetailsExists) {
      return {
        EC: 1,
        message: "The product already exists in the details. Please delete the details to delete the product !",
      };
    }

    // Tìm kiếm thông tin hình ảnh từ cơ sở dữ liệu dựa trên ImageId của sản phẩm
    const image = await db.Images.findByPk(product.imageId, { raw: true });

    // Kiểm tra xem hình ảnh có tồn tại không
    if (!image) {
      return { EC: 1, message: "Image not found" };
    }

    // Xoá ảnh từ Cloudinary
    let imageURLs = [];
    if (image.URL) {
      imageURLs = JSON.parse(image.URL);
    }

    await Promise.all(
      imageURLs.map(async (url) => {
        try {
          const publicId = url.split("/").slice(-1)[0].split(".")[0];
          await cloudinary.uploader.destroy(publicId);
          console.log("Deleted image from Cloudinary with public ID:", publicId);
        } catch (error) {
          console.error("Error deleting image from Cloudinary:", error);
        }
      })
    );

    // Xoá sản phẩm từ cơ sở dữ liệu
    await product.destroy();
    await db.Images.destroy({ where: { id: product.imageId } });

    return { EC: 0, message: "Product and associated images deleted successfully" };
  } catch (error) {
    console.error("Error deleting product and image:", error);
    return { EC: 1, message: "An error occurred while deleting the product and images" };
  }
};

module.exports = { deleteProductAndImage };
