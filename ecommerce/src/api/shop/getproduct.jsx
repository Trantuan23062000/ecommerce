import axios from "axios"

export const GetProduct = async(pageSize,pageNumber) =>{
    return await axios.get(`http://localhost:8000/api/v1/productDetails/get/?pageSize=${pageSize}&pageNumber=${pageNumber}`)
}
export const GetBrands = async ()=>{
    return await axios.get("http://localhost:8000/api/v1/brand/getBrand")
}

