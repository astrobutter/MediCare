import React, { useState, useEffect} from 'react'
import { UserAuth } from '../context/AuthContext'
import { motion } from "framer-motion";
import '../css/userAccount.css'
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import { MdKeyboardArrowRight } from "react-icons/md";

export const UserAccount = () => {
    const { userID, user, logout, month, fetchCurrentUser, fetchAppointments, userAppointments, navigate } = UserAuth();

    const handleAppointmentNav = (event, _id) => {
        event.stopPropagation();
        navigate(`/user/appointment/${_id}`);
    }
    const handleProfileNav = (event, doc) => {
        event.stopPropagation();
        navigate(`/doc/${doc}`);
    }
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
        <div className='user-account max-width'>
            <div className='left'>
                <img src={user.imageUrl} />
                <div className='name'>{user.name}</div>
                <div className='username'>@{user.username}</div>
                <button className='log-out-button' onClick={logout}>Log-out</button>
            </div>
            <div className='right'>
                <h2>My Appointments</h2>
                <div className={userAppointments&&'table' }>
                    <div className='row header'>
                        <div>Doc Username</div>
                        <div>Appointment Date</div>
                        <div>Appointment Time</div>
                    </div>
                    { userAppointments?.map((appointment, index) => (
                        <div key={index} className='row'>
                            <button className='username' onClick={event => handleProfileNav(event, appointment.doc)}>{appointment.doc}</button>
                            <div>{month[dayjs(appointment.date).format('MM')-'0']} {dayjs(appointment.date).format('DD')-'0' -1}, {dayjs(appointment.date).format('YYYY')}</div>
                            <div>{appointment.time>11? (appointment.time-12 +' p.m.'): (appointment.time +' a.m.')}</div>
                            <button type='button' className='nav' onClick={event => handleAppointmentNav(event, appointment._id)}><MdKeyboardArrowRight /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
  )
}
