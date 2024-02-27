import React, { useEffect, useState } from "react";
import webLogo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import '../css/navbar.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import { CgProfile } from "react-icons/cg";
import { UserAuth } from "../context/AuthContext";

// import { useCookies } from "react-cookie";
// import { UserAuth } from "../context/AuthContext";
// import { useGetUserID } from "../hooks/useGetUserID";

export const Navbar = () => {
  const { logout, user } = UserAuth();
  const userID = useGetUserID();
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <img src={webLogo} alt="" />
        </div>

        <div
          className={ showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
        }>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/service">Services</NavLink></li>
            <li><NavLink to="/find-a-doctor">Find a Doctor</NavLink></li>
            <li><NavLink to="/community">Community Forum</NavLink></li>
          </ul>
        </div>

        <div className="social-media">
          { userID ?
          // <button type="button" className="profile-button" onClick={() => navigate('/account')} ><CgProfile />
          // </button>
          // <button type="button" className="log-out-button" onClick={logout}>
          //   Log out
          // </button>
          <button type="button" className="account-nav" onClick={() => navigate('/doctor/account')}>
          <img src={user.imageUrl} />
          {/* Account */}
          </button>
          :
          <button type="button" className="log-in-button" onClick={() => navigate('/login')}>
            Log in
          </button>
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
