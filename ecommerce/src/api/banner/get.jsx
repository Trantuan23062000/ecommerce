import axios from "axios"

export const getBanner = async () =>{
    return await axios.get("http://localhost:8000/api/v1/banner/get")
}