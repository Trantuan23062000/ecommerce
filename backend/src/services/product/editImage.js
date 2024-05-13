import db from "../../models";
import cloudinary from "../../middleware/upload";

const updateImage = async (id, files) => {
  try {
    // Lấy thông tin hình ảnh từ cơ sở dữ liệu
    const image = await db.Images.findByPk(id);

    // Kiểm tra xem trường URL có phải là một chuỗi JSON không
    let imageURLs = [];
    if (image.URL) {
      imageURLs = JSON.parse(image.URL);
    }
    if (typeof image.URL === "string") {
      imageURLs = JSON.parse(image.URL);
    } else {
      imageURLs = image.URL;
    }

    // Xóa các ảnh cũ khỏi Cloudinary
    await Promise.all(
      imageURLs.map(async (url) => {
        try {
          // Lấy public ID từ URL ảnh
          const publicId = url.split("/").slice(-1)[0].split(".")[0];

          // Xoá ảnh từ Cloudinary
          await cloudinary.uploader.destroy(publicId);

          console.log(
            "Deleted image from Cloudinary with public ID:",
            publicId
          ); // Thêm dòng này để ghi log
        } catch (error) {
          console.error("Error deleting image from Cloudinary:", error);
          // Nếu có lỗi xảy ra, bạn có thể xử lý nó ở đây (ví dụ: ghi log và tiếp tục)
        }
      })
    );

    // Xoá tất cả URL cũ từ cơ sở dữ liệu
    await image.update({ URL: null });

    // Tạo mảng để lưu các URL mới của các ảnh
    const newImageURLs = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path);
      const imageURL = result.secure_url;
      newImageURLs.push(imageURL);
    }

    // Cập nhật URL ảnh mới vào cơ sở dữ liệu
    await image.update({ URL: JSON.stringify(newImageURLs) })

    return image;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error); // Thêm dòng này để in ra lỗi
  }
};

module.exports = { updateImage };