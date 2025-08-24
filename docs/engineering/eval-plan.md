
# Evaluation Plan

This document describes the strategy for evaluating recipe generation quality, reliability, and user experience.  

---

##  Goals of Evaluation

1. Ensure generated recipes are **usable, accurate, and safe**.  
2. Verify adherence to **prompt specification** and **API schema**.  
3. Measure **user satisfaction** with recipe outputs.  
4. Detect and prevent **unsafe or irrelevant content**.  

---

##  Evaluation Dimensions

1. **Functional Correctness**
   - Recipes returned in **valid JSON** matching `prompt-spec.md`.
   - All fields populated (title, description, ingredients, steps, servings, time).  
   - Ingredients from user input must appear in recipes.  

2. **Content Quality**
   - Instructions are **clear, step-by-step, and actionable**.  
   - Servings constraint respected.  
   - Style/cuisine preferences reflected where possible.  

3. **Diversity**
   - Multiple requested recipes should be **distinct**.  
   - Avoid trivial variations (e.g., just renaming the dish).  

4. **Safety & Policy Compliance**
   - No harmful instructions.  
   - No disallowed substances (e.g., bleach, unsafe chemicals).  
   - No alcohol unless explicitly requested.  

5. **User Satisfaction**
   - Subjective ratings from test users: “Helpful,” “Neutral,” “Not Useful.”  
   - Track repeat usage / recipe regeneration requests.  

---

##  Evaluation Methodology

### 1. **Automated Checks**
- **Schema Validation**: Ensure JSON matches `prompt-spec.md`.  
- **Ingredient Matching**: Confirm presence of provided ingredients.  
- **Constraint Checks**: Validate servings count and time limits.  

### 2. **Human Review**
- Curate test prompts and review outputs for:
  - Instruction clarity  
  - Creativity / usefulness  
  - Style / cuisine accuracy  

---

##  Test Dataset

- **Seed prompts** covering:  
  - Simple ingredient lists (e.g., “chicken, rice, onion”).  
  - Diverse cuisines (Italian, Indian, Mexican, etc.).  
  - Edge cases (single ingredient).  
  - Vegetarian/vegan scenarios.  

- **Target size**: 50–100 prompts for evaluation rounds.  

---

##  Future Improvements

- Add **automated semantic similarity checks** to measure diversity.  
- Track **cooking trial results** (real users cooking generated recipes).  
- Integrate **dietary safety checks** (e.g., allergens).  
