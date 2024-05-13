import axios from "axios"

export const LoginAdmin = async(email,password)=>{
   return await axios.post("http://localhost:8000/api/v1/loginAdmin",email,password)
}