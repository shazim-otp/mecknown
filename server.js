const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(__dirname));

// POST /api/chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  const apiKey = process.env.GROQ_API_KEY || "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"; // fallback or env

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    
    // Construct messages array
    const messages = [
      {
        role: "system",
        content: "You are Meck AI, a robotics and AI workshop assistant."
      }
    ];

    if (history && Array.isArray(history)) {
      messages.push(...history);
    }

    messages.push({ role: "user", content: message });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      res.json({ response: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: "Invalid response from AI model", details: data });
    }
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: "Error connecting to AI service" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
