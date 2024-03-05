import React, { useState, useEffect} from 'react'
import { UserAuth } from '../context/AuthContext'
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom'
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { useGetUserID } from '../hooks/useGetUserID';
import Rating from '@mui/material/Rating';
import { ReviewCard } from '../components/ReviewCard';
import AppointmentModal from '../components/AppointmentModal'
import dayjs  from 'dayjs';
import 'react-toastify/dist/ReactToastify.css';
import '../css/profile.css'
import '../css/appointmentModal.css'

export const Profile = () => {
  const { isDoctor, user, doc } = UserAuth();
  const params = useParams()
  const userID = useGetUserID();
  const [ profileDoc, setProfileDoc] = useState({
    name: "",
    dob:"",
    gender: "",
    email: "",
    imageUrl: "",
    educations: [],
    experiences: [],
    specializations: [],
    schedules: [],
    about: "",
    username: "",
    password: "",
  });
  const [ reviews, setReviews] = useState([]);
  const [ userReview, setUserReview] = useState({
    user : '',
    text : '',
    doc : params.username,
    rating: 5,
  });
  const [openModal, setOpenModal] = useState(false);
  const [appointment, setAppointment] = useState();
  let sum=0;
  let today= new Date();

  const fetchComments = async () =>{
    try {
      const response = await axios.get(`http://localhost:3001/doc/reviews/${params.username}`);
      setReviews(response.data.myReviews);
    } catch (err) { console.log(err) }
  }
  const getUserName = () => {
    if( isDoctor === 'true' ) {
      setUserReview(review => ({...review, user : setProfileDoc.username}))
    }else{ 
      setUserReview(review => ({...review, user : user.username}))
    }
  }
  const fetchDocProfile = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3001/doc/profile/${username}`);
      setProfileDoc(response.data[0]);
    } catch (err) { console.log(err) }
  };
  const updateSlots = async () => {
    try {
      const result = await axios.put(`http://localhost:3001/doc/appointment/updates`, { ...profileDoc });
      console.log('result -', result);
    } catch (err) { console.log(err) }
  }
{/*
  useEffect(() => {
    // console.log('UE UR -', userReview)
  }, [userReview])
  useEffect(() => {
    console.log('reviews -', reviews);
    // console.log('UE UR -', userReview)
  }, [reviews])
*/}
  const handleAppointment = (event, date, time, index, index2) => {
    event.stopPropagation();
    setAppointment({
      user:  userID,
      doc: params.username,
      date: date,
      time: time,
    })
    setOpenModal(true);
  }
  useEffect(() => {
    getUserName();
  }, [user])
  useEffect(()=>{
    console.log(appointment);
  }, ['appointment -', appointment])
  useEffect(()=>{
    console.log('UE profileDoc -', profileDoc);
  }, [profileDoc])
  useEffect(() => {
    // console.log('UE isDoc', isDoctor);
    // console.log('isDoc', isDoctor);
    fetchDocProfile(params.username);
    fetchComments();
  }, []);

  const handleSubmitReviews = async (event) => {
    try {
      if(userID){
        await axios.post("http://localhost:3001/doc/review", { ...userReview });
        toast.success('Review posted', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark"});
        fetchComments();
        setUserReview(review => ({...review, text : ''}))
      }
      else{
        toast.error(`You're not logged in.`, { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark"});
      }
    } catch (err) { console.log(err) }
  }
  return (
    <motion.div className='profile page' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
      <div className="profile max-width">
        <div className='header-section'>
          <img src={profileDoc.imageUrl} />
          <div className='info'>
            <div className='first'>
              Dr. {profileDoc.name} <div className='gender'>({profileDoc.gender})</div>
            </div>
            <div className='second'>Email: {profileDoc.email}</div>
          </div>
          <div className='booking-container'>
            <p>Price:</p>
            <button className='book-button'>Book Appointment</button>
          </div>
        </div>
        <div className='profile-section'>
          <p className='section-tag'>Appointment Slots</p>
          <div className='section-content schedules-container'>
          { profileDoc.schedules?.map((schedule,index)=>(
            ((dayjs(schedule.date).format('DD')-'0'-1>= today.getDate()) && dayjs(schedule.date).format('MM')-'0'>= today.getMonth()+1) 
            && (
              <div className='schedule-wrap'>
                <div className='schedule-date' key={index}>{dayjs(schedule.date).format('DD')-'0' -1} / {dayjs(schedule.date).format('MM')} / {dayjs(schedule.date).format('YYYY')}</div>
                <div className='schedule-timings'>
                {schedule.timings?.map((timing,index2)=>(
                  <div className='schedule-time' key={index2} onClick={event => handleAppointment( event, schedule.date, timing.time, index, index2)}>
                    {timing.time>11? (timing.time-12 +'p.m.'): (timing.time +'a.m.')} - ({timing.slots})
                  </div>
                ))}
                </div>
              </div>
            )
          ))}
          <AppointmentModal open={openModal} onClose={() => setOpenModal(false)} appointment={appointment} setProfileDoc={setProfileDoc} profileDoc={profileDoc} updateSlots={updateSlots}/>
          </div>
        </div>
        <div className='profile-section'>
          <p className='section-tag'>Specializations</p>
          <div className='section-content specialization-container'>
          {profileDoc.specializations.map((specialization, index) => <p key={index}>{specialization}</p>)}
          </div>
        </div>
        <div className='profile-section'>
          <p className='section-tag'>About</p>
          <div className='section-content'>{profileDoc.about}</div>
        </div>
        <div className='profile-section'>
          <p className='section-tag'>Educations</p>
          <div className='section-content education-container'>{profileDoc.educations?.map((education, index) => <p key={index}>{education.college}, {education.year}</p>)}</div>
        </div>
        <div className='profile-section'>
          <p className='section-tag'>Experiences</p>
          <div className='section-content education-container'>{profileDoc.experiences?.map((experience, index) => <p key={index}>{experience.place}, {experience.from} to {experience.to}</p>)}</div>
        </div>
        <div className='profile-section'>
          <p className='section-tag'>Reviews</p>
          <div className='section-content reviews-wrapper'>
            <div className='review-box'>
              <Rating value={userReview.rating} onChange={(event, newValue) => {setUserReview(review => ({ ...review, rating:newValue}))}} name="simple-controlled"  />
              <div className='review-text'>
                <textarea value={userReview.text} onChange={(e)=>{setUserReview(review => ({...review, text : e.target.value}))}} id="name" name="text" placeholder='Add your comment' role="textbox" rows={2} />
                <button type='submit' onClick={handleSubmitReviews}> Post </button>
              </div>
            </div>
            <div className='reviews-container'>{reviews.map((review, index) => (<ReviewCard review={review} key={index}/>))}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
