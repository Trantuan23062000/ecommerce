import axios from "axios";

export const GetBrands = async () => {
  return await axios.get("http://localhost:8000/api/v1/brand/getBrand");
};
export const GetListProduct = async (pageSize, pageNumber) => {
  return await axios.get(
    `http://localhost:8000/api/v1/productImage/getList/?pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
};
export const CreateProductImage = async (formData) => {
  return await axios.post(
    "http://localhost:8000/api/v1/productImage/create",
    formData
  );
};

export const GetListImage = async () => {
  return await axios.get("http://localhost:8000/api/v1/image/getImage");
};

export const UpdateProduct = async (id, formData) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/v1/productImage/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteProduct = async (id) => {
  return await axios.delete(
    `http://localhost:8000/api/v1/productImage/delete/${id}`
  );
};

export const SearchProduct = (name) => {
  return axios.get(
    `http://localhost:8000/api/v1/productImage/search/?name=${name}`
  );
};
