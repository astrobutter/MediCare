import React, { useState, useEffect} from 'react'
import { UserAuth } from '../context/AuthContext'
import { motion } from "framer-motion";
import '../css/userAccount.css'
import 'react-toastify/dist/ReactToastify.css';
import { FiMinusCircle } from "react-icons/fi";
import { FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";

export const UserAccount = () => {
    const { userID, user, logout, fetchCurrentUser, fetchAppointments, userAppointments } = UserAuth();

    useEffect(() => {
        fetchCurrentUser();
        fetchAppointments();
    }, []);

    useEffect(() => {
      console.log('UEuser -', user);
    }, [user]);
    useEffect(() => {
      console.log('UEuserAppointments -', userAppointments);
    }, [userAppointments]);

    return (
    <motion.div className='account page' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
        <div className='user-account'>
            <div className='left'>
                <img src={user.imageUrl} />
                <button className='log-out-button' onClick={logout}>Log-out</button>
            </div>
            <div className='right'>
                <h2>My Appointments</h2>
                <div className='table'>
                    { userAppointments?.map((appointment, index) => (
                        <div key={index}>
                            {appointment.bookedOn}
                            {appointment.date}
                            {appointment.time}
                            {appointment.doc}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
  )
}
