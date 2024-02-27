import express from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "./user.js";

import { DoctorModel } from "../models/Doctor.js";
import { ReviewsModel } from "../models/Reviews.js";

const router = express.Router();

router.get("/:speciality", async (req, res) => {
    try {
      let perPage = 8;
      let page = parseInt(req.query.page)|| 1;
  
      const result = await DoctorModel.find({
        specializations : { $in:req.params.speciality}
      });
      const startIndex = (page - 1) * perPage;
      const endIndex = page * perPage;
      
      const paginatedProducts = result.slice(startIndex, endIndex);
      const totalPages = Math.ceil(result.length / perPage)
  
      // const count = await Post.count();
      // const nextPage = parseInt(page) + 1;
      // const hasNextPage = nextPage <= Math.ceil(count / perPage);
      
      // const result = await RecipesModel.find({});
      // console.log(data)
      res.status(200).json({doctor: paginatedProducts, totalPages});
    } catch (err) {
      res.status(500).json(err);
    }
});

router.put("/", verifyToken, async (req, res) => {  
  try {
    const result = await DoctorModel.findByIdAndUpdate(req.body._id,
      {
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
      });
      res.status(201).json({result});
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/account/:userID", verifyToken, async (req, res) => {
  try {
    const result = await DoctorModel.findById(req.params.userID);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/profile/:username", async (req, res) => {
  try {
    const result = await DoctorModel.find({ username: req.params.username });
    // console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/reviews/:username", async (req, res) => {
  // const result = await DoctorModel.find({username : req.params.username});
  try {
    const myReviews = await ReviewsModel.find({
      username: req.params.username
    })
    .sort({createdAt:-1});
    // console.log(myRecipes);
    res.status(201).json( { myReviews } );   
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
export { router as doctorRouter };