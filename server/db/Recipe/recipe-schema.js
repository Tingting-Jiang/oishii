const mongoose = require('mongoose');
const schema = mongoose.Schema({
    Author: String,
    Servings:Number,
    name: String,
    description: String,
    num_servings: Number,
    author_name:String
    
    
}, {collection: 'Menu'});
module.exports = schema;