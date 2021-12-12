const mongoose = require('mongoose');
const defaultAvatar = "https://firebasestorage.googleapis.com/v0/b/oishii-794ac.appspot.com/o/category-dessert.jpg-1639336882948?alt=media&token=33586928-61f0-4926-a9af-67ebd84cc87e";
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
    userAvatar:{ type: String, defaultValue: `${defaultAvatar}`},
    dateOfBirth: String,
    bio: String,
    role: {type: String, defaultValue: "normal"},
    id: Number
    
    
}, {collection: 'oishiiUsers'});
module.exports = userSchema;