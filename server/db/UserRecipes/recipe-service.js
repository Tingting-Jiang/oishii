const dao = require('./recipe-dao')
const userDao = require('../User/user-dao');
const allRecipeDao = require("../AllRecipes/allRecipe-dao")

module.exports = (app) => {
    
    const findAllRecipes = (req, res) =>
        dao.findAllRecipes()
            .then(movies => res.json(movies));
    
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
    
    const getRecipeFollowers = (req, res) => {
        let followers = [];

        dao.getRecipeFollowers(req.body.recipeID)
            .then(data => {
                console.log(data);
                for (let item of data) {
                    userDao.findUserById(item)
                        .then(user => {
                            let userInfo = {
                                _id: user._id,
                                username: user.username
                            };
                            followers.push(userInfo);
                        })
                }
                return followers;
            })
            .then(userList => res.json(userList));
    }

    app.post("/db/details", findRecipeById);
    app.post("/rest/recipe", createRecipe);
    app.get("/rest/recipe", findAllRecipes);
    app.post("/db/searchRecipe", findRecipeByTitle);
    app.post("/db/recipeFollowers", getRecipeFollowers);
    app.post("/db/upload", createRecipe);
    
}
