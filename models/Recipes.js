const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  dish: { type: String, unique: true },
  description: { type: String, required: true },
  ingredients: [String],
  calories: { type: String, required: true },
});

const Recipes = mongoose.model('recipe', recipeSchema);

module.exports = Recipes;
