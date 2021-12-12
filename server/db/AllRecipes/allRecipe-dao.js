const model = require('./allRecipe-model');
const { ObjectId } = require('mongodb')



const findAllRecipes = () => model.find().limit(4);

const addRecipeAndFollower = (recipe) =>
    model.create(recipe);


const findRecipeById = (id) =>
    model.find({id: id});

const addFollower = (id, username) =>
    model.updateOne({"id": id},
        {$push:
                {followers: {
                        $each: [username],
                        $position :0}
                }},
        {upsert: true});
    



const removeFollower = (id, username) =>
    model.updateOne({ "id": id },
        { $pull: { followers: username } });

const getFollowers = (id) =>
    model.find({ "id": id });


module.exports = {
    findAllRecipes,
    addRecipeAndFollower,
    findRecipeById,
    addFollower,
    removeFollower,
    getFollowers
};