
# Database Schema Documentation
## Collection: recipe_requests
- Stores user recipe generation requests
```sql
CREATE TABLE recipe_requests (
  _id             OBJECT_ID PRIMARY KEY,
  userId          VARCHAR(64),          -- ID of requesting user (optional)
  ingredients     JSON NOT NULL,        -- List of ingredients (manual)
  cuisine         VARCHAR(64),          -- Preferred cuisine (optional)
  styleText       TEXT,                 -- Additional style preferences
  servings        INT,                  -- Number of servings
  numRecipes      INT DEFAULT 2,        -- Number of recipes requested (1–4)
  createdAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
------------------------------------------------------
## Collection: recipe_responses
- Stores AI-generated recipe responses
```sql
CREATE TABLE recipe_responses (
  _id             OBJECT_ID PRIMARY KEY,
  requestId       OBJECT_ID NOT NULL,   -- FK to recipe_requests._id
  recipes         JSON NOT NULL,        -- Array of structured recipes
  raw             JSON,                 -- Raw LLM output (prompt + text)
  createdAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
------------------------------------------------------
## Relationships
- recipe_requests._id    ↔ recipe_responses.requestId
------------------------------------------------------
