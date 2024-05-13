import {getSize} from "../../services/size/get"


const getAllSize = async(req,res) =>{
    try {
        const size = await getSize()
        res.status(200).json({
            EC:0,
            size
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {getAllSize}
