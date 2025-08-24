# AI Recipe Recommender - Frontend

This is the **frontend** of the AI Recipe Recommender app, built with **React + Vite + TailwindCSS**.

It allows users to:
1. Upload a photo of ingredients.
2. Answer a few questions (cuisine, style, servings).
3. Get **2 AI-generated recipes** that use the uploaded ingredients and preferences.

---

## 🚀 Tech Stack
- **React 18**
- **Vite** (fast dev server & bundler)
- **Tailwind CSS** (styling)
- **Axios** (API calls)
- Backend: [Express.js + MongoDB] (separate repo)

---

## 📂 Project Structure
```
frontend/
  src/
    components/         # Reusable UI components
    pages/              # App pages (Home, etc.)
    services/           # API integration (axios)
    App.jsx             # Main app logic
    main.jsx            # React entrypoint
    index.css           # Tailwind styles
  package.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  index.html
```

---

## ⚙️ Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Runs on: `http://localhost:5173`

### 3. Connect to Backend
Update `.env` in the frontend root:
```
VITE_BACKEND_URL=http://localhost:8080/api
```

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## 🔗 API Endpoints Used
- `POST /api/upload` → upload ingredient image → returns `uploadId` + detected ingredients
- `POST /api/recipes/generate` → takes `uploadId`, cuisine/style/servings → returns `recipes`

---

## ✨ Features
- Ingredient image upload
- Cuisine/style/servings form
- Recipe results with:
  - Title
  - Appliance needed
  - Ingredients list
  - Step-by-step instructions
- Responsive Tailwind UI

---

## 📌 Next Steps
- Improve error handling (user-friendly messages)
- Add login/profile to save recipes
- Support multiple recipe generations
- Add sharing feature (copy recipe / share on social)

---

👨‍💻 Built for learning & portfolio use.
