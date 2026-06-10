const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* =========================
   ROUTES
========================= */

// Upgrade system
const upgradeRoute = require("./api/upgrade");
app.use("/api/upgrade", upgradeRoute);

/* =========================
   AI CORE (PLACEHOLDER)
   Day 3+ we connect Groq / OpenAI here
========================= */

app.post("/api/chat", async (req, res) => {
  try {
    const { message, userId, model } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    // TEMP AI RESPONSE (replace with Groq/OpenAI later)
    const response = {
      success: true,
      reply: `Viper AI received: "${message}"`,
      model: model || "viper-basic",
      timestamp: Date.now(),
    };

    return res.json(response);
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.json({
    name: "Viper AI",
    status: "running",
    version: "1.0.0",
    endpoints: [
      "/api/chat",
      "/api/upgrade/check",
      "/api/upgrade/list",
      "/api/upgrade/latest",
    ],
  });
});

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🟣 Viper AI running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
