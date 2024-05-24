import db from "../../models";

const CountUsers = async (req,res) =>{
    const countUsers =await db.Users.count()
    res.status(200).json({
        users : countUsers
    })
}

module.exports = {CountUsers}