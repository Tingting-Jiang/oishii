const mongoose = require('mongoose');
const { ObjectId } = require('mongodb')
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    favRecipeList: [],
    usersRecipe: [],
    usersFollowers: [
        {
            username: String,
            userAvatar:String,
            userId: ObjectId,
        }
    ],
    userAvatar: String,
    location: String,
    dateOfBirth: String,
    bio: String,
    role: {type: String, defaultValue: "normal"}
    
}, {collection: 'oishiiUsers'});
module.exports = userSchema;