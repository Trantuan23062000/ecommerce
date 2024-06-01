import axios from "axios"
export const CheckToken = async(email,token)=>{
    return await axios.post("http://localhost:8000/api/v1/checktoken",email,token)
}