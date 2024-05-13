import axios from "axios"

export const Login = (email,password) =>{
    return axios.post("http://localhost:8000/api/v1/login",email,password)
}