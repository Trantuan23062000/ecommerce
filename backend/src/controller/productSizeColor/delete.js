import {deleteData} from "../../services/productSizeColor/delete"

const Delete = async(req,res,next) =>{
    try {
        const { detailId } = req.params;
        await deleteData(detailId);
        res.status(200).json({EC:0, message: "Data deleted successfully" });
      } catch (error) {
        next(error);
      }
}

module.exports = {
    Delete
}