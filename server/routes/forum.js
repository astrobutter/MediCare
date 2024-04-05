import express from "express";
import { verifyToken } from "./user.js";
import { ForumsModel } from "../models/ForumPost.js";
import { CommentsModel } from "../models/Comment.js"
import { DoctorModel } from "../models/Doctor.js";
import { UserModel } from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      let perPage = 8;
      let page = parseInt(req.query.page)|| 1;
  
      const result = await ForumsModel.find({});
      const startIndex = (page - 1) * perPage;
      const endIndex = page * perPage;
      
      const paginatedProducts = result.slice(startIndex, endIndex);
      const totalPages = Math.ceil(result.length / perPage)
  
      // const count = await Post.count();
      // const nextPage = parseInt(page) + 1;
      // const hasNextPage = nextPage <= Math.ceil(count / perPage);
      
      // const result = await RecipesModel.find({});
      // console.log(data)
      res.status(200).json({posts: paginatedProducts, totalPages});
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post("/", verifyToken, async (req, res) => {
    const forum = new ForumsModel({
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      userOwner: req.body.userOwner,
      slug: req.body.slug,
    });
  
    try {
      const result = await forum.save();
      res.status(201).json({result});
    } catch (err) { res.status(500).json(err); }
});

router.get("/:postSlug", async (req, res) => {
    try {
      const result = await ForumsModel.find({slug : req.params.postSlug});
      res.status(200).json({result});
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/comments', async(req, res) => {
    const comment = new CommentsModel({
      commentUser : req.body.commentUser,
      name : req.body.name,
      description : req.body.description,
      slug : req.body.slug,
    })
    try {
      const result = await comment.save();
      res.status(201).json(result);
    } catch (err) { console.log(err) }
})
router.get("/comments/:slug", async (req, res) => {
    try {
      const myComments = await CommentsModel.find({ slug: req.params.slug }).sort({createdAt:-1});
      res.status(201).json( { myComments } );   
    } catch (err) { res.status(500).json(err); }
});

router.post('/search', async(req, res)=>{
    try {
      let searchTerm = req.body.search;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

      const nameData = await ForumsModel.find({ name: { $regex: new RegExp(searchNoSpecialChar, 'i') }  });
      if( nameData.length==0 ){
        const descData = await ForumsModel.find({ description: { $regex: new RegExp(searchNoSpecialChar, 'i') } });
        res.status(201).json(descData);
      }
      else{ res.status(201).json(nameData); }
    } catch (err) { res.status(500).json(err); }
})
router.get('/user/:userID', async (req, res) => {
    const User = await DoctorModel.findById(req.params.userID);
    try {
      res.status(201).json(User);
    } catch (err) { console.log(err) }
  })
router.get('/pateint/:userID', async (req, res) => {
    const User = await UserModel.findById(req.params.userID);
    try {
      res.status(201).json(User);
    } catch (err) { console.log(err) }
  })
export { router as forumRouter };