const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: String,
    summary: String,
    servings:Number,
    readyInMinutes:Number,
    image: String,
    analyzedInstructions: Array,
    extendedIngredients: Array,
    
    
}, {collection: 'recentRecipe'});
module.exports = schema;