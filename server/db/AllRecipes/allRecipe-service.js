const allRecipeDao = require('./allRecipe-dao')
const userDao = require('../User/user-dao');


module.exports = (app) => {
    
    const findAllRecipes = (req, res) =>
        allRecipeDao.findAllRecipes()
            .then(movies => res.json(movies));
    
    // const createRecipe = (req, res) => {
    //     allRecipeDao.createRecipe()
    //         .then(status => res.sendStatus(200));
    // };
    
    const findRecipeById = (req, res) =>{
        console.log(" All Recipe find by id", req.body.recipeID);
        allRecipeDao.findRecipeById(req.body.recipeID)
            .then(recipe => {
                if (recipe) {
                    console.log("before return ---", recipe);
                    res.json(recipe);
                    return;
                } else {
                    res.sendStatus(403);
                    
                }
            })
    };
    
    const addFollower = (req, res) =>{
        allRecipeDao.addFollower(req.body._id, req.body.username)
            .then(status => res.sendStatus(200));
    }
    
    const getFollower = (req, res) =>{
        allRecipeDao.getFollowers(req.body.id)
            .then(followers => {
                console.log("all followers --", followers)
                res.json(followers)
            });
    }
    
    
    
    app.post("/db/allRecipe/getRecipeFollowers", findRecipeById);
    // app.post("/db/allRecipe/addRecipe", createRecipe);
    app.post("/db/allRecipe/getAllRecipe", findAllRecipes);
    app.put("/db/allRecipe/addFollower", addFollower);
 
    

}
