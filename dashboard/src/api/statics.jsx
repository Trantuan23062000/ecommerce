import axios from "axios"
export const CountOders =async () =>{
   return await axios.get("http://localhost:8000/api/v1/orders/count")
}

export const CountProducts = async()=>{
return await axios.get("http://localhost:8000/api/v1/products/count")
}

export const CountUsers = async () =>{
    return await axios.get("http://localhost:8000/api/v1/users/count")
}