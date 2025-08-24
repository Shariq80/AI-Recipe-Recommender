# Runbooks

This runbook provides operational guidance for maintaining and troubleshooting the Recipe Generation service.  

##  Service Overview

- **Component:** Recipe Generation Backend  
- **Primary Function:** Accepts ingredients and preferences, generates recipes via LLM, returns structured JSON output.  
- **Critical Path:** `/recipes/generate` → `recipeService.js` → `llmService.js` → Gemini API  

---

##  Common Tasks

### 1. Restart the Service
- **Dockerized Environment**  
  ```bash
  docker compose restart backend
-   **Node.js (local)**
    
    `npm run dev` 
    

----------

### 2. Check Service Health

-   Endpoint health check:
    
    `curl -X POST http://localhost:3000/api/recipes/generate \
      -H "Content-Type: application/json" \
      -d '{"ingredients":"tomato, cheese","numRecipes":1}'` 
    
-   Expect: Valid JSON with `recipes` array.
    

----------

### 3. Logs & Monitoring

-   **Local logs**
    
    `tail -f logs/backend.log` 
    
-   **Error tracing**: Check `console.error` outputs in `recipeService.js` & `llmService.js`.
    
-   **Database logs**: Inspect MongoDB logs if recipe requests/responses are missing.
    

----------

## Troubleshooting

### Issue 1: **No Recipes Generated**

-   **Symptoms:** API returns empty `recipes` array.
    
-   **Steps:**
    
    1.  Check `llmService.js` logs to see if Gemini API returned malformed output.
        
    2.  Validate prompt construction (`prompt-spec.md`).
        
    3.  Retry with simpler input (`ingredients: "chicken, rice"`).
        
----------

### Issue 2: **LLM Output Not JSON**

-   **Symptoms:** API crashes or returns parsing error.
    
-   **Steps:**
    
    1.  Inspect raw response stored in `RecipeResponse.raw`.
        
    2.  Adjust parsing logic in `llmService.js`.
        
    3.  If frequent, update prompt to enforce JSON formatting.
        
----------

### Issue 3: **Database Save Errors**

-   **Symptoms:** Request created but response missing in DB.
    
-   **Steps:**
    
    1.  Check MongoDB connectivity (`mongosh --eval "db.stats()"`).
        
    2.  Validate schema compatibility in `RecipeRequest` and `RecipeResponse`.
        
    3.  Restart MongoDB service if required.
        
----------

### Issue 4: **Slow Responses**

-   **Symptoms:** Requests > 10s response time.
    
-   **Steps:**
    
    1.  Check LLM provider latency (Gemini status dashboard).
        
    2.  Ensure prompt is not too long (over 1k tokens).
        
    3.  Consider caching common inputs (future optimization).
        
----------

### Issue 5: **Server Crash**

-   **Symptoms:** Backend not responding.
    
-   **Steps:**
    
    1.  Restart backend service.
        
    2.  Check logs for uncaught exceptions.
        
    3.  Run `npm test` to catch regressions.

----------

##  Verification After Fix

-   Run `/recipes/generate` smoke test with simple input.
    
-   Verify DB writes (`RecipeRequest`, `RecipeResponse`).
    
-   Confirm monitoring alerts are clear.
    

----------

##  Quick Commands Cheat Sheet

-   **Restart service:**
    
    `npm run dev` 
    
-   **Check logs:**
    
    `tail -f logs/backend.log` 
    
-   **Health check:**
    
    `curl -X POST http://localhost:3000/api/recipes/generate \
      -H "Content-Type: application/json" \
      -d '{"ingredients":"tomato, cheese","numRecipes":1}'` 
    
-   **MongoDB status:**
    
    `mongosh --eval  "db.stats()"` 
    
-   **Restore DB backup:**
    
    `mongorestore --uri="mongodb://localhost:27017" /path/to/backup`