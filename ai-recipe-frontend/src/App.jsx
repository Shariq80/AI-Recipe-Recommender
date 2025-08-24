import React, { useState } from "react";
import QuestionForm from "./components/QuestionForm";
import RecipeList from "./components/RecipeList";
import Loader from "./components/Loader";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState("preferences"); // start at preferences

  const resetApp = () => {
    setRecipes([]);
    setLoading(false);
    setError("");
    setCurrentStep("preferences");
  };

  const handleRecipesGenerated = (recipes) => {
    setRecipes(recipes);
    setCurrentStep("results");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🍳 AI Recipe Recommender
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your available ingredients and preferences to get personalized recipes
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center ${
                currentStep === "preferences"
                  ? "text-blue-600"
                  : "text-green-600"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  currentStep === "preferences"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium">Preferences</span>
            </div>
            <div
              className={`flex-1 h-1 mx-4 rounded ${
                currentStep === "results" ? "bg-green-600" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex items-center ${
                currentStep === "results" ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  currentStep === "results" ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium">Results</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-md mx-auto mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Preferences Step */}
          {currentStep === "preferences" && (
            <QuestionForm
              onRecipesGenerated={handleRecipesGenerated}
              setLoading={setLoading}
              setError={setError}
            />
          )}

          {/* Loading State */}
          {loading && <Loader />}

          {/* Results Step */}
          {currentStep === "results" && recipes.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <button
                  onClick={resetApp}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create New Recipe
                </button>
              </div>
              <RecipeList recipes={recipes} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
