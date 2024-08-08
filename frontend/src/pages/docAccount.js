import React, { useState, useEffect} from 'react'
import { UserAuth } from '../context/AuthContext'
import { useCookies } from "react-cookie";
import { useGetUserID } from '../hooks/useGetUserID';
import { Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip, useTheme, Tabs, TabList, Tab, TabPanel} from '../components/MaterialUI'
import { motion, axios, toast, dayjs} from '../components/NpmPackages'
import { FiMinusCircle, FaPlus, FaEye, FaEyeSlash } from "../components/ReactIcons";
import { Modal, ReviewCard } from '../components/Index';
import 'react-toastify/dist/ReactToastify.css';
import '../css/account.css'
import '../css/modal.css'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {PaperProps: {style: {maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,width: 250,},}};

function getStyles(speciality, currSpeciality, theme) {
  return { fontWeight: currSpeciality?.indexOf(speciality) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium, };
}

export const Account = () => {
  const { doc, setDoc, logout, doctorSpeciality, month, docAppointment, fetchCurrentDocAppointment } = UserAuth();
  const userID = useGetUserID();
  const theme = useTheme();
  const [cookies, _] = useCookies(["access_token"]);
  const [reviews, setReviews] = useState([]);
  const [currSpeciality, setCurrSpeciality] = useState([]);
  const [currSchedules, setCurrSchedules] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const api_key = "155945551935929"
  const cloud_name = "deideje7t"
  let today= new Date();

  const handleAddEducation = () => { const educations = [...doc.educations, ""]; setDoc({ ...doc, educations }); };
  const handleAddExperience = () => { const experiences = [...doc.experiences, ""]; setDoc({ ...doc, experiences }); };
  const handleEducationCollegeChange = (event, index) => {
    const { value } = event.target;
    const educations = [...doc.educations];
    const educationItem = { college: value, year: educations[index].year || ""};
    educations[index] = educationItem;
    setDoc({ ...doc, educations });
  };
  const handleEducationYearChange = (event, index) => {
    const { value } = event.target;
    const educations = [...doc.educations];
    const educationItem = { college: educations[index].college || "", year: value};
    educations[index] = educationItem;
    setDoc({ ...doc, educations });
  };
  const handleExperiencePlaceChange = (event, index) => {
    const { value } = event.target;
    const experiences = [...doc.experiences];
    const experienceItem = { place: value, from: experiences[index].from || "", to: experiences[index].to || ""};
    experiences[index] = experienceItem;
    setDoc({ ...doc, experiences });
  };
  const handleExperienceFromChange = (event, index) => {
    const { value } = event.target;
    const experiences = [...doc.experiences];
    const experiencesItem = { place: experiences[index].place || "", from: value, to: experiences[index].to || ""};
    experiences[index] = experiencesItem;
    setDoc({ ...doc, experiences });
  };
  const handleExperienceToChange = (event, index) => {
    const { value } = event.target;
    const experiences = [...doc.experiences];
    const experiencesItem = { place: experiences[index].place || "", from: experiences[index].from || "", to: value};
    experiences[index] = experiencesItem;
    setDoc({ ...doc, experiences });
  };
  const submitImage = async (event) => {
    event.preventDefault();
    try {
      toast('Uploading', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark"});
      const signatureResponse = await axios.get("http://localhost:3001/auth/get-signature");

      const data = new FormData();
      data.append("file", document.querySelector("#file-field").files[0]);
      data.append("api_key", api_key);
      data.append("signature", signatureResponse.data.signature);
      data.append("timestamp", signatureResponse.data.timestamp);

      const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, data, { headers: { "Content-Type": "multipart/form-data" }})
      toast.success('Photo Saved.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark"})
      setDoc(doc => ({ ...doc, imageUrl: cloudinaryResponse.data.url }));
    } catch (error) { console.log(error) }
  };
  const updateSchedules = () => {
    doc.schedules?.map((schedule, index)=>{
      if((dayjs(schedule.date).format('DD')-'0'> today.getDate()) && dayjs(schedule.date).format('MM')-'0'< today.getMonth()+1) {
        const schedules = doc.schedules.filter((schedule, idx) => idx !== index); setDoc({ ...doc, schedules});
      } else if((dayjs(schedule.date).format('DD')-'0'<today.getDate()) && dayjs(schedule.date).format('MM')-'0'=== today.getMonth()+1) {
        const schedules = doc.schedules.filter((schedule, idx) => idx !== index); setDoc({ ...doc, schedules});
      }})
  }
  const fetchCurrentdoc = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/doc/account/${userID}`, { headers: { authorization: cookies.access_token } });
      setDoc(response.data); setCurrSpeciality(response.data.specializations);
    } catch (err) { console.log(err) }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.put("http://localhost:3001/doc", { ...doc }, { headers: { authorization: cookies.access_token } });
      toast.success('Changes Saved.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark" });
    } catch (error) { console.error(error) }
  };
  const handleChange = (event) => {
    const {target: { value }} = event;
    setCurrSpeciality( typeof value === "string" ? value.split(",") : value );
  };
  const fetchComments = async () => {
    try { const response = await axios.get(`http://localhost:3001/doc/reviews/${doc.username}`); setReviews(response.data.myReviews);
    } catch (err) { console.log(err) }
  }
  const handleModal = async (event) => {
    event.stopPropagation();
    try { const result = await axios.put("http://localhost:3001/doc", { ...doc }, { headers: { authorization: cookies.access_token } }); setOpenModal(true);
    } catch (error) { console.error(error) }
  }

  useEffect(() => {
    fetchCurrentdoc();
    fetchComments();
    fetchCurrentDocAppointment();
  }, []);
  useEffect(() => {
    updateSchedules();
  }, [doc]);
  useEffect(() => {
    setDoc({ ...doc, specializations: currSpeciality })
  }, [currSpeciality]);

  return (
    <motion.div className='account page' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
      <Tabs aria-label="Vertical tabs" className='tabs max-width' orientation="vertical" sx={{ minWidth: 300, height: 1}}>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Appointments</Tab>
          <Tab>Profile</Tab>
        </TabList>
        <TabPanel value={0}>
          <div className="profile max-width">
            <div className='header-section'>
              <img src={doc.imageUrl} />
              <div className='info'>
                <div className='first'>
                  Dr. {doc.name}<div className='gender'>({doc.gender})</div>
                </div>
                <div className='second'>Email: {doc.email}</div>
              </div>

              <div className='booking-container '>
                <div>Price- {doc.price? doc.price : `Not Selected`}</div>
                <button className='log-out-button' onClick={logout}>Log-out</button>
              </div>
            </div>

            <div className='profile-section'>
              <p className='section-tag'>Specializations</p>
              <div className='section-content specialization-container'>{doc.specializations.map((specialization, index) => <p key={index}>{specialization}</p>)}</div>
            </div>

            <div className='profile-section'>
              <p className='section-tag'>About</p>
              <div className='section-content'>{doc.about}</div>
            </div>

            <div className='profile-section'>
              <p className='section-tag'>Educations</p>
              <div className='section-content education-container'>{doc.educations?.map((education, index) => <p key={index}>{education.college}, {education.year}</p>)}</div>
            </div>

            <div className='profile-section'>
              <p className='section-tag'>experiences</p>
              <div className='section-content education-container'>{doc.experiences?.map((experience, index) => <p key={index}>{experience.place}, {experience.from} to {experience.to}</p>)}</div>
            </div>

            <div className='profile-section'>
              <p className='section-tag'>Appointment Slots</p>
              <div className='section-content schedules-container'>
                {doc.schedules?.map((schedule, index) => (
                  <div className='schedule-wrap'>
                    <div className='schedule-date' key={index}>{dayjs(schedule.date).format('DD-MM-YYYY')}</div>
                    <div className='schedule-timings'>
                      {schedule.timings?.map((timing, index2) => (
                        <p className='schedule-time' key={index2}>{ timing.time>11 ? (timing.time-12+'p.m.') : (timing.time+'a.m.')} - ({timing.slots})</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='profile-section'>
              <p className='section-tag'>Reviews ({reviews?.length})</p>
              <div className='section-content reviews-wrapper'>
                <div className={reviews?.length &&'reviews-container'}>
                  {reviews?.map((review, index) => (
                    <ReviewCard review={review} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={1}>
          <div className='schedules-tab'>
            <button className='modal-button' onClick={event => handleModal(event)} ><FaPlus /> Schedules
            </button>
            <Modal open={openModal} onClose={() => setOpenModal(false)} />
            <div className='schedules-container'>
              {doc.schedules?.map((schedule, index) => (
                <div className='schedule-wrap' key={index}>
                  <div className='schedule-date' key={index}>{dayjs(schedule.date).format('YYYY-MM-DD')}</div>
                  <div className='schedule-timings'>
                    {schedule.timings?.map((timing, index2) => (
                      <div className='schedule-time' key={index2}>
                        {timing.time > 11 ? (timing.time - 12 + 'p.m.') : (timing.time + 'a.m.')} - ({timing.slots})
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className='right'>
            <h2>My Appointments</h2>
                <div className={docAppointment&&'table' }>
                    <div className='row header'>
                        <div>Photo</div>
                        <div>Name</div>
                        <div>Gender</div>
                        <div>Appointment Date</div>
                        <div>Appointment Time</div>
                        <div>Booked on</div>
                    </div>
                    { docAppointment?.map((appointment, index) => (
                        <div key={index} className='row'>
                            <div className='pateint-img'><img src={appointment.imageUrl} /></div>
                            <div>{appointment.name}</div>
                            <div>{appointment.gender}</div>
                            <div>{month[dayjs(appointment.date).format('MM')-'0'-1]} {dayjs(appointment.date).format('DD')-'0'}, {dayjs(appointment.date).format('YYYY')}</div>
                            <div>{appointment.time>11? (appointment.time-12 +' p.m.'): (appointment.time +' a.m.')}</div>
                            <div>{month[dayjs(appointment.dateTag).format('MM')-'0']} {dayjs(appointment.dateTag).format('DD')-'0'}, {dayjs(appointment.dateTag).format('YYYY')}</div>
                            {/* <button type='button' className='nav'><MdKeyboardArrowRight /></button> */}
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={2}>
          <form onSubmit={handleSubmit} className='max-width profile-form'>
            <div className='column'>
              <label htmlFor="about">About:</label>
              <textarea type="text" value={doc.about} placeholder='5 years in medical.' required rows={'2'} onChange={(event) => setDoc({ ...doc, about: event.target.value })} />
            </div>

            <div className='column upload-image' >
              <img src={doc.imageUrl} alt="image" />
              <div className="upload-item">
                <input htmlFor="imageUrl" id="file-field" type="file" />
                <button name="imageUrl" type="submit" className="submit-image-button" onClick={submitImage}>Upload</button>
              </div>
            </div>

            <div className='column'>
              <label htmlFor="about">Price:</label>
              <input type="number" value={doc.price} placeholder='750' required onChange={(event) => setDoc({ ...doc, price: event.target.value })} />
            </div>

            <div className='column'>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Specializations</InputLabel>
                <Select value={currSpeciality} onChange={handleChange} MenuProps={doctorSpeciality} labelId="demo-multiple-chip-label" id="demo-multiple-chip" multiple
                  input={<OutlinedInput id="select-multiple-chip" label="Specializations" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>{selected.map((value) => (<Chip key={value} label={value} />))}</Box>
                  )}
                >
                  {doctorSpeciality.map((speciality) => (
                    <MenuItem value={speciality} key={speciality} style={getStyles(speciality, currSpeciality, theme)} > {speciality} </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className='column'>
              <label htmlFor="education">Education:</label>
              <button type="button" onClick={handleAddEducation} className="add-education"><FaPlus /> Add Education</button>
            </div>

            <div className="education-container">
              {doc.educations?.map((education, index) => (
                <div className="education-item" key={index}>
                  <input value={education.college} onChange={(event) => handleEducationCollegeChange(event, index)} required key={index} type="text" name="education" placeholder="AIIMS(MBBS), DELHI" />
                  <input value={education.year} onChange={(event) => handleEducationYearChange(event, index)} required key={index} type="number" name="education" placeholder="2020(graduation year)" />
                  <button className="delete-education"
                    onClick={() => {
                      const educations = doc.educations.filter((education, idx) => idx !== index)
                      setDoc({ ...doc, educations });
                    }}
                  ><FiMinusCircle /></button>
                </div>
              ))}
            </div>

            <div className='column'>
              <label htmlFor="experience">Experience:</label>
              <button type="button" onClick={handleAddExperience} className="add-experience"><FaPlus /> Add Experience</button>
            </div>

            <div className="experience-container">
              {doc.experiences?.map((experience, index) => (
                <div className="experience-item" key={index}>
                  <input value={experience.place} onChange={(event) => handleExperiencePlaceChange(event, index)} required key={index} type="text" name="experience" placeholder="AIIMS, DELHI" />
                  <input value={experience.from} onChange={(event) => handleExperienceFromChange(event, index)} required key={index} type="number" name="experience" placeholder="2020(starting year)" />
                  <input value={experience.to} onChange={(event) => handleExperienceToChange(event, index)} required key={index} type="number" name="experience" placeholder="2020(ending year)" />
                  <button className="delete-experience"
                    onClick={() => {
                      const experiences = doc.experiences.filter((experience, idx) => idx !== index)
                      setDoc({ ...doc, experiences });
                    }}
                  ><FiMinusCircle /></button>
                </div>
              ))}
            </div>

            <button type="submit" className="save-button">Save Changes</button>
          </form>
        </TabPanel>
      </Tabs>
    </motion.div>
  )
}
