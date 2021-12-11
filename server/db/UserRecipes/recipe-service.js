const dao = require('./recipe-dao')
const userDao = require('../User/user-dao');
const imageTransform = require('../../Image/imageTransform')

module.exports = (app) => {
    
    const findAllRecipes = (req, res) =>
        dao.findAllRecipes()
            .then(movies => res.json(movies));
    
    const createRecipe = (req, res) => {
        dao.createRecipe()
            .then((insertedMovie) =>
                res.json(insertedMovie));
    };
    
    const findRecipeById = (req, res) =>{
        console.log(" recipe service", req.body.recipeID);
   
        dao.findRecipeById(req.body.recipeID)
            .then(recipe => {
                recipe.image = imageTransform(recipe.image);
                res.json(recipe)
            })
    };
    
    
    const findRecipeByTitle = (req, res) =>{
        console.log(req.body.title);
        dao.findRecipeByTitle(req.body.title)
            .then( data =>{
                // console.log("returned data", data);
                for (let item of data) {
                    item.image = imageTransform(item.image);
                }
                res.json(data);
                }
            )
    }
    
    
    
    
    const getRecipeFollowers = (req, res) =>{
        let followers = [];
        
        dao.getRecipeFollowers(req.body.recipeID)
            .then(data =>{
                console.log(data);
                for (let item of data) {
                    userDao.findUserById(item)
                        .then(user => {
                            let userInfo = {
                                _id: user._id,
                                userAvatar: imageTransform(user.userAvatar),
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
}
