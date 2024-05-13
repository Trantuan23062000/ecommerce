import axios from "axios"

export const CreateSize = (Sizedata) =>{
    return axios.post("http://localhost:8000/api/v1/size/create",{...Sizedata})
}

export const getSizes = (page,limit)=>{
    //return axios.get("http://localhost:8000/api/v1/brand/getBrand")
    return axios.get(`http://localhost:8000/api/v1/size/getpaginate/?page=${page}&limit=${limit}`)
}

export const UpdateSize = async(data)=>{
    try {
        const response = await axios.put("http://localhost:8000/api/v1/size/update",{...data})
        return response
    } catch (error) {
        throw new Error('Error updating Size'); 
    }
}
export const DeletSize = (id) =>{
    return axios.delete(`http://localhost:8000/api/v1/size/delete/${id}`,)
}

export const SearchSize = (size) =>{
    return axios.get(`http://localhost:8000/api/v1/size/search/?color=${size}`)
}

