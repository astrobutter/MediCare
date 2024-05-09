import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axios, motion, toast } from '../components/NpmPackages';
import { FiMinusCircle, FaPlus, FaEye, FaEyeSlash } from "../components/ReactIcons";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import 'react-toastify/dist/ReactToastify.css';
import '../css/doc-sign-up.css'
export const Doc_sign_up = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('1');
  const [user, setUser] = useState({ name: "", dob:"", gender: "other", email: "", educations: [], experiences: [], about: "", username: "", password: "", specializations: [], schedules: [],
  imageUrl: "data:image/png;base64,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",
  });
  const [showPassword, setShowPassword] = useState(false);

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
    const educationItem = { college: value, year: educations[index].year || "", };
    educations[index] = educationItem;
    setUser({ ...user, educations });
  };

  const handleEducationYearChange = (event, index) => {
    const { value } = event.target;
    const educations = [...user.educations];
    const educationItem = { college: educations[index].college || "", year: value, };
    educations[index] = educationItem;
    setUser({ ...user, educations });
  };

  const handleExperiencePlaceChange = (event, index) => {
    const { value } = event.target;
    const experiences = [...user.experiences];
    const experienceItem = { place: value, from: experiences[index].from || "", to: experiences[index].to || "", };
    experiences[index] = experienceItem;
    setUser({ ...user, experiences });
  };

  const handleExperienceFromChange = (event, index) => {
    const { value } = event.target;
    const experiences = [...user.experiences];
    const experiencesItem = { place: experiences[index].place || "", from: value, to: experiences[index].to || "", };
    experiences[index] = experiencesItem;
    setUser({ ...user, experiences });
  };

  const handleExperienceToChange = (event, index) => {
    const { value } = event.target;
    const experiences = [...user.experiences];
    const experiencesItem = { place: experiences[index].place || "", from: experiences[index].from || "", to: value, };
    experiences[index] = experiencesItem;
    setUser({ ...user, experiences });
  };

  const submitImage = async (event) => {
    event.preventDefault();
    try {
      toast('Uploading', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
      const signatureResponse = await axios.get("http://localhost:3001/auth/get-signature");
      const data = new FormData();
      data.append("file", document.querySelector("#file-field").files[0]);
      data.append("api_key", api_key);
      data.append("signature", signatureResponse.data.signature);
      data.append("timestamp", signatureResponse.data.timestamp);
      
      const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function (e) { console.log(e.loaded / e.total) }
      })
      toast.success('Photo Saved.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark" })
      setUser(user => ({ ...user, imageUrl  : cloudinaryResponse.data.url }));
    } catch (error) { console.log(error) }
  };

  const handleChange = (event, newValue) => { setValue(newValue); };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user)
    try {
      if (user.password.length < 8) {
        toast.error('Password should be greater than 8 characters.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
        return;
      }
      const result = await axios.post("http://localhost:3001/auth/doc/register", { user });
      if (result.status === 299) {
        toast.error('Username already exists.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
      } else {
        setTimeout(() => { navigate("/login"); }, "2800");
        toast.success('Successfully registered. Being redirected to login page in 3 sec.', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
      }
    } catch (error) { console.log(error) }
  };

  return (
    <motion.div className='signup-page' initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: '0%' }} exit={{ opacity: 0, x: '100%' }}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" centered >
              <Tab label="Personal-Info" value="1" />
              <Tab label="Experience" value="2" />
              <Tab label="Credentials" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1" className="tabPanel">
            <form onSubmit={handleSubmit} className='max-width signup-form'>
              <div className='column'>
                <label htmlFor="name">Name:</label>
                <input type="text" value={user.name} placeholder='Pawan Sharma' required onChange={(event) => setUser({ ...user, name: event.target.value })} />
              </div>
              <div className='column'>
                <label htmlFor="name">D.O.B.:</label>
                <input type="date" value={user.dob} required onChange={(event) => setUser({ ...user, dob: event.target.value })} />
              </div>
              <div className="column">
                <label htmlFor="gender">Gender:</label>
                <div className="radio">
                  <div className="radio-column"><input type="radio" value='male' checked={user.gender === "male"} required onChange={(e) => setUser({ ...user, gender: e.target.value })} />
                    <label htmlFor="male">Male</label></div>
                  <div className="radio-column"><input type="radio" value='female' checked={user.gender === "female"} onChange={(e) => setUser({ ...user, gender: e.target.value })} />
                    <label htmlFor="male">Female</label></div>
                  <div className="radio-column"><input type="radio" value='other' checked={user.gender === "other"} onChange={(e) => setUser({ ...user, gender: e.target.value })} />
                    <label htmlFor="male">Other</label></div>
                </div>
              </div>
              <div className='column'>
                <label htmlFor="address">Email Address:</label>
                <input type="email" value={user.email} placeholder='abx@email.com' required onChange={(event) => setUser({ ...user, email: event.target.value })} />
              </div>
              <div className='column upload-image' >
                <img src={user.imageUrl} alt="image" />
                <div className="upload-item">
                  <input htmlFor="imageUrl" id="file-field" type="file" />
                  <button name="imageUrl" type="submit" className="submit-image-button" onClick={submitImage}>Upload</button>
                </div>
              </div>
            </form>
          </TabPanel>
          <TabPanel value="2" className="tabPanel">
            <form onSubmit={handleSubmit} className='max-width signup-form'>
              <div className='column'>
                <label htmlFor="education">Education:</label>
                <button type="button" onClick={handleAddEducation} className="add-education">
                  <FaPlus /> Add Education
                </button>
              </div>
                <div className="education-container">
                {user.educations?.map(( education, index )=>(
                  <div className="education-item" key={index}>
                    <input required key={index} type="text" name="education" placeholder="AIIMS, DELHI" value={education.college} onChange={(event) => handleEducationCollegeChange(event, index)} />
                    <input required key={index} type="number" name="education" placeholder="2020(graduation year)" value={education.year} onChange={(event) => handleEducationYearChange(event, index)} />
                    <button className="delete-education" onClick={ ()=>{ const educations=user.educations.filter(( education, idx ) => idx!==index );setUser({ ...user, educations});}}><FiMinusCircle /></button>
                  </div>
                  ))}
                </div>
              <div className='column'>
                <label htmlFor="experience">Experience:</label>
                <button type="button" onClick={handleAddExperience} className="add-experience"><FaPlus /> Add Experience</button>
              </div>
                <div className="experience-container">
                {user.experiences?.map(( experience, index )=>(
                  <div className="experience-item" key={index}>
                    <input required key={index} type="text" name="experience" placeholder="AIIMS, DELHI" value={experience.place} onChange={(event) => handleExperiencePlaceChange(event, index)} />
                    <input required key={index} type="number" name="experience" placeholder="2020(starting year)" value={experience.from} onChange={(event) => handleExperienceFromChange(event, index)} />
                    <input required key={index} type="number" name="experience" placeholder="2020(ending year)" value={experience.to} onChange={(event) => handleExperienceToChange(event, index)} />
                    <button className="delete-experience"  onClick={ ()=>{ const experiences=user.experiences.filter(( experience, idx ) => idx!==index ); setUser({ ...user, experiences}); } } ><FiMinusCircle /></button>
                  </div>
                  ))}
                </div>
              <div className='column'>
                <label htmlFor="about">About:</label>
                <textarea type="text" value={user.about} placeholder='5 years in medical.' required rows={'2'} onChange={(event) => setUser({ ...user, about: event.target.value })} />
              </div>
            </form>
          </TabPanel>
          <TabPanel value="3" className="tabPanel">
            <form onSubmit={handleSubmit} className='max-width signup-form'>
              <div className="column">
                <label htmlFor="email">Username:</label>
                <input type="text" value={user.username} placeholder='pawan15' required onChange={(event) => setUser({ ...user, username: event.target.value })} />
              </div>
              <div className="column">
                <label htmlFor="email">Password:</label>
                <div className="password-label">
                <input type={ showPassword ? "text" : "password" } placeholder='Password' required value={user.password} onChange={(event) => setUser({ ...user, password: event.target.value })} />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)}> { showPassword ? <FaEye /> : <FaEyeSlash /> } </button>
                </div>
              </div>
              <button type="submit" className="save-button">Register</button>
              <div className="sign-up-link">Have an account? <Link to={'/login'}>Login</Link></div>
            </form>
          </TabPanel>
        </TabContext>
      </Box>
    </motion.div>
  )
}