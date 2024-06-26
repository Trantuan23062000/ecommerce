import axios from "axios"

export const CreateBrand = (Branddata) =>{
    return axios.post("http://localhost:8000/api/v1/brand/createBrand",Branddata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
}

export const getBrands = (page,limit)=>{
    //return axios.get("http://localhost:8000/api/v1/brand/getBrand")
    return axios.get(`http://localhost:8000/api/v1/brand/getBrand/?page=${page}&limit=${limit}`)
}

export const UpdateBrand = async(id,data)=>{
    try {
        const response = await axios.put(`http://localhost:8000/api/v1/brand/update/${id}`, data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        return response
    } catch (error) {
        throw new Error('Error updating brand'); 
    }
}
export const DeletBrand = (id) =>{
    return axios.delete(`http://localhost:8000/api/v1/brand/delete/${id}`,)
}

export const SearchBrand = (name) =>{
    return axios.get(`http://localhost:8000/api/v1/brand/search/?name=${name}`)
}



