import axios from "axios"

export const GetOders = async()=>{
    return await axios.get("http://localhost:8000/api/v1/orders")
}