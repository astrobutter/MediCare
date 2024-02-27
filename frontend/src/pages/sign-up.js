import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/doc-sign-up.css'
import '../css/sign-up.css'

export const Sign_up = () => {
  const navigate = useNavigate();
  const [ user, setUser ] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    gender: "other",
    dob: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if( user.password.length<8 ){
        toast.error('Password should be greater than 8 characters.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
        });
        return;
      }
      const result = await axios.post("http://localhost:3001/auth/register", { ...user });
      if( result.status===299 ){
        toast.error('Username already exists.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
        });
      }else{
        setTimeout(() => {
          navigate("/login");
        }, "2800");
        toast.success('Successfully registered. Being redirected to login page in 3 sec.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <motion.div className='page signup-page' initial={{opacity:0, x:'100%'}} animate={{opacity:1, x:'0%'}} exit={{opacity:0 , x:'100%'}}>
      <form onSubmit={handleSubmit} className='max-width signup-form'>
        <h3>Sign-up</h3>
        <div className='column'>
          <label htmlFor="name">Name:</label>
          <input type="text" value={user.name} placeholder='Pawan Sharma' required
          onChange={(event) => setUser({...user, name:event.target.value})}
          />
        </div>
        <div className='column'>
          <label htmlFor="address">Email Address:</label>
          <input type="email" value={user.email} placeholder='abx@email.com' required
          onChange={(event) => setUser({...user, email:event.target.value})}
          />
        </div>
        <div className="column">
          <label htmlFor="email">Username:</label>
          <input type="text" value={user.username} placeholder='pawan15' required
            onChange={(event) => setUser({...user, username:event.target.value})}
          />
        </div>
        <div className="column">
          <label htmlFor="email">Password:</label>
          <input type="password" value={user.password} placeholder='Password' required
            onChange={(event) => setUser({...user, password:event.target.value})}
          />
        </div>
        <div className="column">
          <label htmlFor="gender">Gender:</label>
          <div className="radio">
            <div className="radio-column"><input type="radio" value='male' checked={user.gender === "male"} required
              onChange={(e)=>setUser({...user, gender: e.target.value})}
            />
            <label htmlFor="male">Male</label></div>
            <div className="radio-column"><input type="radio" value='female' checked={user.gender === "female"} 
              onChange={(e)=>setUser({...user, gender: e.target.value})}
            />
            <label htmlFor="male">Female</label></div>
            <div className="radio-column"><input type="radio" value='other' checked={user.gender === "other" }
              onChange={(e)=>setUser({...user, gender: e.target.value})}
            />
            <label htmlFor="male">Other</label></div>
          </div>
        </div>
        <div className="column">
          <label htmlFor="dob">D.O.B.:</label>
          <input type="date" value={user.dob} required
            onChange={(event) => setUser({...user, dob: event.target.value})}
          />
        </div>
        <button type="submit" className="save-button">Register</button>
        <div className="sign-up-link">Have an account? <Link to={'/login'}>Login</Link></div>
      </form>
    </motion.div>
  )
}
