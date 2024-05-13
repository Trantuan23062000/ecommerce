import {SearchProduct} from "../../services/product/seach"



const SearchProductdata =async (req,res) =>{
   try {
    const {name} = req.query
    const product = await SearchProduct (name)
    if(product){
        res.status(200).json({
            product,
            EC:0
        })
    }
    else{
        res.status(404).json({
            EC:1
        })
    }
   } catch (error) {
    console.log(error);
   }

}
module.exports = {
    SearchProductdata
}