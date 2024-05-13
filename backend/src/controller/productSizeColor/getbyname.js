import {getByName} from "../../services/productSizeColor/getbyname"

const getByNameProduct = async (req, res) => {
    try {
        const detailId = req.params.detailId; // Lấy detailId từ req.params
        const details = await getByName(detailId); // Gọi productRelated và lưu tên sản phẩm vào productName
        res.status(200).json({ EC: 0, details }); // Trả về tên sản phẩm
    } catch (error) {
        res.status(500).json({ EC: 1, message: "Internal server error" }); // Trả về lỗi nếu có
    }
};

module.exports = {
    getByNameProduct
}