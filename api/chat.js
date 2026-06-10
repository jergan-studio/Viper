const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

module.exports = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: message }],
    });

    return res.json({
      success: true,
      reply: completion.choices[0].message.content,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: "Groq request failed",
      details: err.message,
    });
  }
};
