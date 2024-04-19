var express = require("express");
var router = express.Router();
const Recipes = require('../models/Recipes');

router.post("/addRecipe", async(req,res) => {
    try {
        const { dish, description, ingredients, calories } = req.body;
    
        const newRecipe = new Recipes({
          dish,
          description,
          ingredients,
          calories,
        });
    
        const savedRecipe = await newRecipe.save();
    
        res.json({ msg: "New Recipe added successfully", recipe: savedRecipe });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
      }
})

router.put("/addIngredients/:dish", async(req, res) => {
    const dishName = req.params.dish;
    const newIngredients = req.body.ingredients;

    if (!Array.isArray(newIngredients) || !newIngredients.every(ing => typeof ing === 'string')) {
        return res.status(400).json({ msg: 'Invalid ingredients format' });
    }

    try {
        const updatedRecipe = await Recipes.findOneAndUpdate(
            { dish: dishName },
            { $push: { ingredients: { $each: newIngredients } } },
            { new: true, runValidators: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ msg: 'Recipe not found' });
        }

        res.json({ msg: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});


router.get("/seeAllRecipes", async(req,res) => {
    try{
        const recipes = await Recipes.find();
        res.json(recipes);
    }
    catch(err) {
        res.status(500).json({ message: 'Error fetching purchases', error: err });
    }
});

router.get("/clickRecipe/:dish", async(req,res) => {
    try{
        const dishname = req.params.dish;
        const recipe = await Recipes.findOne({dish: dishname});

        if (!recipe) {
            return res.status(404).json({ message: ' not found' });
        }
        res.json(recipe);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching purchase', error: err });
    }
});

module.exports = router;