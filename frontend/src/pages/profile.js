import React, { useState, useEffect} from 'react'
import { UserAuth } from '../context/AuthContext'
import axios from 'axios';
import { useCookies } from "react-cookie";
import { Link, useParams } from 'react-router-dom'
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetUserID } from '../hooks/useGetUserID';
import '../css/profile.css'

export const Profile = () => {
  const { isDoctor, user, setUser } = UserAuth();
  const params = useParams()
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [ reviews, setReviews] = useState([]);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/doc/profile/${params.username}`);
      // console.log(response.data[0]);
      setUser(response.data[0]);
    } catch (err) { console.log(err) }
  };

  const fetchComments = async () =>{
    try {
      const response = await axios.get(`http://localhost:3001/doc/reviews/${user.username}`);
      setReviews(response.data.myComments);
      // {userID && getUserName(userID);}
      // getUserName(userID);
    } catch (err) { console.log(err) }
  }
  useEffect(() => {
    console.log('UE -',user)
  }, [user])

  useEffect(() => {
    fetchCurrentUser();
    fetchComments();
  }, []);
  return (
    <motion.div className='profile page' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
      <div className="profile max-width">
        <div className='header-section'>
          <img src={user.imageUrl} />
          <div className='info'>
            <div className='first'>
              Dr. {user.name} 
              <div className='gender'>({user.gender})</div>
            </div>
            <div className='second'>Email: {user.email}</div>
          </div>
          <div className='booking-container'>
            <p>Price:</p>
            <button className='book-button'>Book Appointment</button>
          </div>
        </div>

        <div className='profile-section'>
          <p className='section-tag'>Specializations</p>
          <div className='section-content specialization-container'>
          {user.specializations.map((specialization, index) => <p key={index}>{specialization}</p>)}
          </div>
        </div>

        <div className='profile-section'>
          <p className='section-tag'>About</p>
          <div className='section-content'>{user.about}</div>
        </div>

        <div className='profile-section'>
          <p className='section-tag'>Educations</p>
          <div className='section-content education-container'>
          {user.educations?.map((education, index) => <p key={index}>{education.college}, {education.year}</p>)}
          </div>
        </div>
        <div className='profile-section'>
          <p className='section-tag'>experiences</p>
          <div className='section-content education-container'>
          {user.experiences?.map((experience, index) => <p key={index}>{experience.place}, {experience.from} to {experience.to}</p>)}
          </div>
        </div>
        <div className='profile-section'>
          <p className='section-tag'>Appointment Slots</p>
          <div className='section-content schedules-container'>
          { user.schedules?.map((schedule,index)=>(
            <div className='schedule-wrap'>
              <div className='schedule-date' key={index}>
                { Date(schedule.date).split(' ')[0]}, {Date(schedule.date).split(' ')[1]} {Date(schedule.date).split(' ')[2]}, {Date(schedule.date).split(' ')[3]}
              </div>
              <div className='schedule-timings'>
              {schedule.timings?.map((timing,index2)=>(
                <p className='schedule-time' key={index2}>
                  {timing.time>11? (timing.time-12 +'p.m.'): (timing.time +'a.m.')} - ({timing.slots})
                </p>
              ))}
              </div>
            </div>
            // </div>
          ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
