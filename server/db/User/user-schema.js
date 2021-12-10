const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    // favRecipeList: [
    //     {
    //         recipeID: Number,
    //         recipeName: String,
    //         sourceName: String,
    //         recipeImage: String,
    //
    //     }
    // ],
    favRecipeList: [],
    usersRecipe: [],
    usersFollowers: [
        {
            username: String,
            userAvatar:String,
        }
    ],
    userAvatar: String,
    location: String,
    birthday: Date,
    bio: String,
    // role: {type: String, default :["Admin", "Normal", "Editor"], defaultValue: "Normal"}
    
}, {collection: 'oishiiUsers'});
module.exports = userSchema;