const dao = require('./recipe-dao')
// cosnt filePath = require("../../uploads")
const Base64 = require("base-64")
const FileUtils= require("fileutils")
const IoUtils = require("ioutil")
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
                console.log(recipe.image);
    
                // const filePath = "../../uploads/" + recipe.image;
                const filePath = "/Users/will/2021/fall/Final_Project/oishii/server/uploads/" + recipe.image;
                const fs = require('fs')
                if (fs.existsSync(filePath)) {
                    //file exists
                    console.log("found file!!!")
                }else {
                    console.log("not found!!")
                }
                console.log(filePath);
    
                //
                // const fileContent = FileUtils.readFileToByteArray(new File(filePath));
                // const encodedString = Base64.getEncoder().encodeToString(fileContent);
    
                const img = fs.readFileSync(filePath);
                const encodedString = img.toString('base64');
                recipe.image = encodedString;
                // console.log(recipe.image);
                res.json(recipe)
            })
    };
    
    // app.put("/rest/movies/:id", updateMovie);
    app.post("/db/details", findRecipeById);
    app.post("/rest/recipe", createRecipe);
    // app.delete("/rest/movies/:id", deleteMovie)
    app.get("/rest/recipe", findAllRecipes);
}
