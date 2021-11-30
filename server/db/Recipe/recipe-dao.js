const model = require('./recipe-model');


const findAllRecipes = () => model.find().limit(4);



// const deleteMovie = (id) =>
//     model.removeOne({_id: id});

const createRecipe = (recipe) =>
    model.create(recipe);


const findRecipeById = (id) =>
    model.findById(id);

// const updateMovie = (id, movie) =>
//     model.updateOne({_id: id},
//         {$set: movie});









module.exports = {
    findAllRecipes,
    createRecipe,
    findRecipeById,
};