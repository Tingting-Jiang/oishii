const mongoose = require('mongoose');
const { ObjectId } = require('mongodb')
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
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
    role: {type: String, default :["Admin", "Normal", "Editor"], defaultValue: "Normal"}
    
}, {collection: 'oishiiUsers'});
module.exports = userSchema;