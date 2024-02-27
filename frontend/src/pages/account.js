import React, { useState, useEffect} from 'react'
import { UserAuth } from '../context/AuthContext'
import { motion } from "framer-motion";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import axios from 'axios';
import { useCookies } from "react-cookie";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";

import { toast } from 'react-toastify';
import '../css/account.css'
import '../css/modal.css'
import 'react-toastify/dist/ReactToastify.css';
import { FiMinusCircle } from "react-icons/fi";
import { FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { useGetUserID } from '../hooks/useGetUserID';

import Modal from '../components/Modal';
// import '../css/modal.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const doctorSpeciality = [
  'Anatomical Pathology',
  'Anesthesiology',
  'Ayurveda',
  'Cardiology',
  'Cardiovascular & Thoracic Surgery',
  'Clinical Immunology/Allergy',
  'Critical Care Medicine',
  'Dentistry',
  'Dermatology',
  'Diabetology',
  'Diagnostic Radiology',
  'Diet & Nutrition',
  'Ear, Nose, Throat',
  'Emergency Medicine',
  'Endocrinology and Metabolism',
  'Family Medicine',
  'Gastroenterology',
  'General Physician',
  'General Internal Medicine',
  'General Surgery',
  'General/Clinical Pathology',
  'Geriatric Medicine',
  'Hematology',
  'Homeopathy',
  'Medical Biochemistry',
  'Medical Genetics',
  'Medical Microbiology and Infectious Diseases',
  'Medical Oncology',
  'Nephrology',
  'Neurology',
  'Neurosurgery',
  'Nuclear Medicine',
  'Obstetrics/Gynecology',
  'Occupational Medicine',
  'Ophthalmology',
  'Orthopedic',
  'Orthopedic Surgery',
  'Otolaryngology',
  'Pediatrics',
  'Physical Medicine and Rehabilitation (PM & R)',
  'Physiotherapy',
  'Plastic Surgery',
  'Psychiatry',
  'Psychology',
  'Public Health and Preventive Medicine (PhPm)',
  'Pulmonology',
  'Radiation Oncology',
  'Respirology',
  'Rheumatology',
  'Sexology',
  'Urology',
  'Veterinary',
];

