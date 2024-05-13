import axios from "axios";

export const FilterData = async (brandId, sizeId, colorId, minPrice, maxPrice, category) =>{
   return await axios.post("http://localhost:8000/api/v1/products/filter",brandId, sizeId, colorId, minPrice, maxPrice, category)

}
