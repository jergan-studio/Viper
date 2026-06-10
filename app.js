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
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Viper AI is running");
});

/* =========================
   UPGRADE ROUTE
========================= */
app.post("/api/upgrade", async (req, res) => {
  try {
    console.log("REQUEST RECEIVED");

    const { code } = req.body;

    if (!code) {
      return res.json({ error: "No code provided" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "user",
          content: `
You are Viper AI. Improve this code and return ONLY the improved code.

CODE:
${code}
          `,
        },
      ],
    });

    return res.json({
      upgraded: completion.choices[0].message.content,
    });

  } catch (err) {
    console.error(err);

    return res.json({
      error: err.message,
    });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Viper AI running on http://localhost:" + PORT);
});
