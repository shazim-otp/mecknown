const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  // CORS Headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;
  const apiKey = process.env.GROQ_API_KEY || "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";

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
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
      res.status(200).json({ response: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: "Invalid response from AI model", details: data });
    }
  } catch (error) {
    console.error("Vercel Function Error:", error);
    res.status(500).json({ error: "Error connecting to AI service" });
  }
};
