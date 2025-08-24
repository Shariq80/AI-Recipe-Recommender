import React, { useState } from "react";
import api from "../services/api";

function QuestionForm({ onRecipesGenerated, setLoading, setError }) {
  const [cuisine, setCuisine] = useState("");
  const [styleText, setStyleText] = useState("");
  const [servings, setServings] = useState(2);
  const [numRecipes, setNumRecipes] = useState(3);
  const [manualIngredients, setManualIngredients] = useState([]);

  const cuisineOptions = [
    "Italian",
    "Indian",
    "Chinese",
    "Mexican",
    "Mediterranean",
    "Thai",
    "Japanese",
    "French",
    "American",
    "Korean",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/recipes/generate", {
        cuisine: cuisine || undefined,
        styleText: styleText || undefined,
        servings: parseInt(servings),
        numRecipes: parseInt(numRecipes),
        uploadId: "manual-123", // ✅ mark this as manual entry
        ingredients:
          manualIngredients.length > 0 ? manualIngredients : undefined,
      });

      if (res.data.response?.recipes?.length > 0) {
        onRecipesGenerated(res.data.response.recipes);
      } else {
        setError("No recipes could be generated. Try different preferences.");
      }
    } catch (err) {
      console.error("Recipe generation error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to generate recipes. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Recipe Preferences
        </h2>
        <p className="text-gray-600">
          Enter your ingredients and preferences to generate recipes
        </p>
      </div>

      {/* ✅ Free-text ingredient input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Ingredients <span className="text-gray-400">(comma-separated)</span>
        </label>
        <input
          type="text"
          onChange={(e) =>
            setManualIngredients(
              e.target.value
                .split(",")
                .map((i) => i.trim())
                .filter(Boolean),
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="e.g., chicken, rice, onion, garlic"
        />
        <p className="text-xs text-gray-500">
          Enter ingredients separated by commas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* Cuisine Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Preferred Cuisine <span className="text-gray-400">(optional)</span>
          </label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Any cuisine</option>
            {cuisineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Style/Regional Preference */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Cooking Style <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            value={styleText}
            onChange={(e) => setStyleText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="e.g., Spicy, Healthy, Quick & Easy, Comfort Food"
          />
        </div>

        {/* Servings and Number of Recipes */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Servings
            </label>
            <select
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "person" : "people"}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Number of Recipes
            </label>
            <select
              value={numRecipes}
              onChange={(e) => setNumRecipes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "recipe" : "recipes"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
        >
          Generate Recipes
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
