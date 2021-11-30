const mongoose = require('mongoose');
const schema = mongoose.Schema({
    ID: Number,
    thumbnail_url: String,
    name: String,
    description: String,
    num_servings: Number,
    author_name:String
    
    
}, {collection: 'oishii'});
module.exports = schema;