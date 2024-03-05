import React from 'react'
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Index from '../pages';
import { Navbar } from "./Navbar";
import { Footer } from './Footer';
import { Find_a_doctor } from '../pages/findADoctor';
import { Login } from '../pages/login';
import { Sign_up } from '../pages/signUp';
import { Doc_sign_up } from '../pages/docSignUp';
import { Account } from '../pages/docAccount';
import { Profile } from '../pages/profile';
import { useGetUserID } from '../hooks/useGetUserID';
import { useGetIsDoc } from '../hooks/useGetIsDoc';
import { UserAccount } from '../pages/userAccount';

export const AnimatedRoutes = () => {
    const userID = useGetUserID();
    const isDoc = useGetIsDoc();
    const location = useLocation();
    return (
    <AnimatePresence>
    <Navbar />
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/find-a-doctor" element={<Find_a_doctor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Sign_up />} />
        <Route path="/doctor/sign-up" element={<Doc_sign_up />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/doctor/account" element={<Account />} /> 
        <Route path="/doc/:username" element={<Profile />} />
    </Routes>
    <Footer />
    </AnimatePresence>
    )
}
