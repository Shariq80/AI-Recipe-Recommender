const express = require('express');
const { generateRecipes } = require('../services/recipeService');

const router = express.Router();

router.post('/generate', async (req, res, next) => {
  try {
    const { userId, uploadId, ingredients, cuisine, styleText, servings, maxTime, numRecipes } = req.body || {};
    const result = await generateRecipes({ userId, uploadId, ingredients, cuisine, styleText, servings, maxTime, numRecipes });
    res.json({
      requestId: result.request._id,
      response: {
        recipes: result.response.recipes
      }
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
