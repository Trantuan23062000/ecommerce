import {getBanner} from "../../services/banner/get"

const GetAllBanner =async (req,res) =>{
    const banner = await getBanner()
    res.status(200).json({
        EC:0,
        data:banner
    })
}
module.exports = {GetAllBanner}