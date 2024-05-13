import {Product} from "../../services/product/getall"

const GetAll = async (req,res) =>{
    try {
       const product = await Product()
       if(product) {
        res.status(200).json({
            EC:0,
            product
        })
       } else{
        res.status(201).json({
            EC:1,
            product:[]
        })
       } 
    } catch (error) {
        console.log(error);
    }
    
}
module.exports = {GetAll}