import axios from "axios";

export const getUsers = async () =>{
    return await axios.get("http://localhost:8000/api/v1/users")
}

export const getOrderbyId = async(userId)=>{
    return await axios.get(`http://localhost:8000/api/v1/oderById/${userId}`)
}