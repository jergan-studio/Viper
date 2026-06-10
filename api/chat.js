const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
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
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content || "";

    return res.json({
      success: true,
      reply,
    });

  } catch (err) {
    console.error("Groq Error:", err);

    return res.status(500).json({
      success: false,
      error: "A server error occurred",
      details: err.message,
    });
  }
});
