import axios from "axios"

export const RegisterUser = (username,phone,password,email,confirmPassword) =>{
    return axios.post("http://localhost:8000/api/v1/register",username,phone,password,email,confirmPassword)
}