import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/auth/is-auth");
      if (response.data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        setIsLoggedIn(false);
        setUserData(false);
        return;
      }
      toast.error(
        error.response?.data?.message || "An unexpected error occurred.",
      );
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/user/data");
      if (response.data.success) {
        setUserData(response.data.userData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        setIsLoggedIn(false);
        setUserData(false);
        return;
      }
      toast.error(
        error.response?.data?.message || "An unexpected error occurred.",
      );
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
