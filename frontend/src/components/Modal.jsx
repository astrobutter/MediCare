import React, { useEffect, useState } from 'react';
import { UserAuth } from "../context/AuthContext";
import { useCookies } from "react-cookie";
import { axios, Calendar, TimePicker, moment, dayjs, toast } from './NpmPackages'
import { FaPlusCircle, IoMdClose } from './ReactIcons';
import 'react-calendar/dist/Calendar.css';
import 'rc-time-picker/assets/index.css';
const format = 'h a';
const now = moment().hour(0).minute(60);

const Modal = ({ open, onClose }) => {
  const [cookies, _] = useCookies(["access_token"]);

  const { doc, setDoc} = UserAuth();
  const [ schedules, setSchedules] = useState({
    date: new Date(),
    timings: [],
  })
  const [ time, setTime] = useState(now);
  const [ slotCount, setSlotCount] = useState();
  const maxdate = new Date(Date.now() + 12096e5);
  useEffect(()=>{
    console.log('UE schedules-', schedules);
  }, [schedules]);
  // useEffect(()=>{
  //   console.log('UE time', time);
  // }, [time]);

  if (!open) return null;

  const dateChange = (event) => {
    doc.schedules?.map((schedule)=>{
      if((dayjs(schedule.date).format('DD')-'0') === event.getDate()){
        toast.error(`Similar Schedule exits for ${dayjs(schedule.date).format('DD-MM')}.`, { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark"});
      }
    });
    setSchedules({ ...schedules, ['date']:event}
  )
  };
  const timeChange = (event) => setTime(event);
  const addTimings = (event) => {
    if( schedules.timings ){
      const oldTiming = schedules.timings;
      oldTiming.push({
        time: time._d.getHours(),
        slots: slotCount,
      })
      setSchedules({...schedules, ['timings']:oldTiming});
    }
    else{
      const timings = [{
        time: time._d.getHours(),
        slots: slotCount,
      }]
      setSchedules({...schedules, timings});
    }
  }
  const handleSchedule = async (event) => {
    event.preventDefault();
    try {
      if( doc.schedules ){
        let oldSchedules = doc.schedules;
        oldSchedules.push(schedules);
        setDoc({ ...doc, schedules : oldSchedules})
      }
      else{
        setDoc({ ...doc, schedules })
      }
      const result = await axios.put("http://localhost:3001/doc", { ...doc }, { headers: { authorization: cookies.access_token }});
      console.log('axios -',result);
      setSchedules({ ...schedules, timings:null,})
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
        <Calendar className='calendar' onChange={(event)=>{dateChange(event)}} value={schedules.date} minDate={new Date()} maxDate={maxdate}/>
        </div>
        <div className='left-modal'>
          <div className='time-container'>
          { schedules.timings?.map( (schedule,index) => 
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
