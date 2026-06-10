const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.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,
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: `
You are Viper AI.

Split the improved code into 3 parts:
- HTML
- CSS
- JS

Return ONLY valid JSON like this:
{
  "html": "...",
  "css": "...",
  "js": "..."
}

If a section is not needed, return empty string.
          `,
        },
        {
          role: "user",
          content: code,
        },
      ],
      temperature: 0.2,
    });

    const text = completion.choices[0].message.content;

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (e) {
      return res.json({
        error: "AI did not return valid JSON",
        raw: text,
      });
    }

    return res.json({
      success: true,
      ...parsed,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
