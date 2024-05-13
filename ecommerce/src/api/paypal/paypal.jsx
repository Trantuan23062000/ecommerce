import axios from "axios";

export const openPayPal = async(orderDetailData)=>{
    return axios.post("http://localhost:8000/api/v1/create-payment",{orderDetailData})
}

export const getPaypal = async()=>{
    return axios.get("http://localhost:8000/api/v1/success")
}

