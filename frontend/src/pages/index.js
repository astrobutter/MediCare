import React from 'react'
import '../css/index.css'
import { useGetUserID } from '../hooks/useGetUserID';
import { FaArrowRightLong } from "../components/ReactIcons";
import { motion, styled, ArrowForwardIosSharpIcon, MuiAccordion, MuiAccordionSummary, MuiAccordionDetails, Typography, ExpandMoreIcon } from "../components/NpmPackages";

import hero_1 from "../assets/hero-1.png";
import hero_2 from "../assets/hero-2.png";
import hero_3 from "../assets/hero-3.png";
import service_1 from "../assets/service-1.jpg"
import service_2 from "../assets/service-2.jpg"
import forum_1 from "../assets/forum-1.jpeg"
import forum_2 from "../assets/forum-2.jpg"
import find from "../assets/find.png"

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />))(({ theme }) => ({border: `1px solid ${theme.palette.divider}`,'&:not(:last-child)': { borderBottom: 0 },'&::before': {display: 'none'},}
));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />))(({ theme }) => ({ backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)', flexDirection: 'row-reverse', '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(90deg)', }, '& .MuiAccordionSummary-content': { marginLeft: theme.spacing(1), },}
));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({ padding: theme.spacing(2), borderTop: '1px solid rgba(0, 0, 0, .125)',})
);

const Index = () => {
  const userID = useGetUserID();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <motion.div className='page' initial={{opacity:0, x:'100%'}} animate={{opacity:1, x:'0%'}} exit={{opacity:0 , x:'100%'}} >
    <div className='hero max-width'>
      <div className='hero-text-box'>
        <h1>Smart & quickest way for an OPD appointment</h1>
        <div className='hero-sub-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        <button type='button' >Book an Appointment  <FaArrowRightLong /></button>
      </div>
      <div className='hero-img-box'>
        <img src={hero_1} alt="" />
        <div className='hero-img-row-2'>
          <img src={hero_2} alt="" />
          <img src={hero_3} alt="" />
        </div>
      </div>
    </div>
    <div className='section service '>
      <div className='max-width'>
      <div className='section-text-box'>
        <h3>Best in-class Services</h3>
        <div className='section-sub-text'>We provide Hassel free service of OPD appointment for pateints, reducing the load of scheduling appointment</div>
      </div>
      <div className='section-content'>
        <div className='box'>
          <img src={service_1} alt='' />
          <div className='box-heading'>Schedule Appointment</div>
          <div className='box-text'>Schedule the appointment that suits you best</div>
          <button className='box-button'>Find an Appointment <FaArrowRightLong /></button>
        </div>
        <div className='box'>
          <img src={service_2} alt='' />
          <div className='box-heading'>Find Doctors</div>
          <div className='box-text'>Find doctors that you feel suits you best</div>
          <button className='box-button'>Find Doctors <FaArrowRightLong /></button>
        </div>
      </div>
      </div>
    </div>
    <div className='section community-forum'>
      <div className='max-width'>
      <div className='section-text-box'>
        <h3>Join Community Forums</h3>
        <div className='section-sub-text'>Find tips and health guidelines from the trusted doctors and join in with other users on the platform.</div>
      </div>
      <div className='section-content'>
        <div className='box'>
          <img src={forum_1} alt='' />
          <div className='box-heading'><a href='#' >Important facts about sugar consumption.</a></div>
        </div>
        <div className='box'>
          <img src={forum_2} alt='' />
          <div className='box-heading'><a href='#' >Benefits of having a vegan diet.</a></div>
        </div>
      </div>
      </div>
    </div>
    <div className='hero find max-width'>
      <div className='hero-img-box'>
        <img src={find} alt="" />
      </div>
      <div className='hero-text-box'>
        <h1>Find experienced doctors across all speciality</h1>
        <div className='hero-sub-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        <button type='button'>Neurologist <FaArrowRightLong /></button>
      </div>
    </div>
    <div className='section faq'>
      <div className='max-width'>
      <div className='section-text-box'>
        <h3>FAQ's</h3>
        <div className='section-sub-text'>Mostly asked questions regarding the platform</div>
      </div>
      <div className='accordion'>
      <Accordion className='accordion-style' >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" className='accordionsummary-style'><Typography className='typography-style'>Lorem ipsum dolor sit amet-1?</Typography></AccordionSummary>
        <AccordionDetails><Typography> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography></AccordionDetails>
      </Accordion>
      <Accordion className='accordion-style'>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header"  className='accordionsummary-style'><Typography className='typography-style'>Lorem ipsum dolor sit amet-2?</Typography></AccordionSummary>
        <AccordionDetails><Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography></AccordionDetails>
      </Accordion>
      <Accordion className='accordion-style'>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header"  className='accordionsummary-style'><Typography className='typography-style'>Lorem ipsum dolor sit amet-3?</Typography></AccordionSummary>
        <AccordionDetails><Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography></AccordionDetails>
      </Accordion>
      <Accordion className='accordion-style'>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4-content" id="panel4-header"  className='accordionsummary-style'><Typography className='typography-style'>Lorem ipsum dolor sit amet-4?</Typography></AccordionSummary>
        <AccordionDetails><Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography></AccordionDetails>
      </Accordion>
      </div>
      </div>
    </div>
    </ motion.div>    
  )
}

export default Index