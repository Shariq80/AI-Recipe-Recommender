
# UX Flows – AI Recipe Recommender

**Document Owner:** Shariquddin Mohammed
**Last Updated:** 2025-08-23  

---

## 1. Overview

This document describes the user experience (UX) flows for the AI Recipe Recommender web app. It outlines step-by-step interactions, key states, and edge cases for the three main phases: **Ingredients Input → Preferences → Results**.

---

## 2. Primary User Flow

### Step 1: Enter Ingredients
- User lands on the home page.
- Sees a simple form prompting: *“Enter the ingredients you want to use.”*
- User types a free-text list of ingredients (comma-separated or line-separated).
- Example input:  
  `chicken breast, garlic, onion, olive oil, spinach`

**Edge cases:**
- Empty input → show validation message: *“Please enter at least one ingredient.”*
- Unclear input (e.g., gibberish) → accept as-is but flag for model fallback.

---

### Step 2: Fill Preferences
- User proceeds to a second step: a preferences form.
- Fields include:
  - **Cuisine** (dropdown or free-text, e.g., Italian, Indian, Mexican).
  - **Style / Dietary Restrictions** (free-text, e.g., “vegan”, “gluten-free”, “comfort food”).
  - **Servings** (numeric input).
  - **Number of Recipes** (1–4).

**Edge cases:**
- No cuisine specified → model defaults to “any cuisine.”
- Invalid servings (e.g., 0, negative) → fallback to 2.
- Very low max time (e.g., <5 minutes) → warn user or let model handle with quick recipes.

---

### Step 3: Generate Recipes
- User submits preferences.
- Backend request is made with payload:
  ```json
  {
    "ingredients": ["chicken breast", "garlic", "onion", "olive oil", "spinach"],
    "cuisine": "Italian",
    "styleText": "low-carb",
    "servings": 2,
    "numRecipes": 3
  }
- Loader animation is shown while waiting.

**Edge cases:**
- API timeout → show error: "Recipe generation took too long. Please try again."
- API failure → show retry button.
---
### Step 4: Results Display
- User sees a list of recipes, each showing:
	- Title
	- Ingredients List
	- Step-by-step instructions.
	- Estimated cooking time.
	- Serving size
- Option to:
	- Generate again with same preferences
	- Star over ("Create New Recipe").
**Edge cases:**
- No recipes returned → fallback message: "Could not generate recipes. Try adjusting your preferences."
---
## 3. Secondary Flows
- **Reset Flow:** At any point, user can reset app → clears state and returns to "Enter Ingredients" step.
- **Error Handling:** All errors surface in a friendly banner (red highlight with retry options),
- **Mobile Flow:** Input forms and recipe lists collapse into stacked views for mobile users.
---
## 4. Future Enhancements:
- Ingredients autocomplete (e.g., suggest common items as user types).
- Multi-step recipe browsing (paginate recipes if generated recipes > 4).
- Save recipe to user profile (requires auth).
- Export/sharing options (PDF, link, social).
- Voice input for ingredients (mobile-first).