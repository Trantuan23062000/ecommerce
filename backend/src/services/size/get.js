import db from "../../models";

const getSize = async() =>{
    try {
        const size = db.Sizes.findAll()
        return size
    } catch (error) {
        console.log(error);
    }
}
module.exports = {getSize}