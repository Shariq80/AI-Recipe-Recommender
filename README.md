# 🍳 AI Recipe Recommender

An AI-powered web app that helps users create personalized recipes from ingredients they have on hand.  
Users can manually enter ingredients, set their preferences (cuisine, style, time, servings), and instantly receive curated recipe suggestions powered by an LLM.  

---

##  Features

-  **Manual Ingredient Entry** — Add your available ingredients directly.  
-  **Preference Customization** — Cuisine type, servings, style, and max cooking time.  
-  **AI Recipe Generation** — Recipes generated with contextual prompts sent to Gemini LLM.  
-  **Recipe History** — Requests and responses stored in MongoDB for traceability.  
-  **Documentation** — Structured docs for product, engineering, and social content.  

---

##  Tech Stack

- **Frontend:** React (Tailwind CSS for styling, shadcn/ui components)  
- **Backend:** Node.js + Express  
- **Database:** MongoDB (Mongoose models)  
- **AI Integration:** Gemini (via `llmService`)  
- **Deployment:** (to be decided, e.g., Vercel for frontend, Render/Heroku for backend)  

---

##  Getting Started

### Prerequisites
- Node.js (>= 18.x)  
- MongoDB (local or hosted, e.g., MongoDB Atlas)  
- Gemini API key (or configured LLM service)  

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/ai-recipe-recommender.git
cd ai-recipe-recommender

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```
