import React, { useEffect, useState } from 'react';
import { UserAuth } from "../context/AuthContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import dayjs  from 'dayjs';
let today= new Date();

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const AppointmentModal = ({ open, onClose, appointment, setProfileDoc, profileDoc, updateSlots }) => {
  const { isDoctor, userID, navigate, speciality } = UserAuth();
  const handleYes = async (event) => {
    try {
      event.stopPropagation();
      // console.log('MODAL -', appointment);
      if( userID ){
        const response = await axios.post(`http://localhost:3001/doc/appointment`, { ...appointment });
        console.log("RESPONSE -", response);
        toast.success('Appointment Booked.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark"});
        if( response.data ){
          profileDoc.schedules?.map( (schedule, index) => {
            // console.log(schedule.date, appointment.date);
            if( schedule.date === appointment.date ){
              // console.log('Comp -', schedule.date, appointment.date);
              schedule.timings.map( (timing, index2) => {
                if( timing.time===appointment.time){
                  // console.log('Comp time-', timing.time, appointment.time);
                  let schedules = profileDoc.schedules;
                  let slots= schedules[index].timings[index2].slots-'0';
                  slots-=1;
                  schedules[index].timings[index2].slots= slots;
                  setProfileDoc({ ...profileDoc, schedules});
                }
              })
            }
          })
        }
      }
      updateSlots();
      onClose();
      navigate( isDoctor==='true' ? '/doctor/account' : '/account');
    } catch (error) { console.log(error) }
  }
  const handleNo = (event) => {
    event.stopPropagation();
    onClose();
  }

  if (!open) return null;

  return (
    <div onClick={onClose} className='overlay max-width'>
      <div className='modalContainer' onClick={(e) => { e.stopPropagation(); }}>
        <p className='closeBtn' onClick={onClose}><IoMdClose /></p>
        <div className='modal-wrapper'>
          <div className='modal-header'>Make an appointment for "{speciality}" on {month[dayjs(appointment.date).format('MM')-'0']} {dayjs(appointment.date).format('DD')-'0' -1}, {appointment.time>11? (appointment.time-12 +' p.m.'): (appointment.time +' a.m.')}?</div>
          <div className='modal-buttons'>
            <button className='modal-yes' onClick={event => handleYes(event)}>Yes</button>
            <button className='modal-no' onClick={event => handleNo(event)}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;