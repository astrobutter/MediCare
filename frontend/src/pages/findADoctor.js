import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import axios from 'axios';
import { UserAuth } from "../context/AuthContext";
import { DocCard } from '../components/DocCard';
import '../css/find-a-doctor.css'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CiSearch } from "react-icons/ci";

export const Find_a_doctor = () => {
  const { totalPages, setTotalPages, doctorSpeciality, speciality, setSpeciality } = UserAuth();

  const [ name, setName] = useState( ) ;
  const [currentPage, setCurrentPage] = useState(1);
  const [ doctors, setDoctors ] = useState();

  const handleFirstPage = () => { setCurrentPage(1); };
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage- 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handleLastPage = () => { setCurrentPage(totalPages); };

  const fetchDoctors = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3001/doc/${speciality}?page=${page}`);
      // console.log(response)
      const { doctor, totalPages } = response.data;
      setDoctors(doctor);
      setTotalPages(totalPages);
      console.log('FD -', doctors);
    } catch (err) { console.log(err) }
  };

  useEffect(() => {
    // console.log(doctors)
  }, [doctors])
{/*
  useEffect(() => {
    // fetchRecipes(currentPage);
    // { userID && fetchSavedRecipesID(); }
    // console.log(savedRecipesID);
  // }, [recipes, savedRecipesID]);
  }, [ currentPage]);
*/}

  // const [inputValue, setInputValue] = React.useState('');
  return (
    <motion.div className='find-a-doctor page' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
      <div className='autocomplete-tab'>
      <Autocomplete className='tab-box w-1/4' disablePortal id="combo-box-demo"
        value={speciality} options={doctorSpeciality} onChange={(event, newValue) => setSpeciality(newValue) }
        renderInput={(params) => <TextField {...params} label="Speciality" />}
        sx={{ 
          fieldset: {
            border: "2px solid rgb(0, 64, 255)",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            onhover: "2px solid rgb(0, 64, 255)",
          }, width: 390 
        }}
      />
      <TextField id="outlined-password-input" label="Name" type="text" autoComplete="current-password" value={name}
        onChange={(event, newValue) => setName(newValue) }
        sx={{ 
          fieldset: {
            border: "2px solid rgb(0, 64, 255)",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
          },
          width: 450 
        }}
      />

      <button onClick={() => fetchDoctors(currentPage)} className='search-button'><CiSearch /></button>
      </div>

      <div className='doc-card-container max-width'>
        { doctors?.map((doctor,index)=>(
          <DocCard key={index} doc={doctor} />
        ))}
        {/* <DocCard />
        <DocCard />
        <DocCard />
        <DocCard /> */}
      </div>
    </motion.div>
  )
}