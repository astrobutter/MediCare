router.get("/profile/:id", async (req, res) => {
    const user = await UserModel.find({id : req.params.id});
    console.log( user);
    // console.log("1",user[0]._id);
    try {
      // const myRecipes = await RecipesModel.find({
      //   userOwner: user[0]._id 
      // });
      // res.status(201).json({ myRecipes });    
      res.status(201);    
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
});