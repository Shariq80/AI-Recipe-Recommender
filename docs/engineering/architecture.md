
# System Architecture – AI Recipe Recommender

**Document Owner:** Shariq
**Last Updated:** 2025-08-24  

---

## 1. Overview

The AI Recipe Recommender is a **web application** that enables users to input ingredients and preferences, and then generates personalized recipes using an LLM (Google Gemini).  

The system follows a **modular client-server architecture**:

- **Frontend (React.js + Tailwind)** → handles user interactions and form submissions.
- **Backend (Node.js + Express)** → exposes REST API endpoints, manages business logic, and communicates with the database and LLM service.
- **Database (MongoDB)** → stores recipe requests, generated responses, and optional metadata.
- **LLM Service (Gemini API)** → generates recipe text from structured prompts.

---

## 2. High-Level Architecture Diagram(textual)
```
User Web Browser
    |
    V
Frontend: React
	|(Axios API Calls)
    V 
Backend: Express API
	|> MongoDB
	|> LLM Service: Googel AI Studio/Gemini
```
---
## 3. Component Breakdown

### 3.1 Frontend
- **Framework**: React + Tailwind.
- **Key Components**:
  - `QuestionForm.jsx`: ingredient and preference input.
  - `IngredientInput.jsx`: free-text ingredient entry.
  - `RecipeList.jsx`: displays generated recipes.
  - `ErrorBanner.jsx`: handles error messages.
- **Responsibilities**:
  - Collect user input.
  - Display loading states.
  - Render results from API.

### 3.2 Backend
- **Framework**: Node.js + Express.
- **Routes**:
  - `POST /recipes/generate` → generates recipes.
- **Services**:
  - `recipeService.js`: handles business logic (ingredients, request/response persistence).
  - `llmService.js`: constructs prompts and calls Gemini.
- **Responsibilities**:
  - Validate and process API requests.
  - Persist request and response data.
  - Orchestrate calls to LLM.

### 3.3 Database
- **Database**: MongoDB (Mongoose ODM).
- **Collections**:
  - `RecipeRequest`: stores request details.
  - `RecipeResponse`: stores generated recipes and raw LLM output.
- **Responsibilities**:
  - Maintain history of user interactions.
  - Store structured recipes for reproducibility.

### 3.4 LLM Service
- **Provider**: Google AI Studio.
- **Responsibilities**:
  - Accept structured prompts with ingredients/preferences.
  - Return recipes in structured JSON format.
  - Provide raw generation text for debugging.

---

## 4. Data Flow

1. **User enters ingredients** → in frontend form.
2. **Frontend sends request** → to `POST /recipes/generate` with payload.
3. **Backend validates** → ensures ingredients exist.
4. **Backend stores request** → in `RecipeRequest`.
5. **Backend calls LLM** → via `llmService`.
6. **LLM returns structured recipes**.
7. **Backend stores response** → in `RecipeResponse`.
8. **Backend sends recipes** → to frontend.
9. **Frontend renders** → recipe list.

---

## 5. Scalability & Future Enhancements

- **Caching**: introduce Redis to cache frequent queries.
- **Authentication**: optional user login to save recipes.
- **Multi-LLM Support**: abstract LLM provider (Gemini, OpenAI, Anthropic).
- **Observability**: integrate logging and monitoring (Datadog, ELK).
- **Deployment**: containerize backend with Docker, deploy via Replit / Vercel.
---
