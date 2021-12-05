const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    favRecipeList: Array
}, {collection: 'oishiiUsers'});
module.exports = userSchema;