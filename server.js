const express = require("express");
const app = express();

app.use(express.json());

// routes
const chatRoute = require("./api/chat");
app.post("/api/chat", chatRoute);

app.get("/", (req, res) => {
  res.json({ status: "Viper AI running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Viper AI running on", PORT);
});
