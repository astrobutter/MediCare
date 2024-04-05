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
import { UserAppointment } from '../pages/userAppointment';
import { PaymentSuccess } from '../pages/paymentSuccess';
import { PaymentFailed } from '../pages/paymentFailed';
import { CommunityForum } from '../pages/communityForum';
import { ForumPage } from '../pages/forumPage';
import { EditPage } from '../pages/editPage';
import { CreateForum } from '../pages/createForum';
import { PostSearch } from '../pages/postSearch';

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
        <Route path="/user/appointment/:_id" element={<UserAppointment />} />
        <Route path="/payment-complete" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/forum" element={<CommunityForum />} />
        <Route path="/forum/:slug" element={<ForumPage />} />
        <Route path="/forum/edit/:slug" element={<EditPage />} />
        <Route path="/forum/create" element={<CreateForum />} />
        <Route path="/forum/search" element={<PostSearch />} />
    </Routes>
    <Footer />
    </AnimatePresence>
    )
}
