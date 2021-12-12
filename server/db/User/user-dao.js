const userModel = require('./user-model');
const { ObjectId } = require('mongodb')

const findAllUsers = () =>
    userModel.find().sort({"$natural": -1});

const findUserById = (userId) =>
    userModel.findById(userId);

const findByUsernameAndPassword = ({username, password}) =>
    userModel.findOne({username, password});

const findByUsername = ({username}) =>
   
    userModel.findOne({username});

const createUser = (user) =>
    userModel.create(user);

const updateUser = (user) =>
    userModel.updateOne({id: user.id}, {
        $set: user
    });

const removeFavRecipe = (userID, recipeID) =>
    userModel.updateOne({id: userID},
        { $pull: {favRecipeList: recipeID} });


const addFavRecipe = (userID, recipeID) =>
    userModel.updateOne({id: userID},
        {$push:
                {favRecipeList: {
                        $each: [recipeID],
                        $position :0}
                }});



const deleteUser = (userId) =>
    userModel.deleteOne({id: userId});

const createRecipe = (username, recipe ) =>
    userModel.updateOne({username},
        {$push: {usersRecipe : recipe}});

const getRecipe = ( username, recipeID)=>
    userModel.find({username: username, usersRecipe: ObjectId(recipeID)});


const getUserInfo = (userID) =>
    userModel.find({id: userID},
        {
            usersFollowers: 0,
            __v: 0,
            bio: 0,
            location: 0,
            password: 0,
            dateOfBirth: 0,
            favRecipeList: 0,
            usersRecipe: 0
    
        });




module.exports = {
    findByUsername,
    findAllUsers,
    findUserById,
    findByUsernameAndPassword,
    createUser,
    updateUser,
    deleteUser,
    removeFavRecipe,
    addFavRecipe,
    createRecipe,
    getRecipe,
    getUserInfo
};