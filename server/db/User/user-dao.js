const userModel = require('./user-model');
const { ObjectId } = require('mongodb')

const findAllUsers = () =>
    userModel.find();

const findUserById = (userId) =>
    userModel.findById(userId);

const findByUsernameAndPassword = ({username, password}) =>
    userModel.findOne({username, password});

const findByUsername = ({username}) =>
   
    userModel.findOne({username});

const createUser = (user) =>
    userModel.create(user);

const updateUser = (user) =>
    userModel.updateOne({_id: user._id}, {
        $set: user
    });

const updateFavRecipe = (username, favRecipeList) =>

    userModel.updateOne({username: username},
        { $set: {favRecipeList} });

const deleteUser = (userId) =>
    userModel.deleteOne({_id: userId});

const createRecipe = (username, recipe ) =>
    userModel.updateOne({username},
        {$push: {usersRecipe : recipe}});

const getRecipe = ( username, recipeID)=>
    userModel.find({username: username, usersRecipe: ObjectId(recipeID)});


const updateAvatar = (username, userAvatar) =>
    userModel.updateOne({username: username},
        {$set: userAvatar})


module.exports = {
    findByUsername,
    findAllUsers,
    findUserById,
    findByUsernameAndPassword,
    createUser,
    updateUser,
    deleteUser,
    updateFavRecipe,
    createRecipe,
    getRecipe,
    updateAvatar
};