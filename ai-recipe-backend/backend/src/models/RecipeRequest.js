const mongoose = require("mongoose");

const RecipeRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ingredients: [{ type: String }],
    cuisine: String, // dropdown value (e.g., 'Indian')
    styleText: String, // free text (e.g., 'Hyderabadi')
    servings: Number,
    maxTime: Number,
    numRecipes: { type: Number, default: 2 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("RecipeRequest", RecipeRequestSchema);
