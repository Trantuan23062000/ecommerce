import {productRelated} from "../../services/productSizeColor/related"

const getRelatedProducts = async (req, res) => {
    try {
        const relatedDetails = await productRelated();
        res.status(200).json({EC:0,relatedDetails});
    } catch (error) {
        //console.log(error);
    }
};

module.exports = {
    getRelatedProducts
}