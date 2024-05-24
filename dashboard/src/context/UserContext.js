import React, { createContext, useState, useEffect } from 'react';
import { getUsers, getOrderbyId } from '../api/auth/account';
import toast from 'react-hot-toast';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataOrder, setDataOrder] = useState([]);

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
        // Save dataOrder to local storage
        localStorage.setItem("dataOrder", JSON.stringify(response.data.data));
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ data, loading, error, dataOrder, setDataOrder, showDatabyIdUser }}>
      {children}
    </UserContext.Provider>
  );
};
