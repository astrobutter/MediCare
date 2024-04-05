import React, { useEffect } from 'react'
import { motion, axios } from '../components/NpmPackages';
import { UserAuth } from '../context/AuthContext'
import { CiCircleCheck, AiOutlineFileDone } from "../components/ReactIcons";
import { Link, useNavigate } from "react-router-dom";
import '../css/paymentSuccess.css'

export const PaymentSuccess = () => {
  const { isDoctor, userID, speciality } = UserAuth();
  const navigate = useNavigate();
  
  return (
    <motion.div className='page payment' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
      <div className='payment-content'>
        <div className='column'>
          <CiCircleCheck />
          <h1>Payment  Successful!</h1>
        </div>
        <div className='column'>
          <AiOutlineFileDone />
          <h1>Appointment Successfully Booked.</h1>
        </div>
        <div className='column directs'>
          <div className="account-direct"><Link to={'/'}>Home page!</Link></div>
          <button type="button" className="home-direct" onClick={() => navigate( isDoctor==='true' ? '/doctor/account' : '/account')}>Go to my Account!</button>
        </div>
      </div>
    </motion.div>
  )
}
