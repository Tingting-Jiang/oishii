const model = require('./recipe-model');




const findAllRecipes = () =>
    model.find({isDeleted: false}).sort({"$natural": -1}).limit(4);

const createRecipe = (recipe) =>
    model.create(recipe);


const findRecipeById = (id) =>
    model.find({ "id": id });

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

const deleteRecipe = (recipeId) =>
    model.updateOne({id: recipeId},{
        $set: {isDeleted: true}
    });



module.exports = {
    findAllRecipes,
    createRecipe,
    findRecipeById,
    findRecipeByTitle,
    findRecipeByFileName,
    deleteRecipe
};