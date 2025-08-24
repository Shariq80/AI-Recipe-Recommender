require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { connectDB } = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const uploadRoutes = require("./routes/upload");
const recipeRoutes = require("./routes/recipes");
const historyRoutes = require("./routes/history");

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5000,http://localhost:5001")
  .split(",")
  .filter(Boolean)
  .map(origin => origin.trim());
app.use(
  cors({
    origin: (origin, cb) => {
      console.log("CORS request from origin:", origin);
      // Allow requests with no origin (mobile apps, curl, Postman, etc.)
      if (!origin) return cb(null, true);
      // Allow any localhost requests
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) return cb(null, true);
      // Allow Replit domains
      if (origin.includes('replit.dev') || origin.includes('repl.co')) return cb(null, true);
      // Allow configured origins
      if (allowedOrigins.includes(origin)) return cb(null, true);
      
      console.log("CORS blocked origin:", origin);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// health
app.get("/health", (_req, res) => res.json({ ok: true }));

// routes
app.use("/api/upload", uploadRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/history", historyRoutes);

// 404 + error
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API listening on port ${PORT}`);
      console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err);
    process.exit(1);
  });
