const allRecipeDao = require('./allRecipe-dao')
const userDao = require('../User/user-dao');
const imageTransform = require('../../Image/imageTransform')

module.exports = (app) => {
    
    const findAllRecipes = (req, res) =>
        allRecipeDao.findAllRecipes()
            .then(movies => res.json(movies));
    
    const createRecipe = (req, res) => {
        allRecipeDao.createRecipe()
            .then(status => res.sendStatus(200));
    };
    
    const findRecipeById = (req, res) =>{
        console.log(" recipe service", req.body.recipeID);
    
        allRecipeDao.findRecipeById(req.body.recipeID)
            .then(recipe => {
                recipe.image = imageTransform(recipe.image);
                res.json(recipe)
            })
    };
    
    const addFollower = (req, res) =>{
        allRecipeDao.addFollower(req.body._id, req.body.username)
            .then(status => res.sendStatus(200));
    }
    
    
    
    app.post("/db/getRecipeFollowers", findRecipeById);
    app.post("/db/addRecipe", createRecipe);
    app.get("/db/getAllRecipe", findAllRecipes);
    app.put("/db/addFollower", addFollower);
    

}
