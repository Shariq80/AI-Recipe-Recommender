
# API Specification

**API Version:** v1  
**Owner:** Shariq
**Last Updated:** 2025-08-24

---

## Overview
This API provides endpoints for generating personalized recipes using user-provided ingredients and cooking preferences.  
It supports **manual input** (user types ingredients).

---

## Base URL
`/api`

---

## Endpoints

### 1. Generate Recipes  
**POST** `/recipes/generate`  
Generate recipe recommendations based on provided ingredients, preferences, and constraints.  
#### Request Parameters
| Field         | Type      | Required | Description |
|---------------|-----------|----------|-------------|
| `userId`      | String    | No       | ID of the user (if logged in). |
| `ingredients` | [String]  | Yes (if no `Raise Error`) | List of ingredients provided by the user. |
| `cuisine`     | String    | No       | Preferred cuisine (e.g., `"Italian"`, `"Indian"`). |
| `styleText`   | String    | No       | Additional style instructions (e.g., `"healthy"`, `"spicy"`, `"kid-friendly"`). |
| `servings`    | Number    | No       | Desired number of servings. |
| `numRecipes`  | Number    | No       | Number of recipes to generate (range: 1–4, default: 2).

---

#### Example Request
```json
{
  "userId": "user123",
  "ingredients": ["tomato", "onion", "garlic", "chicken"],
  "cuisine": "Italian",
  "styleText": "Low carb, dinner friendly",
  "servings": 2,
  "numRecipes": 2
}
```
---

#### Success Response
```json
{
  "requestId": "672cb091e3f9b7e4555c1234",
  "response": {
    "recipes": [
      {
        "title": "Garlic Tomato Chicken",
        "ingredients": [
          "2 chicken breasts",
          "1 cup tomato puree",
          "2 cloves garlic",
          "1 onion"
        ],
        "instructions": [
          "Marinate chicken with spices.",
          "Cook garlic and onion in a pan.",
          "Add tomato puree, simmer.",
          "Add chicken, cook until done."
        ],
        "time": 25,
        "servings": 2
      }
    ]
  }
}
```
---

#### Error Response
```json
{
  "error": "No ingredients provided or detected"
}
```
---
#### Error Codes
| Code         | Message      | Notes|
|---------------|-----------|----------|
| 400      | `No ingredients provided`    | Returned if ingredients are missing.|
|500|`Internal Server Error`|Unexpected server error while generating recipes.|
---
## Versioning 
- **v1** → Initial version (supports manual recipe generation).
- Future versions may introduce:
	- Upload-based recipe generation.
	- Ratings and feedback API.
	- Saved recipe endpoints.
---
