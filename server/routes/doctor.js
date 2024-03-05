import express from "express";
import { verifyToken } from "./user.js";

import { DoctorModel } from "../models/Doctor.js";
import { ReviewsModel } from "../models/Reviews.js";
import { AppointmentModel } from "../models/Appointment.js";


const router = express.Router();

router.get("/:speciality", async (req, res) => {
    try {
      let perPage = 8;
      let page = parseInt(req.query.page)|| 1;
  
      const result = await DoctorModel.find({specializations : { $in:req.params.speciality}});
      const startIndex = (page - 1) * perPage;
      const endIndex = page * perPage;
      
      const paginatedProducts = result.slice(startIndex, endIndex);
      const totalPages = Math.ceil(result.length / perPage)
  
      res.status(200).json({doctor: paginatedProducts, totalPages});
    } catch (err) { res.status(500).json(err) }
});

router.put("/", verifyToken, async (req, res) => {  
  try {
    const result = await DoctorModel.findByIdAndUpdate(req.body._id,{
        name: req.body.name,
        dob:  req.body.dob,
        gender: req.body.gender,
        email: req.body.email,
        imageUrl: req.body.imageUrl,
        educations: req.body.educations,
        experiences: req.body.experiences,
        about: req.body.about,
        username: req.body.username,
        password: req.body.password,
        specializations: req.body.specializations,
        schedules: req.body.schedules,
        price: req.body.price,
      });
      res.status(201).json({result});
    } catch (err) { res.status(500).json(err) }
});
router.get("/account/:userID", verifyToken, async (req, res) => {
  try {
    const result = await DoctorModel.findById(req.params.userID);
    res.status(200).json(result);
  } catch (err) { res.status(500).json(err) }
});
router.get("/profile/:username", async (req, res) => {
  try {
    const result = await DoctorModel.find({ username: req.params.username });
    res.status(200).json(result);
  } catch (err) { res.status(500).json(err) }
});
router.post('/review', async(req, res) => {
  const { user , text, doc, rating } = req.body;
  const review = new ReviewsModel({user , text, doc, rating});
  try {
    const result = await review.save();
    res.status(201).json(result);
  } catch (err) { res.status(500).json(err) }
})
router.get("/reviews/:username", async (req, res) => {
  try {
    const myReviews = await ReviewsModel.find({ doc: req.params.username })
    .sort({createdAt:-1});
    res.status(201).json( { myReviews } );   
  } catch (err) { res.status(500).json(err) }
});
router.post('/appointment', async(req, res) => {
  const { date, time, user, doc } = req.body;
  const appointment = new AppointmentModel({date, time, user, doc});
  try {
    const result = await appointment.save();
    res.status(201).json(result);
  } catch (err) { res.status(500).json(err) }
})
router.put("/appointment/updates", async (req, res) => {  
  try {
    const result = await DoctorModel.findByIdAndUpdate(req.body._id,{
        name: req.body.name, dob:  req.body.dob, gender: req.body.gender, email: req.body.email, imageUrl: req.body.imageUrl, educations: req.body.educations, experiences: req.body.experiences, about: req.body.about, username: req.body.username, password: req.body.password, specializations: req.body.specializations, schedules: req.body.schedules}
    );
    res.status(201).json({result});
  } catch (err) { res.status(500).json(err) }
});
export { router as doctorRouter };