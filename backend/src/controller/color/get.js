import {getColor} from "../../services/color/get"


const getAllColor = async(req,res) =>{
    try {
        const color = await getColor()
        res.status(200).json({
            EC:0,
            color
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {getAllColor}
