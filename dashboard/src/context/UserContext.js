import React, { createContext, useState, useEffect } from 'react';
import { getUsers, getOrderbyId } from '../api/auth/account';
import toast from 'react-hot-toast';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataOrder, setDataOrder] = useState([]);

  // Thay đổi trạng thái dựa trên dữ liệu trong localStorage khi tải ứng dụng
  useEffect(() => {
    const savedDataOrder = localStorage.getItem("dataOrder");
    if (savedDataOrder) {
      setDataOrder(JSON.parse(savedDataOrder));
    }
    fetchUser()
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getUsers();
      setData(response.data.data);
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const showDatabyIdUser = async (userId) => {
    try {
      const response = await getOrderbyId(userId);
      if (response && response.data && response.data.EC === 0) {
        setDataOrder(response.data.data);
        // Lưu dữ liệu vào localStorage
        localStorage.setItem("dataOrder", JSON.stringify(response.data.data));
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };
  
  return (
    <UserContext.Provider value={{ data, loading, error, dataOrder, setDataOrder, showDatabyIdUser }}>
      {children}
    </UserContext.Provider>
  );
};
