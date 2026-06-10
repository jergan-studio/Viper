const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.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,
});

/**
 * Viper AI Code Upgrader API
 * Works on Vercel serverless functions
 */

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed. Use POST.",
    });
  }

  try {
    const { code } = req.body || {};

    if (!code || code.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "No code provided",
      });
    }

    // Groq AI request
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are Viper AI, a professional code upgrader. You improve code quality, fix bugs, optimize structure, and return ONLY clean code without explanations.",
        },
        {
          role: "user",
          content: `Upgrade this code:\n\n${code}`,
        },
      ],
      temperature: 0.2,
    });

    const upgraded =
      completion.choices?.[0]?.message?.content || "";

    return res.status(200).json({
      success: true,
      upgraded,
    });

  } catch (err) {
    console.error("Viper API Error:", err);

    return res.status(500).json({
      success: false,
      error: "AI upgrade failed",
      details: err.message,
    });
  }
};
