const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const groq = new Groq({
  apiKey: process.env.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,
});

/* =========================
   VIPER CODE UPGRADE ENGINE
========================= */
app.post("/api/upgrade", async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: "No code provided",
      });
    }

    const prompt = `
You are Viper AI, a code upgrade engine.

Your job:
- Improve code quality
- Fix bugs
- Optimize structure
- Keep same functionality
- Return ONLY upgraded code (no explanations)

Language: ${language || "auto-detect"}

CODE:
${code}
`;

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        { role: "user", content: prompt }
      ],
    });

    return res.json({
      success: true,
      upgraded: completion.choices[0].message.content,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: "Viper upgrade failed",
      details: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Viper AI running on http://localhost:${PORT}`);
});
