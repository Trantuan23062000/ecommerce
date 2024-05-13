import {Variant} from "../../services/productSizeColor/getVariant"

const getVariant = async (req,res,next) =>{
    try {
        const variant = await Variant()
        if(variant) {
            res.status(200).json({
                EC:0,
                variant,
            })
        }else{
            res.status(201).json({
                EC:1,
                variant:[]
            })
        }
    
    } catch (error) {
        next(error)
    }
}
module.exports = {getVariant}