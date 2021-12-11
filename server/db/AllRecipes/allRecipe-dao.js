const model = require('./allRecipe-model');
const { ObjectId } = require('mongodb')



const findAllRecipes = () => model.find().limit(4);

const addRecipeAndFollower = (recipe) =>
    model.create(recipe);


const findRecipeById = (id) =>
    model.findById(id);

const addFollower = (id, username) =>
    model.updateOne({id: id},
        {$push:
                {followers: {
                        $each: [username],
                        $position :0}
                }},
        {upsert: true});
    



const removeFollower = (id, username) =>
    model.updateOne({ id: id },
        { $pull: { followers: username } });




module.exports = {
    findAllRecipes,
    addRecipeAndFollower,
    findRecipeById,
    addFollower,
    removeFollower,
};