const model = require('./recipe-model');


const findAllRecipes = () => model.find().limit(4);

const createRecipe = (recipe) =>
    model.create(recipe);


const findRecipeById = (id) =>
    model.findById(id);


module.exports = {
    findAllRecipes,
    createRecipe,
    findRecipeById,
};