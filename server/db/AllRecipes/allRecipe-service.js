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
                    res.json(recipe[0]);
                    return;
                } else {
                    console.log("ERRRRor");
                    res.sendStatus(403);
                    
                }
            })
    };
    
    const addFollower = (req, res) =>{
        allRecipeDao.addFollower(req.body._id, req.body.userID)
            .then(status => res.sendStatus(200));
    }
    
    const getFollower = (req, res) =>{
        allRecipeDao.findRecipeById(req.body.recipeID)
            .then(recipe =>{
                if (recipe) {
                    res.json(recipe[0].followers);
            }})
            .catch( e=> {
                console.log("ERRRRor");
                res.sendStatus(403);
                }
            )
    };
    
    
   
    
    app.post("/db/allRecipe/getRecipeById", findRecipeById);
    // app.post("/db/allRecipe/addRecipe", createRecipe);
    app.post("/db/allRecipe/getAllRecipe", findAllRecipes);
    app.put("/db/allRecipe/addFollower", addFollower);
    app.post("/db/all/getAllFollowers", getFollower);
    
    
    
    
}
