import React, { useEffect } from 'react';
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCookies } from "react-cookie";

import Calendar from 'react-calendar';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { FaPlusCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import 'react-calendar/dist/Calendar.css';
import 'rc-time-picker/assets/index.css';
const format = 'h a';
const now = moment().hour(0).minute(60);

const Modal = ({ open, onClose }) => {
  const [cookies, _] = useCookies(["access_token"]);

  const { user, setUser} = UserAuth();
  const [ schedules, setSchedules] = useState({
    date: new Date(),
    timings: [],
  })
  const [ time, setTime] = useState(now);
  const [ slotCount, setSlotCount] = useState();
  // useEffect(()=>{
  //   console.log('UE', schedules);
  // }, [schedules]);
  // useEffect(()=>{
  //   console.log('UE time', time);
  // }, [time]);

  if (!open) return null;

  const dateChange = (event) => {
    console.log(event.getDate());
    user.schedules?.map((schedule)=>{
      if((Date(schedule.date).split(' ')[2]-'0') === event.getDate()){
        toast.error('Similar Schedule exits.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark"});
      }
    });
  setSchedules({ ...schedules, ['date']:event}
  )
  };
  const timeChange = (event) => setTime(event);
  // console.log('TC', event._d.getHours());
  const addTimings = (event) => {
    const oldTiming = schedules.timings;
    oldTiming.push({
      time: time._d.getHours(),
      slots: slotCount,
    })
    setSchedules({...schedules, ['timings']:oldTiming});
  }
  const handleSchedule = async (event) => {
    event.preventDefault();
    try {
      const oldSchedules = user.schedules;
      oldSchedules.push(schedules);
      setUser({ ...user, schedules : oldSchedules})
      const result = await axios.put("http://localhost:3001/doc", { ...user }, { headers: { authorization: cookies.access_token }});
      console.log('axios -',result);
      toast.success('Changes Saved.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
      });
      onClose();
    } catch (error) { console.error(error) }

  }

  return (
    <div onClick={onClose} className='overlay max-width'>
      <div className='modalContainer' onClick={(e) => { e.stopPropagation(); }}>
        <p className='closeBtn' onClick={onClose}><IoMdClose /></p>
        <div>
        <Calendar className='calendar' onChange={(event)=>{dateChange(event)}} value={schedules.date} minDate={new Date()}
        />
        </div>
        <div className='left-modal'>
          <div className='time-container'>
          { schedules.timings.map( (schedule,index) => 
            <div key={index} className='time-wrap'>
              {schedule.time>11? (schedule.time-12 +'p.m.'): (schedule.time +'a.m.')} - ({schedule.slots})
            </div> )}
          </div>
          <div className='controls'>
            <div className='control-column'>
              <TimePicker className="xxx" showMinute={false} showSecond={false}use12Hours inputReadOnly format={format}
                value={time} onChange={(event)=>{ timeChange(event)}} />
              <input value={slotCount} onChange={(event) => (setSlotCount(event.target.value))} placeholder='No. of slots' require/>
              <button className='addButton' onClick={(event)=>addTimings(event)}>
              <FaPlusCircle />
              </button>
            </div>
            <button className='save-button' type='submit' onClick={(event) => handleSchedule(event)}>Save Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
