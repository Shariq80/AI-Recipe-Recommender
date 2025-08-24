# Prompt Specification
This document describes the structure, guidelines, and examples for prompts used to generate recipes via the LLM (Gemini). The goal is to ensure consistency, reliability, and safe outputs.

---

##  Objectives

- Generate **personalized recipes** based on user-provided ingredients and preferences.  
- Ensure responses are structured in a predictable JSON format for backend validation.  
- Avoid unsafe, harmful, or irrelevant content.  

---

##  Prompt Template

```
You are an expert chef AI that creates recipes from given ingredients.  
The user will provide:
-   Ingredients list (free-text, unstructured)
-   Cuisine preference (optional)
-   Style or mood (optional)
-   Number of servings
-   Number of recipes requested

Generate recipes that:
1.  Are practical, easy to follow, and use the given ingredients.
2.  Suggest reasonable substitutions if needed.
3.  Stay within the serving size constraint.
4.  Reflect the requested cuisine/style where applicable.

Return your answer **strictly in JSON format** with this schema:
{  
"recipes": [  
{  
"title": "string",  
"description": "string",  
"ingredients": ["string"],  
"steps": ["string"],  
"servings": number,  
"time_minutes": number  
}  
]  
}
```

---

##  Example Input → Output

### Example Prompt
```
Ingredients: chicken, garlic, onion, tomatoes, olive oil, salt, pepper  
Cuisine: Italian  
Style: Comfort food  
Servings: 2  
Number of Recipes: 2
```

### Example LLM Output
```json
{
  "recipes": [
    {
      "title": "Garlic Tomato Chicken",
      "description": "A quick Italian-inspired chicken dish with rich tomato sauce.",
      "ingredients": [
        "2 chicken breasts",
        "2 cloves garlic",
        "1 onion",
        "2 tomatoes",
        "2 tbsp olive oil",
        "Salt",
        "Black pepper"
      ],
      "steps": [
        "Heat olive oil in a pan.",
        "Sauté garlic and onion until fragrant.",
        "Add diced tomatoes and cook until soft.",
        "Add chicken breasts, season with salt and pepper.",
        "Cook until chicken is done and sauce thickens."
      ],
      "servings": 2,
      "time_minutes": 25
    },
    {
      "title": "Italian Chicken Bruschetta",
      "description": "Pan-seared chicken topped with fresh tomato-garlic bruschetta.",
      "ingredients": [
        "2 chicken breasts",
        "2 tomatoes",
        "2 cloves garlic",
        "1 tbsp olive oil",
        "Salt",
        "Black pepper"
      ],
      "steps": [
        "Season chicken with salt and pepper, then pan-sear until golden.",
        "Dice tomatoes and garlic, mix with olive oil, salt, and pepper.",
        "Top chicken with tomato mixture and serve immediately."
      ],
      "servings": 2,
      "time_minutes": 20
    }
  ]
}
```
## Constraints
- **Strict JSON Only:** No extra text, comments, or explanations.
- **Ingredient Flexibility:** LLM may add minor pantry staples (oil, water, salt) if reasonable.
- **Safe Content:** No alcohol unless explicitly requested; no unsafe or harmful recipes.
---
## Future Enhancements
- Add nutrition facts to responses.
- Support dietary restrictions (vegetarian, vegan, gluten-free, halal).
- Enable multi-turn refinement (e.g., "make it spicier", "reduce salt"),