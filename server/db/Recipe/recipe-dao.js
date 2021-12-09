const model = require('./recipe-model');


const findAllRecipes = () => model.find().limit(4);

const createRecipe = (recipe) =>
    model.create(recipe);


const findRecipeById = (id) =>
    model.findById(id);

const findRecipeByTitle = (title) =>
    model.find({title: `/${title}/`});


module.exports = {
    findAllRecipes,
    createRecipe,
    findRecipeById,
    findRecipeByTitle
};