import express from "express";
import { RecipesModel } from "../models/Recipe.js";
import { UserModel } from "../models/User.js";
import { CommentsModel } from "../models/Comment.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let perPage = 8;
    let page = parseInt(req.query.page)|| 1;

    const result = await RecipesModel.find({});
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    
    const paginatedProducts = result.slice(startIndex, endIndex);
    const totalPages = Math.ceil(result.length / perPage)

    // const count = await Post.count();
    // const nextPage = parseInt(page) + 1;
    // const hasNextPage = nextPage <= Math.ceil(count / perPage);
    
    // const result = await RecipesModel.find({});
    // console.log(data)
    res.status(200).json({recipe: paginatedProducts, totalPages});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipesModel({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
    slug: req.body.slug,
  });

  try {
    const result = await recipe.save();
    res.status(201).json({
      createdRecipe: {
        name: result.name,
        image: result.image,
        ingredients: result.ingredients,
        instructions: result.instructions,
        _id: result._id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", verifyToken, async (req, res) => {  
  try {
    const result = await RecipesModel.findByIdAndUpdate(req.body._id,
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl,
        cookingTime: req.body.cookingTime,
        userOwner: req.body.userOwner,
        slug: req.body.slug,
      });
      res.status(201).json({
        createdRecipe: {
          name: result.name,
          image: result.image,
          ingredients: result.ingredients,
          instructions: result.instructions,
          _id: result._id,
        },
      });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:recipeSlug", async (req, res) => {
  try {
    const result = await RecipesModel.find({slug : req.params.recipeSlug});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/saverecipe", async (req, res) => {
  const recipe = await RecipesModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/unsaverecipe", async (req, res) => {
  const user = await UserModel.findById(req.body.userID);
  try {
    var index = user.savedRecipes.indexOf(req.body.recipeID);
    user.savedRecipes.splice(index, 1);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    // res.json({mssg: "okkkay"})
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
  const user = await UserModel.findById(req.params.userId);
  try {
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });

    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/myRecipes/:userId', async(req, res) => {
  const user = await UserModel.findById(req.params.userId);
  try {
    const myRecipes = await RecipesModel.find({
      userOwner: user._id 
    });
    res.status(201).json({ myRecipes });    
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

router.post('/comments', async(req, res) => {
  const comment = new CommentsModel({
    commentUser : req.body.commentUser,
    name : req.body.name,
    description : req.body.description,
    recipeSlug : req.body.recipeSlug,
  })
  try {
    const result = await comment.save();
    // console.log(result)
    res.status(201).json(result);
  } catch (err) { console.log(err) }
})
/*
router.get("/comments/:recipeSlug", async (req, res) => {
  // const result = await RecipesModel.find({slug : req.params.recipeSlug});
  const comments = await CommentsModel.find({
    recipeSlug: req.params.recipeSlug
  });
  try {
    const user = await UserModel.findById(comments.name)
    // console.log(comments);
    res.status(201).json({
      comment : {
        commentData : comments,
        commentUser : user,
      } 
    });   
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
*/
// /*
router.get("/comments/:recipeSlug", async (req, res) => {
  // const result = await RecipesModel.find({slug : req.params.recipeSlug});
  try {
    const myComments = await CommentsModel.find({
      recipeSlug: req.params.recipeSlug
    })
    .sort({createdAt:-1});
    // console.log(myRecipes);
    res.status(201).json( { myComments } );   
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// */

router.put('/delete', async (req, res) => {
  try {
    // console.log(req.body.recipeID);
    // const result = await RecipesModel.findById(req.body.recipeID);
    // console.log(res);
    const result = await RecipesModel.deleteOne( {_id : req.body.recipeID} );
    // console.log(result)
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.post('/search', async(req, res)=>{
  try {
    let searchTerm = req.body.search;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
/*
    const nameData = await RecipesModel.find({
        // $or: [
          // nameQuery,
          // descQuery,
          // userQuery
          // myKey:{ $regex:new RegExp('^' + 'test$australia'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', 'i')}
            // { name: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
            // { description: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
            // { userOwner: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            // { name: { $regex: searchNoSpecialChar, $options: 'i' } },
            // { description: { $regex: searchNoSpecialChar, $options: 'i' } },
            // { userOwner: { $regex: searchNoSpecialChar, $options: 'i' } }

            name: { $regex: new RegExp(searchNoSpecialChar, 'i') } 
            // name: { $in: [ /^seachNoSpecialChar/i, /^ack/ ] }
        // ]
    });
    console.log(nameData);
    if( nameData.length==0 ){
      console.log('yy');
    }
    */
    const nameData = await RecipesModel.find({
      name: { $regex: new RegExp(searchNoSpecialChar, 'i') } 
    });
    // console.log(nameData);
    if( nameData.length==0 ){
      // console.log('yy');
      const descData = await RecipesModel.find({           
       description: { $regex: new RegExp(searchNoSpecialChar, 'i') } 
      });
      // console.log(descData);
      res.status(201).json(descData);
    }
    else{
      res.status(201).json(nameData);
    }
    // if( !descData ){
  // res.status(201).json(userData);
// }
// else{
  // res.status(201).json(descData);
  // }
  // }
  // else{
  /*      
*/
// res.status(201).json(descData);
// }
    // if( nameData.length==0 ){
    //   const descData = await RecipesModel.find({           
    //         description: { $regex: new RegExp(searchNoSpecialChar, 'i') } 
    //   });
    //   if( !descData ){
    //     const userData = await RecipesModel.find({
    //       userOwner: { $regex: new RegExp(searchNoSpecialChar, 'i') } 
    //     })
    //     res.status(201).json(userData);
    //   }
    //   else{
    //     res.status(201).json(descData);
    //   }
    // }
    // else{
    //   res.status(201).json(nameData);
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})
// router.delete('/delete', async (req, res) => {
//   try {
//     console.log(req.body.recipeID);
//     const res = await RecipesModel.findById(req.body.recipeID);
//     // console.log(res);
//     // const result = await RecipesModel.deleteOne( {_id : req.body.recipeID} );
//     // console.log(result)
//     res.status(201).json({res});
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// })
export { router as recipesRouter };
