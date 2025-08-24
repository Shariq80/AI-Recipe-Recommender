const { GoogleGenerativeAI } = require("@google/generative-ai");

const MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

function buildPrompt({
  ingredients,
  cuisine,
  styleText,
  servings,
  maxTime,
  numRecipes,
}) {
  const style =
    [cuisine, styleText].filter(Boolean).join(" / ").trim() || "'chef's choice";
  const timeStr = maxTime ? `${maxTime} minutes` : "no strict limit";
  return `You are a precise recipe assistant. Generate ${numRecipes || 2} recipes.

Context:
- Ingredients available: ${ingredients.join(", ")}
- Cuisine/style preference: ${style}
- Servings: ${servings || 2}
- Max total time: ${timeStr}

Rules for each recipe:
1) Use primarily the provided ingredients. If you add extras, keep them minimal and common (salt, oil, common spices).
2) Specify a PRIMARY COOKING APPLIANCE as one of: stove, oven, pressure cooker, microwave, air fryer, grill, no-cook.
3) Keep steps concise and numbered.
4) Return ONLY valid JSON matching this schema:

{
  "recipes": [
    {
      "name": "string",
      "appliance": "stove|oven|pressure cooker|microwave|air fryer|grill|no-cook",
      "ingredients": [{"name":"string","amount": "string", "unit":"string"}],
      "steps": ["string", "..."],
      "time_min": number,
      "servings": number,
      "notes": "string"
    }
  ]
}`;
}

async function generateRecipesWithGemini(params) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL });

  const prompt = buildPrompt(params);
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Try to parse JSON from the response
  let jsonText = text.trim();
  // Strip markdown code fences if present
  if (jsonText.startsWith("```")) {
    jsonText = jsonText
      .replace(/^```(json)?/i, "")
      .replace(/```\s*$/m, "")
      .trim();
  }
  try {
    const parsed = JSON.parse(jsonText);
    if (!parsed.recipes) throw new Error("Missing recipes array");
    return { prompt, raw: text, parsed };
  } catch (e) {
    // Second attempt: ask model to reformat into valid JSON
    const repairPrompt = `Convert the following content to valid JSON conforming to the schema above. Only output JSON.\n\nCONTENT:\n${text}`;
    const fix = await model.generateContent(repairPrompt);
    const fixText = fix.response
      .text()
      .trim()
      .replace(/^```(json)?/i, "")
      .replace(/```\s*$/m, "")
      .trim();
    const parsed2 = JSON.parse(fixText);
    return { prompt, raw: fixText, parsed: parsed2 };
  }
}

module.exports = { generateRecipesWithGemini };
