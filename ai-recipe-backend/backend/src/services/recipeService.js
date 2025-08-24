const RecipeRequest = require("../models/RecipeRequest");
const RecipeResponse = require("../models/RecipeResponse");
const Upload = require("../models/Upload");
const { generateRecipesWithGemini } = require("./llmService");

async function generateRecipes({
  userId,
  uploadId,
  ingredients,
  cuisine,
  styleText,
  servings,
  maxTime,
  numRecipes,
}) {
  let finalIngredients = ingredients || [];
  let realUploadId = null;

  // ✅ Manual mode
  if (uploadId && uploadId.startsWith("manual-")) {
    finalIngredients = ingredients || [];
    realUploadId = null;
  }
  // ✅ Upload mode
  else if ((!finalIngredients || finalIngredients.length === 0) && uploadId) {
    const up = await Upload.findById(uploadId);
    if (up) {
      finalIngredients = up.detectedIngredients || [];
      realUploadId = uploadId;
    }
  }

  // ❌ No ingredients
  if (!finalIngredients || finalIngredients.length === 0) {
    const err = new Error("No ingredients provided or detected");
    err.status = 400;
    throw err;
  }

  // ✅ Save request
  const reqDoc = await RecipeRequest.create({
    userId,
    uploadId: realUploadId,
    ingredients: finalIngredients,
    cuisine,
    styleText,
    servings,
    maxTime,
    numRecipes: Math.min(Math.max(Number(numRecipes) || 2, 1), 4),
  });

  // ✅ Generate with LLM
  const { parsed, raw, prompt } = await generateRecipesWithGemini({
    ingredients: finalIngredients,
    cuisine,
    styleText,
    servings,
    maxTime,
    numRecipes: reqDoc.numRecipes,
  });

  // ✅ Save response
  const respDoc = await RecipeResponse.create({
    requestId: reqDoc._id,
    recipes: parsed.recipes,
    raw: { prompt, raw },
  });

  return { request: reqDoc, response: respDoc };
}

module.exports = { generateRecipes };
