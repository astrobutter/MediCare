import React, { useState, useEffect } from 'react'
import { UserAuth } from "../context/AuthContext";
import '../css/find-a-doctor.css'
import { DocCard } from '../components/Index';
import { motion, axios, TextField, Autocomplete, styled, ArrowForwardIosSharpIcon, MuiAccordion, MuiAccordionSummary, MuiAccordionDetails, Typography, ExpandMoreIcon} from '../components/NpmPackages'
import { CiSearch } from "../components/ReactIcons";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />))(({ theme }) => ({border: `1px solid ${theme.palette.divider}`,'&:not(:last-child)': { borderBottom: 0 },'&::before': {display: 'none'},}
));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />))(({ theme }) => ({ backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)', flexDirection: 'row-reverse', '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(90deg)', }, '& .MuiAccordionSummary-content': { marginLeft: theme.spacing(1), },}
));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({ padding: theme.spacing(2), borderTop: '1px solid rgba(0, 0, 0, .125)',})
);
export const Find_a_doctor = () => {
  const { totalPages, setTotalPages, doctorSpeciality, speciality, setSpeciality } = UserAuth();

  const [ name, setName] = useState("") ;
  const [currentPage, setCurrentPage] = useState(1);
  const [ doctors, setDoctors ] = useState();

  const handleFirstPage = () => { setCurrentPage(1); };
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage- 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handleLastPage = () => { setCurrentPage(totalPages); };

  const fetchDoctors = async (page) => {
    console.log("FD-", name);
    try {
      const response = await axios.get(`http://localhost:3001/doc/${speciality}?page=${page}`);
      const { doctor, totalPages } = response.data;
      setDoctors(doctor);
      setTotalPages(totalPages);
    } catch (err) { console.log(err) }
  };

  useEffect(()=>{
    console.log('UE name-', name);
  },[name])

  return (
    <motion.div className='find-a-doctor page' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
      <div className='autocomplete-tab'>
        <Autocomplete className='tab-box w-1/4' disablePortal id="combo-box-demo" value={speciality} options={doctorSpeciality} onChange={(event, newValue) => setSpeciality(newValue) } renderInput={(params) => <TextField {...params} label="Speciality" />} sx={{ fieldset: {border: "2px solid rgb(0, 64, 255)",borderRadius: "5px",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",onhover: "2px solid rgb(0, 64, 255)",}, width: 390 }} />
        <TextField id="outlined-password-input" label="Name" type="text" autoComplete="current-password" value={name} onChange={(event, newValue) => setName(newValue) } sx={{ fieldset: {border: "2px solid rgb(0, 64, 255)",borderRadius: "5px",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"},width: 450 }} />
        <button onClick={() => fetchDoctors(currentPage)} className='search-button'><CiSearch /></button>
      </div>

      {
        doctors
        ?
        <div className='doc-card-container max-width'>
          { doctors.map((doctor,index)=>(<DocCard key={index} doc={doctor} />))}
        </div>
        :
        <div className='no-doc'>
          <div className='max-width'>
          <div className='faq'>
            <div className='section-text-box'>
              <h3>FAQ's</h3>
              <div className='section-sub-text'>Mostly asked questions regarding the platform</div>
            </div>
            <div className='accordion'>
            <Accordion className='accordion-style' >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" className='accordionsummary-style'><Typography className='typography-style'>Lorem ipsum dolor sit amet-1?</Typography></AccordionSummary>
              <AccordionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</AccordionDetails>
            </Accordion>
            <Accordion className='accordion-style'>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header"  className='accordionsummary-style'><Typography className='typography-style'>Lorem ipsum dolor sit amet-2?</Typography></AccordionSummary>
              <AccordionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</AccordionDetails>
            </Accordion>
            <Accordion className='accordion-style'>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header"  className='accordionsummary-style'><Typography className='typography-style'>Lorem ipsum dolor sit amet-3?</Typography></AccordionSummary>
              <AccordionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</AccordionDetails>
            </Accordion>
            <Accordion className='accordion-style'>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4-content" id="panel4-header"  className='accordionsummary-style'><Typography className='typography-style'>Lorem ipsum dolor sit amet-4?</Typography></AccordionSummary>
              <AccordionDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</AccordionDetails>
            </Accordion>
            </div>
          </div>
          </div>
        </div>
      }
    </motion.div>
  )
}