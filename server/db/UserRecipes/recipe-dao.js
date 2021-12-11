const model = require('./recipe-model');
const { ObjectId } = require('mongodb')



const findAllRecipes = () =>
    model.find().sort({"$natural": -1}).limit(4);

const createRecipe = (recipe) =>
    model.create(recipe);


const findRecipeById = (id) =>
    model.find({ id : id });

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



module.exports = {
    findAllRecipes,
    createRecipe,
    findRecipeById,
    findRecipeByTitle,
    findRecipeByFileName
};