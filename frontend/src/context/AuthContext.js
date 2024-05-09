import { createContext, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetUserID } from '../hooks/useGetUserID';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const params = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    imageUrl: '',
    username: "",
    password: "",
    gender: "other",
    dob: "",
  });
  const [ doc, setDoc] = useState({
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
    price: 0,
  });
  const [ isDoctor, setIsDoctor ] = useState('false');
  const [totalPages, setTotalPages] = useState(0);
  const [appointment, setAppointment] = useState({
    date: '',
    time: ''
  })
  const [userAppointments, setUserAppointments] = useState([]);
  const [userAppointment, setUserAppointment] = useState();
  const [docAppointment, setDocAppointment] = useState([]);
  const [searchedForum, setSearchedForum] = useState([])
  const [posts, setPosts] = useState([]);

  const doctorSpeciality = [ 'Anatomical Pathology', 'Anesthesiology', 'Ayurveda', 'Cardiology', 'Cardiovascular & Thoracic Surgery', 'Clinical Immunology/Allergy','Critical Care Medicine','Dentistry','Dermatology','Diabetology','Diagnostic Radiology','Diet & Nutrition','Ear, Nose, Throat','Emergency Medicine','Endocrinology and Metabolism','Family Medicine','Gastroenterology','General Physician','General Internal Medicine','General Surgery','General/Clinical Pathology','Geriatric Medicine','Hematology','Homeopathy','Medical Biochemistry','Medical Genetics','Medical Microbiology and Infectious Diseases','Medical Oncology','Nephrology','Neurology','Neurosurgery','Nuclear Medicine','Obstetrics/Gynecology','Occupational Medicine','Ophthalmology','Orthopedic','Orthopedic Surgery','Otolaryngology','Pediatrics','Physical Medicine and Rehabilitation (PM & R)','Physiotherapy','Plastic Surgery','Psychiatry','Psychology','Public Health and Preventive Medicine (PhPm)','Pulmonology','Radiation Oncology','Respirology','Rheumatology','Sexology','Urology','Veterinary',];
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const [ speciality, setSpeciality] = useState( doctorSpeciality[17]);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
  };
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/user/${userID}`, { headers: { authorization: cookies.access_token }});
      setUser(response.data);
    } catch (err) { console.log(err) }
  };
  const fetchCurrentDoc = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/doc/account/${userID}`, { headers: { authorization: cookies.access_token }});
      setDoc(response.data);
    } catch (err) { console.log(err) }
  };
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/appointments/user/${userID}`, { headers: { authorization: cookies.access_token } });
      setUserAppointments(response.data);
    } catch (err) { console.log(err) }
  }
  const fetchCurrentAppointment = async (_id) => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/appointment/user/${_id}`, { headers: { authorization: cookies.access_token } });
      setUserAppointment(response.data);
    } catch (err) { console.log(err) }
  }
  const fetchCurrentDocAppointment = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/appointment/doc/${userID}`, { headers: { authorization: cookies.access_token } });
      setDocAppointment(response.data);
    } catch (err) { console.log(err) }
  }
  const search  = async (search) => {
    if (search){
      try {
        const response = await axios.post(`http://localhost:3001/forum/search`, {search});
        console.log('setSearchedForum :', response.data);
        setSearchedForum(response.data);
        navigate("/forum/search");
      } catch (err) { console.log(err) }
    }
  }
  const fetchPosts = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3001/forum?page=${page}`);
      const { posts, totalPages } = response.data;
      setPosts(posts);
      setTotalPages(totalPages);
    } catch (err) { console.log(err) }
  };
  return (
    <UserContext.Provider value={{
      userID,
      navigate,
      user,
      setUser,
      doc,
      setDoc,
      isDoctor,
      setIsDoctor,
      speciality,
      setSpeciality,
      appointment,
      setAppointment,
      userAppointments,
      setUserAppointments,
      userAppointment,
      setUserAppointment,
      docAppointment,
      setDocAppointment,
      searchedForum,
      setSearchedForum,
      doctorSpeciality,
      fetchCurrentUser,
      fetchCurrentDoc,
      fetchAppointments,
      fetchCurrentAppointment,
      fetchCurrentDocAppointment,
      logout,
      month,
      totalPages,
      setTotalPages,
      search,
      fetchPosts,
      posts,
      setPosts,
      totalPages,
      setTotalPages,

    }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};