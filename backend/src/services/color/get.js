import db from "../../models";

const getColor = async() =>{
    try {
        const color = db.Colors.findAll()
        return color
    } catch (error) {
        console.log(error);
    }
    

}

module.exports = {getColor}