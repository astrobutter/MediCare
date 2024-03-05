import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {v2 as cloudinary} from 'cloudinary';
import { UserModel } from "../models/User.js";
import { DoctorModel } from "../models/Doctor.js";
import { AppointmentModel } from "../models/Appointment.js";

const router = express.Router();

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true
})
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
router.post("/register", async (req, res) => {
  const { username, password, imageUrl, name, email, gender, dob } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // const hashedPassword = await bcrypt.hash(password, 10);

  // const hashedPassword =  bcrypt.genSalt(10,(err,salt) => {
  //   bcrypt.hash(`${password}`, salt , (err, hash) =>{
  //       if(err) throw (err);
  //   })})
  // console.log(hashedPassword);
  const newUser = new UserModel({  name, email, imageUrl, username, password: hashedPassword, gender, dob });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

router.post("/doc/register", async (req, res) => {
  const { name, dob, gender, email, imageUrl, educations, experiences, about, username, password, specializations, schedules } = req.body.user;
  const user = await DoctorModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new DoctorModel({ name, dob, gender, email, imageUrl, educations, experiences, about, username, password: hashedPassword, specializations, schedules });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password, checked } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(299).json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(298).json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id, isDoctor: checked.toString() },  "secret");
  res.json({ token, userID: user._id, isDoctor: checked.toString() });
});

router.post("/doc/login", async (req, res) => {
  const { username, password, checked } = req.body;
  const user = await DoctorModel.findOne({ username });
  if (!user) {
    return res.status(299).json({ message: "Username or password is incorrect" });
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(298).json({ message: "Username or password is incorrect" });
  }
  // const token = jwt.sign({ id: user._id, isDoctor: checked }, "secret");
  // res.json({ token, userID: user._id, isDoctor: checked });
  const token = jwt.sign({ id: user._id, isDoctor: checked.toString() },  "secret");
  res.json({ token, userID: user._id, isDoctor: checked.toString() });
});

router.get('/user/:userID', verifyToken, async (req, res) => {
  // console.log(req.params.userID);
  const User = await UserModel.findById(req.params.userID);
  try {
    // console.log(User);
    res.status(201).json(User);

  } catch (err) { console.log(err) }
})

router.get('/appointments/user/:userID', verifyToken, async (req, res) => {
  const appointments = await AppointmentModel.find({ user: req.params.userID })
  try {
    res.status(201).json(appointments);
  } catch (err) { console.log(err) }
})

router.get("/get-signature", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request({
      timestamp: timestamp
    }, cloudinaryConfig.api_secret
  )
  res.json({ timestamp, signature })
})

router.post("/do-something-with-photo", async (req, res) => {
  const expectedSignature = cloudinary.utils.api_sign_request({ public_id: req.body.public_id, version: req.body.version }, cloudinaryConfig.api_secret)
  try {
    if (expectedSignature === req.body.signature) {
      res.status(201).json({  imgID : req.body.public_id})
      // await fse.ensureFile("./data.txt")
      // const existingData = await fse.readFile("./data.txt", "utf8")
      // await fse.outputFile("./data.txt", existingData + req.body.public_id + "\n")
    }
  } catch (error) {
    res.status(500).json(err);
  }
})


export { router as userRouter };