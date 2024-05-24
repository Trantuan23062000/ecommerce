import {getUser} from "../../services/auth/account"

const getAccount = async (req,res) =>{
    const user = await getUser()
    res.status(200).json({
       EC : 0 ,data : user 
    })
}

module.exports = {getAccount}