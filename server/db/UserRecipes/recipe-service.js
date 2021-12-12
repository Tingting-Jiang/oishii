const dao = require('./recipe-dao')
const userDao = require('../User/user-dao');
const allRecipeDao = require("../AllRecipes/allRecipe-dao")

module.exports = (app) => {
    const findAllRecipes = (req, res) => {
        console.log("want all recipes");
        dao.findAllRecipes()
            .then(recipes => {
                console.log("all latest recipes", recipes.length)
                console.log(typeof recipes[0].id);
                res.json(recipes)
            })
    };
    
    const createRecipe = (req, res) => {
        const username = req.body.username;
        const recipeId = req.body.recipe.id;
        console.log("id ===", recipeId)
        dao.createRecipe(req.body.recipe)
            .then(status =>{
                userDao.createRecipe(username, recipeId)
                    .then(result => {
                        console.log(`add recipe in ${username} recipe list`);
                    });
                console.log("add recipe in latest recipe list");
                res.sendStatus(200)
            })
    };
    
    const findRecipeById = (req, res) => {
        console.log(" recipe service", req.body.recipeID);
        console.log(typeof req.body.recipeID);
        dao.findRecipeById(req.body.recipeID)
            .then(recipe => {
                // console.log("before return ", recipe);
                res.json(recipe[0])
            })
    };
    
    const findRecipeByTitle = (req, res) => {
        console.log(req.body.title);
        dao.findRecipeByTitle(req.body.title)
            .then(data => {
                    // console.log("returned data", data);
                    res.json(data);
                }
            )
    }
    
    
    app.post("/db/recipe/details", findRecipeById);
    app.post("/db/recipe/getAll", findAllRecipes);
    app.post("/db/recipe/searchRecipe", findRecipeByTitle);
    app.post("/db/recipe/upload", createRecipe);
    
}
