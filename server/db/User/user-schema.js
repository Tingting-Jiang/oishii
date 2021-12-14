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
    dateOfBirth: String,
    bio: String,
    role: {type: String, defaultValue: "normal"},
    id: Number,
    location: String,
    isDeleted: {type: Boolean, default: false}
    
    
}, {collection: 'oishiiUsers'});
module.exports = userSchema;