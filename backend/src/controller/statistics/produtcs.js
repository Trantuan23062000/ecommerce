import db from "../../models";

const CountProducts = async (req,res) =>{
    const countProduct =await db.Products.count()
    res.status(200).json({
        Product : countProduct
    })
}

module.exports = {CountProducts}