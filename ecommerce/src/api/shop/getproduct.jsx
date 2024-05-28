import axios from "axios"

export const GetProduct = async(pageSize,pageNumber) =>{
    return await axios.get("http://localhost:8000/api/v1/productDetails/getall")
}
export const GetBrands = async ()=>{
    return await axios.get("http://localhost:8000/api/v1/brand/getBrand")
}

export const SearchProduct = async (name) => {
  return await axios.post("http://localhost:8000/api/v1/productDetails/search",name);
};

