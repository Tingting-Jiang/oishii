const model = require('./recipe-model');
const { ObjectId } = require('mongodb')



const findAllRecipes = () => model.find().limit(4);

const createRecipe = (recipe) =>
    model.create(recipe);


const findRecipeById = (id) =>
    model.findById(id);

const findRecipeByFileName = (fileName) =>
    model.find({image: fileName},
        {analyzedInstructions: 0,
            extendedIngredients: 0,
            summary: 0, servings: 0,
            followers:0,
            sourceName: 0,
            image: 0,
            title: 0,
            readyInMinutes: 0,
            __v:0
        });
    
    // model.find({image: fileName});

const findRecipeByTitle = (title) =>
    model.find({"title": { $regex: `${title}`} });

const getRecipeFollowers = (recipeID) =>
    model.find({_id : ObjectId(recipeID)}, {followers: 1});


module.exports = {
    findAllRecipes,
    createRecipe,
    findRecipeById,
    findRecipeByTitle,
    getRecipeFollowers,
    findRecipeByFileName
};