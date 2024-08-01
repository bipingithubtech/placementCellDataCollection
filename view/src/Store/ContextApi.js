import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/refetch", {
          withCredentials: true,
        });
        console.log("Fetched token:", res.data); // Log response data
        setToken(res.data);
      } catch (err) {
        console.error("Problem in getAccessToken:", err);
      }
    };

    getAccessToken();
  }, []);

  useEffect(() => {
    console.log("Token updated:", token); // Log token whenever it changes
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
