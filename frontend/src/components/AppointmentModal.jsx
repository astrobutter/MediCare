import React, { useEffect } from 'react';
import { useCookies } from "react-cookie";
import { UserAuth } from "../context/AuthContext";
import { axios, dayjs, toast} from './NpmPackages';
import { IoMdClose } from "./ReactIcons";
let today= new Date();

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const AppointmentModal = ({ open, onClose, appointment, setProfileDoc, profileDoc, updateSlots }) => {
  const { isDoctor, userID, navigate, speciality } = UserAuth();
  const [cookies, _] = useCookies(["access_token"]);

  const makePayment = async(event) => {
    event.preventDefault();
    const body = { userID, appointment};
    try {
      const headers = { "Content-Type":"application/json"}
      const response = await fetch(`http://localhost:3001/create-checkout-session/${profileDoc._id}`, {
        method:"POST", headers:headers, body:JSON.stringify(body)
      })
      const data = await response.json();
      console.log('data = await response', data);
      if( data.session.url){ window.location.href = data.session.url; }
    } catch (error) { console.log(error); }
  }
  const handleYes = async (event) => {
    try {
      event.stopPropagation();
      if( userID ){
          profileDoc.schedules?.map( (schedule, index) => {
            if( schedule.date === appointment.date ){
              schedule.timings.map( (timing, index2) => {
                if( timing.time===appointment.time){
                  let schedules = profileDoc.schedules;
                  let slots= schedules[index].timings[index2].slots-'0';
                  slots-=1;
                  schedules[index].timings[index2].slots= slots;
                  setProfileDoc({ ...profileDoc, schedules});
                }})
          }})
        makePayment(event);}
    } catch (error) { console.log(error) }
  }
  const handleNo = (event) => { event.stopPropagation(); onClose(); }
  useEffect(()=>{
    updateSlots();
  },[profileDoc])

  if (!open) return null;

  return (
    <div onClick={onClose} className='overlay max-width'>
      <div className='modalContainer' onClick={(e) => { e.stopPropagation(); }}>
        <p className='closeBtn' onClick={onClose}><IoMdClose /></p>
        <div className='modal-wrapper'>
          <div className='modal-header'>Make an appointment for "{speciality}" on {month[dayjs(appointment.date).format('MM')-'0'-1]} {dayjs(appointment.date).format('DD')-'0'}, {appointment.time>11? (appointment.time-12 +' p.m.'): (appointment.time +' a.m.')}?</div>
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