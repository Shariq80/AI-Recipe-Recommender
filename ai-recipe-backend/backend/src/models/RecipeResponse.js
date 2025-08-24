const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema(
  {
    name: String,
    amount: String,
    unit: String,
  },
  { _id: false },
);

const RecipeSchema = new mongoose.Schema(
  {
    name: String,
    appliance: {
      type: String,
      enum: [
        "stove",
        "oven",
        "pressure cooker",
        "microwave",
        "air fryer",
        "grill",
        "no-cook",
      ],
      default: "stove",
    },
    ingredients: [IngredientSchema],
    steps: [String],
    time_min: Number,
    servings: Number,
    notes: String,
  },
  { _id: false },
);

const RecipeResponseSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecipeRequest",
      index: true,
    },
    recipes: [RecipeSchema],
    raw: mongoose.Schema.Types.Mixed, // store raw LLM output if needed
  },
  { timestamps: true },
);

module.exports = mongoose.model("RecipeResponse", RecipeResponseSchema);
