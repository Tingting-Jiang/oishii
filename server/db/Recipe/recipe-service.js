const dao = require('./recipe-dao')

module.exports = (app) => {
    
    const findAllRecipes = (req, res) =>
        dao.findAllRecipes()
            .then(movies => res.json(movies));
    
    const createRecipe = (req, res) => {
        const recipe = {
            rating: 4.9,
            ...req.body,
        }
        dao.createRecipe(recipe)
            .then((insertedMovie) =>
                res.json(insertedMovie));
    };
    
    const findRecipeById = (req, res) =>
        dao.findRecipeById(req.params.id)
            .then(recipe => res.json(recipe));
    
    // app.put("/rest/movies/:id", updateMovie);
    app.get("/rest/recipe/:id", findRecipeById);
    app.post("/rest/recipe", createRecipe);
    // app.delete("/rest/movies/:id", deleteMovie)
    app.get("/rest/recipe", findAllRecipes);
}
