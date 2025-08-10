const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sabit token
const TOKEN = "cf30940f619f592fc4c76202ebcc147622c43694aa15719d7cdda07dc2d50fa1";

// Webhook endpoint
app.all("/webhook", (req, res) => {
  console.log("📩 Gelen istek:", {
    method: req.method,
    query: req.query,
    body: req.body
  });

  // eBay'in istediği key challengeCode
  res.json({ challengeCode: TOKEN });
});

// Test root
app.get("/", (req, res) => {
  res.send("✅ Server çalışıyor");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 OK on port ${PORT}`);
});
