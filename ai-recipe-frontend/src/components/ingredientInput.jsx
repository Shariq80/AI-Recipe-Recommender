import { useState } from "react";

export default function IngredientInput({ onChange }) {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    if (input.trim()) {
      const newIngredients = [...ingredients, input.trim()];
      setIngredients(newIngredients);
      onChange(newIngredients); // Auto-update parent
      setInput("");
    }
  };

  const removeIngredient = (i) => {
    const newIngredients = ingredients.filter((_, idx) => idx !== i);
    setIngredients(newIngredients);
    onChange(newIngredients); // Auto-update parent
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">Enter Ingredients Manually</h2>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g. tomato, chicken, rice (press Enter to add)"
          className="flex-grow border rounded p-2"
        />
        <button
          onClick={addIngredient}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {ingredients.map((ing, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-gray-200 rounded-full flex items-center"
          >
            {ing}
            <button
              className="ml-2 text-red-500"
              onClick={() => removeIngredient(i)}
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {ingredients.length > 0 && (
        <div className="text-sm text-green-600 text-center">
          ✓ {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''} ready for recipe generation
        </div>
      )}
    </div>
  );
}
