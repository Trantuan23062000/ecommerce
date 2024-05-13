import db from "../../models/index"; 

const getImageById = async (imageId) => {
    try {
        const image = await db.Images.findOne({
            where: { id: imageId } // Định rõ điều kiện truy vấn ở đây
        }); 
        return image; 
    } catch (error) {
        console.log(error);
        return null; // Trả về null nếu có lỗi
    }
};

module.exports = { getImageById };