function getStyles(speciality, currSpeciality, theme) {
  return {
    fontWeight:
      currSpeciality?.indexOf(speciality) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const Account = () => {
  const { isDoctor, user, setUser, logout } = UserAuth();
  const userID = useGetUserID();
  const theme = useTheme();
  const [cookies, _] = useCookies(["access_token"]);
  const [ reviews, setReviews] = useState([]);
    const [ currSpeciality, setCurrSpeciality] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const api_key = "155945551935929"
    const cloud_name = "deideje7t"

    const handleAddEducation = () => {
      const educations = [...user.educations, ""];
      setUser({ ...user, educations });
    };
  
    const handleAddExperience = () => {
      const experiences = [...user.experiences, ""];
      setUser({ ...user, experiences });
    };
  
    const handleEducationCollegeChange = (event, index) => {
      const { value } = event.target;
      const educations = [...user.educations];
      const educationItem = {
        college: value,
        year: educations[index].year || "",
      };
      educations[index] = educationItem;
      setUser({ ...user, educations });
    };
  
    const handleEducationYearChange = (event, index) => {
      const { value } = event.target;
      const educations = [...user.educations];
      const educationItem = {
        college: educations[index].college || "",
        year: value,
      };
      educations[index] = educationItem;
      setUser({ ...user, educations });
    };
  
    const handleExperiencePlaceChange = (event, index) => {
      const { value } = event.target;
      const experiences = [...user.experiences];
      const experienceItem = {
        place: value,
        from: experiences[index].from || "",
        to: experiences[index].to || "",
      };
      experiences[index] = experienceItem;
      setUser({ ...user, experiences });
    };
  
    const handleExperienceFromChange = (event, index) => {
      const { value } = event.target;
      const experiences = [...user.experiences];
      const experiencesItem = {
        place: experiences[index].place || "",
        from: value,
        to: experiences[index].to || "",
      };
      experiences[index] = experiencesItem;
      setUser({ ...user, experiences });
    };
  
    const handleExperienceToChange = (event, index) => {
      const { value } = event.target;
      const experiences = [...user.experiences];
      const experiencesItem = {
        place: experiences[index].place || "",
        from: experiences[index].from || "",
        to: value,
      };
      experiences[index] = experiencesItem;
      setUser({ ...user, experiences });
    };
  
    const submitImage = async (event) => {
      event.preventDefault();
      try {
        toast('Uploading', {
          position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
        });
        const signatureResponse = await axios.get("http://localhost:3001/auth/get-signature");
        console.log(signatureResponse);
  
        const data = new FormData();
        data.append("file", document.querySelector("#file-field").files[0]);
        data.append("api_key", api_key);
        data.append("signature", signatureResponse.data.signature);
        data.append("timestamp", signatureResponse.data.timestamp);
        
        const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, data, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: function (e) {
            console.log(e.loaded / e.total)
          }
        })
        toast.success('Photo Saved.', {
          position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark"
        })
        setUser(user => ({ ...user, imageUrl  : cloudinaryResponse.data.url }));
      } catch (error) {
        console.log(error)
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/doc/account/${userID}`, { headers: { authorization: cookies.access_token }});
        console.log(response.data);
        setUser(response.data);
        setCurrSpeciality(response.data.specializations);
      } catch (err) { console.log(err) }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        // setUser({ ...user, specializations: currSpeciality})
        console.log('before axios CS', currSpeciality);
        console.log('before axios', user);
        const result = await axios.put("http://localhost:3001/doc", { ...user }, { headers: { authorization: cookies.access_token }});
        console.log('axios -',result);
        toast.success('Changes Saved.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
        });
      } catch (error) { console.error(error) }
    };

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setCurrSpeciality(
        typeof value === "string" ? value.split(",") : value,
      );
    };

    const fetchComments = async () =>{
      try {
        const response = await axios.get(`http://localhost:3001/recipes/comments/${user.username}`);
        setReviews(response.data.myComments);
        // {userID && getUserName(userID);}
        // getUserName(userID);
      } catch (err) { console.log(err) }
    }

    useEffect(() => {
      fetchCurrentUser();
      // fetchComments();
    }, []);
    useEffect(() => {
      console.log('UE', user);
    }, [user]);
    useEffect(() => {
      setUser({ ...user, specializations: currSpeciality})
      console.log('UE CS', user);
    }, [currSpeciality]);
    {/*
    useEffect(() => {
      console.log('UE cs', currSpeciality);
    }, [currSpeciality]);
*/}

    return (
    <motion.div className='account page' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
    <Tabs aria-label="Vertical tabs" className='tabs max-width' orientation="vertical"
      sx={{ minWidth: 300,
      height: 1 }}
    >
      <TabList>
        <Tab>Overview</Tab>
        <Tab>Appointments</Tab>
        <Tab>Profile</Tab>
      </TabList>
      <TabPanel value={0}>
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

          <div className='booking-container hidden'>
          <button className='log-out-button' onClick={logout}>Log-out</button>
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
      </TabPanel>
      <TabPanel value={1}>
      <div className=''>
          <button className='modal-button' onClick={() => setOpenModal(true)} ><FaPlus /> Schedules
          </button>
          <Modal open={openModal} onClose={() => setOpenModal(false)} />
          <div className='schedules-container'>
          { user.schedules?.map((schedule,index)=>(
            // <div className='schedule' key={index}>
            <>
              <div className='schedule-date' key={index}>{ Date(schedule.date).split(' ')[0]}, {Date(schedule.date).split(' ')[1]} {Date(schedule.date).split(' ')[2]}, {Date(schedule.date).split(' ')[3]}
              </div>
              <div className='schedule-timings'>
              {schedule.timings?.map((timing,index2)=>(
                <div className='schedule-time' key={index2}>
                  {timing.time>11? (timing.time-12 +'p.m.'): (timing.time +'a.m.')} - ({timing.slots})
                </div>
              ))}
              </div>
            </>
            // </div>
          ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={2}>
          <form onSubmit={handleSubmit} className='max-width profile-form'>
            <div className='column'>
              <label htmlFor="about">About:</label>
              <textarea type="text" value={user.about} placeholder='5 years in medical.' required rows={'2'}
                onChange={(event) => setUser({ ...user, about: event.target.value })}
              />
            </div>

            <div className='column upload-image' >
              <img src={user.imageUrl} alt="image" />
              <div className="upload-item">
                <input htmlFor="imageUrl" id="file-field" type="file" />
                <button name="imageUrl" type="submit" className="submit-image-button" onClick={submitImage}
                >Upload</button>
              </div>
            </div>

            <div className='column'>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Specializations</InputLabel>
                <Select labelId="demo-multiple-chip-label" id="demo-multiple-chip" multiple
                  value={currSpeciality} onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Specializations" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (<Chip key={value} label={value} />))}
                    </Box>
                  )}
                  MenuProps={doctorSpeciality}
                >
                  {doctorSpeciality.map((speciality) => (
                    <MenuItem
                      key={speciality}
                      value={speciality}
                      style={getStyles(speciality, currSpeciality, theme)}
                    >
                      {speciality}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className='column'>
              <label htmlFor="education">Education:</label>
              <button type="button" onClick={handleAddEducation} className="add-education">
                <FaPlus /> Add Education
              </button>
            </div>
        
            <div className="education-container">
              {user.educations?.map((education, index) => (
                <div className="education-item" key={index}>
                  <input required key={index} type="text" name="education" placeholder="AIIMS, DELHI"
                    value={education.college}
                    onChange={(event) => handleEducationCollegeChange(event, index)}
                  />
                  <input required key={index} type="number" name="education" placeholder="2020(graduation year)"
                    value={education.year}
                    onChange={(event) => handleEducationYearChange(event, index)}
                  />
                  <button className="delete-education"
                    onClick={() => {
                      const educations = user.educations.filter((education, idx) => idx !== index)
                      setUser({ ...user, educations });
                    }}
                  ><FiMinusCircle /></button>
                </div>
              ))
              }
            </div>

            <div className='column'>
              <label htmlFor="experience">Experience:</label>
              <button type="button" onClick={handleAddExperience} className="add-experience">
                <FaPlus /> Add Experience
              </button>
            </div>

            <div className="experience-container">
              {user.experiences?.map((experience, index) => (
                <div className="experience-item" key={index}>
                  <input required key={index} type="text" name="experience" placeholder="AIIMS, DELHI"
                    value={experience.place}
                    onChange={(event) => handleExperiencePlaceChange(event, index)}
                  />
                  <input required key={index} type="number" name="experience" placeholder="2020(starting year)"
                    value={experience.from}
                    onChange={(event) => handleExperienceFromChange(event, index)}
                  />
                  <input required key={index} type="number" name="experience" placeholder="2020(ending year)"
                    value={experience.to}
                    onChange={(event) => handleExperienceToChange(event, index)}
                  />
                  <button className="delete-experience"
                    onClick={() => {
                      const experiences = user.experiences.filter((experience, idx) => idx !== index)
                      setUser({ ...user, experiences });
                    }}
                  ><FiMinusCircle /></button>
                </div>
              ))
            }
            </div>

            <button type="submit" className="save-button">Save Changes</button>
          </form>
      </TabPanel>
    </Tabs>
    </motion.div>
  )
}
