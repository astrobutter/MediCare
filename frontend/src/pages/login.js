import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserAuth } from "../context/AuthContext";
import '../css/login.css'

export const Login = () => {
  const navigate = useNavigate();
  const { isDoctor, setIsDoctor} = UserAuth();
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false)

  const handleSubmit = async (event) => {
    // console.log( username, password);
    event.preventDefault();
    try {
      let result;
      if( checked ){ 
        result = await axios.post("http://localhost:3001/auth/doc/login", { username, password, checked });
        setIsDoctor('true');
      }
      else{ result = await axios.post("http://localhost:3001/auth/login", { username, password, checked });
      setIsDoctor('false');
    }
      if( result.status===299 ){
        toast.error("Username doesn't exist.", { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark"});
        return;
      }
      else if( result.status===298 ){
        toast.error('Password is incorrect.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark"});
        return;
      }
      setCookies("access_token", result.data.token);
      console.log("access_token -", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      window.localStorage.setItem("isDoctor", result.data.isDoctor);
      toast.success('Logged in successfully.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark"});
      navigate("/");
    } catch (error) {console.error(error);}
  };

  useEffect(()=>{
    console.log(isDoctor)
  },[isDoctor])
  return (
    <motion.div className='page login-page' initial={{opacity:0, x:'100%'}} animate={{opacity:1, x:'0%'}} exit={{opacity:0 , x:'100%'}}>
      <form onSubmit={handleSubmit} className='max-width login-form'>
        <h3>Login</h3>
        <div className='column'>
          <input value={username} onChange={(event) => setUsername(event.target.value)} type="text" placeholder='Username' />
          <MdEmail />
        </div>
        <div className="column">
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder='Password' />
          <RiLockPasswordFill />
        </div>
        <div className="doc-check-box">
          <input onChange={ e => setChecked(!checked)} checked={checked} type="checkbox" />
          <p>Login as Doctor</p>
        </div>
        <button type="submit" onClick={handleSubmit}>Login</button>

        <div className="sign-up-link">Don't have an account? <Link to={'/sign-up'}>Sign-up</Link></div>
        <div className="sign-up-doctor-link">Sign-up as doctor? <Link to={'/doctor/sign-up'}>Create Doc Account</Link></div>
      </form>
    </motion.div>
  )
}
