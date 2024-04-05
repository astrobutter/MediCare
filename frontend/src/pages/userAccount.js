import React, { useState, useEffect} from 'react'
import { useCookies } from "react-cookie";
import { UserAuth } from '../context/AuthContext'
import { toast, axios, motion, dayjs } from '../components/NpmPackages';
import { MdKeyboardArrowRight } from "../components/ReactIcons";
import '../css/userAccount.css'
import 'react-toastify/dist/ReactToastify.css';

export const UserAccount = () => {
    const { userID, user, logout, month, fetchCurrentUser, fetchAppointments, userAppointments, navigate } = UserAuth();
    const [currUserAppointments, setCurrUserAppointments] = useState([null]);
    const [cookies, setCookies] = useCookies(["access_token"]);

    const handleAppointmentNav = (event, _id) => {
        event.stopPropagation();
        navigate(`/user/appointment/${_id}`);
    }
    const handleProfileNav = async (event, doc) => {
        event.stopPropagation();
        let response;
            try {
              response = await axios.get(`http://localhost:3001/doc/account/${doc}`, { headers: { authorization: cookies.access_token }});
              console.log('response -', response);
            } catch (err) { console.log(err) }
        navigate(`/doc/${response.data.username}`);
    }
    const populateAppointments =  () => {
        userAppointments.map( async ( appointment, idx) => {
            let populatedAppointment= [];
            console.log('result.data -');
            try {
                const result = await axios.get(`http://localhost:3001/doc/populate/${appointment.doc}`);
                // const result = await axios.get(`http://localhost:3001/doc/populate`, { appointment });
                console.log('result.data -', result.data);
                populatedAppointment.push({...appointment, ...result.data[0]});
                // populatedAppointment.push({});
                userAppointments[idx]= populatedAppointment;
                // userAppointments[idx].push(result.data);
                // console.log('userAppointments[idx] -', userAppointments[idx]);

            } catch (err) { console.log(err) }
        })
        setCurrUserAppointments(userAppointments);
    }
    useEffect(() => {
        fetchCurrentUser();
        fetchAppointments();
    }, []);
    // useEffect(() => {
    //   console.log('UEuser -', user);
    // }, [user]);
    useEffect(() => {
      console.log('UEuserAppointments -', userAppointments);
    //   populateAppointments();
    }, [userAppointments]);
    useEffect(() => {
      console.log('UEcurruserAppointments -', currUserAppointments);
    }, [currUserAppointments]);

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
                        <div>Doctor Id</div>
                        <div>Appointment Date</div>
                        <div>Appointment Time</div>
                    </div>
                    { userAppointments?.map((appointment, index) => (
                        <div key={index} className='row'>
                            <button className='username' onClick={event => handleProfileNav(event, appointment.doc)}>{appointment?.doc}</button>
                            {/* <div className='username'>{appointment?.name}</div> */}
                            <div>{month[dayjs(appointment?.date).format('MM')-'0']} {dayjs(appointment?.date).format('DD')-'0' -1}, {dayjs(appointment?.date).format('YYYY')}</div>
                            <div>{appointment?.time>11? (appointment?.time-12 +' p.m.'): (appointment?.time +' a.m.')}</div>
                            {/* <button type='button' className='nav' onClick={event => handleAppointmentNav(event, appointment?._id)}><MdKeyboardArrowRight /></button> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
  )
}
