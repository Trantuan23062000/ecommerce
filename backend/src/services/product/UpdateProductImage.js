import db from "../../models";
import cloudinary from "../../middleware/upload";

const updateProductAndImage = async (productId, newData, files) => {
  try {
    // Lấy thông tin sản phẩm từ cơ sở dữ liệu
    const product = await db.Products.findByPk(productId);

    // Kiểm tra xem sản phẩm có tồn tại không
    if (!product) {
      throw new Error("Product not found");
    }

    // Cập nhật thông tin sản phẩm với dữ liệu mới
    await product.update(newData);

    // Lấy thông tin hình ảnh từ cơ sở dữ liệu dựa trên ImageId của sản phẩm
    const image = await db.Images.findByPk(product.imageId);

    // Kiểm tra xem hình ảnh có tồn tại không
    if (!image) {
      throw new Error("Image not found");
    }

    // Kiểm tra xem có file nào được gửi lên không
    if (files.length > 0) {
      // Nếu có file được gửi lên, xóa các ảnh cũ khỏi Cloudinary và cập nhật URL mới
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

      // Upload các ảnh mới lên Cloudinary và cập nhật URL ảnh trong cơ sở dữ liệu
      const newImageURLs = [];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        const imageURL = result.secure_url;
        newImageURLs.push(imageURL);
      }
      await image.update({ URL: JSON.stringify(newImageURLs) });
    }

    // Trả về thông tin sản phẩm và hình ảnh
    return { product, image };
  } catch (error) {
    console.error("Error updating product and image:", error);
    throw new Error(error);
  }
};

module.exports = { updateProductAndImage };