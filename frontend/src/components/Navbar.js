import React, { useEffect, useState } from "react";
import webLogo from "../assets/logo.png"
import '../css/navbar.css';
import { useNavigate, NavLink } from "react-router-dom";
import { useGetIsDoc } from '../hooks/useGetIsDoc';
import { useGetUserID } from "../hooks/useGetUserID";
import { UserAuth } from "../context/AuthContext";
import { useCookies } from "react-cookie";
import { GiHamburgerMenu } from "./ReactIcons";

export const Navbar = () => {
  const { isDoctor, setIsDoctor, logout, user, setUser, doc, setDoc, fetchCurrentDoc, fetchCurrentUser } = UserAuth();
  const userID = useGetUserID();
  const docStatus = useGetIsDoc();

  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"]);
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [dashImg, setDashImg] = useState('');

  // useEffect(() => {
  //   console.log('UE -',user)
  //   // console.log('UE ID-',userID)
  // }, [user])

  useEffect(()=>{
    // console.log(docStatus)
    { userID && (isDoctor==='true' ? fetchCurrentDoc() : fetchCurrentUser()) }
    console.log('getuserisdoctors UE-', isDoctor);
  }, [isDoctor])

  useEffect(() => {
    setIsDoctor(docStatus)
  }, []);
  return (
    <>
      <nav className="main-nav">
        <div className="logo"><img src={webLogo} alt="" /></div>
        <div className={ showMediaIcons ? "menu-link mobile-menu-link" : "menu-link" }>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/find-a-doctor">Find a Doctor</NavLink></li>
            <li><NavLink to="/community">Community Forum</NavLink></li>
          </ul>
        </div>

        <div className="social-media">
          { userID 
          ? <button type="button" className="account-nav" onClick={() => navigate( isDoctor==='true' ? '/doctor/account' : '/account')}><img src={ isDoctor==='true' ? doc?.imageUrl : user?.imageUrl} /></button>
          // ? <button type="button" className="account-nav" onClick={() => navigate('/doctor/account')}><img src={ webLogo} /></button>
          : <button type="button" className="log-in-button" onClick={() => navigate('/login')}>Log in</button>
          }
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
