const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let messages = [];

app.post("/api/chat", (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: "Username and message are required" });
  }

  if (messages.length > 100) messages.shift();

  messages.push({ username, message });
  res.json({ success: true });
});

app.get("/api/chat", (req, res) => {
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`Webhook server running at http://localhost:${PORT}`);
});
