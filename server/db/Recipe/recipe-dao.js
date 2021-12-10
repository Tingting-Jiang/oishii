const model = require('./recipe-model');
const { ObjectId } = require('mongodb')



const findAllRecipes = () => model.find().limit(4);

const createRecipe = (recipe) =>
    model.create(recipe);


const findRecipeById = (id) =>
    model.findById(id);

const findRecipeByTitle = (title) =>
    model.find({"title": { $regex: `${title}`} });

const getRecipeFollowers = (recipeID) =>
    model.find({_id : ObjectId(recipeID)}, {followers: 1});


module.exports = {
    findAllRecipes,
    createRecipe,
    findRecipeById,
    findRecipeByTitle,
    getRecipeFollowers
};