const dao = require('./recipe-dao')
const Base64 = require("base-64")
const FileUtils= require("fileutils");
const IoUtils = require("ioutil");
const path = require("path");
const fs = require('fs');

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
                // console.log(recipe.image);
                //
                // const file = "../../uploads/" + recipe.image;
                // // const filePath = "/Users/will/2021/fall/Final_Project/oishii/server/uploads/" + recipe.image;
                // const filePath = path.resolve(__dirname, file);
                //
                // // if (fs.existsSync(filePath)) {
                // //     //file exists
                // //     console.log("found file!!!")
                // // }else {
                // //     console.log("not found!!")
                // // }
                //
                // const img = fs.readFileSync(filePath);
                // const encodedString = img.toString('base64');
                // recipe.image = encodedString;
                recipe.image = imageTransform(recipe.image);
                res.json(recipe)
            })
    };
    
    
    const findRecipeByTitle = (req, res) =>{
        dao.findRecipeByTitle(req.body.title)
            .then( data =>{
                data.image = imageTransform(data.image);
                res.json(data);
                }
            )
    }
    
    
    
    
    const imageTransform =(image) =>{
        const file = "../../uploads/" + image;
        // const filePath = "/Users/will/2021/fall/Final_Project/oishii/server/uploads/" + recipe.image;
        const filePath = path.resolve(__dirname, file);
    
        // if (fs.existsSync(filePath)) {
        //     //file exists
        //     console.log("found file!!!")
        // }else {
        //     console.log("not found!!")
        // }
    
        const img = fs.readFileSync(filePath);
        const encodedString = img.toString('base64');
        return encodedString;
    }
    
    // app.put("/rest/movies/:id", updateMovie);
    app.post("/db/details", findRecipeById);
    app.post("/rest/recipe", createRecipe);
    // app.delete("/rest/movies/:id", deleteMovie)
    app.get("/rest/recipe", findAllRecipes);
    app.post("/db/searchRecipe", findRecipeByTitle);
}
