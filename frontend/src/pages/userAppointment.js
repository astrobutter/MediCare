import React, { useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useParams } from 'react-router-dom'

export const UserAppointment = () => {
  const params = useParams()
    const { userID, user, logout, fetchCurrentUser, fetchAppointments, userAppointment, fetchCurrentAppointment } = UserAuth();
    useEffect(()=>{
        fetchCurrentAppointment(params._id);
    }, [])
  return (
    <div>userAppointment</div>
  )
}
