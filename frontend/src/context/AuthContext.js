import { createContext, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetUserID } from '../hooks/useGetUserID';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [user, setUser] = useState({
    name: "",
    dob:"",
    gender: "",
    email: "",
    imageUrl: "",
    educations: [],
    experiences: [],
    specializations: [],
    schedules: [],
    about: "",
    username: "",
    password: "",
  });
  const [ isDoctor, setIsDoctor ] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  const handleSubmit = ()=>{
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      handleSubmit,
      logout,
      totalPages,
      setTotalPages,
      setIsDoctor
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};