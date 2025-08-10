const express = require("express");
const app = express();

// Eğer eBay kod göndermiyorsa bu token döner
const FALLBACK_TOKEN = "4ba294997ee1c191211875dce92ace43ac252e2fdadf94f7640a374f1742a1f9";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eBay webhook endpoint
app.all("/webhook", (req, res) => {
  console.log("📩 Gelen istek:", {
    method: req.method,
    query: req.query,
    body: req.body
  });

  // Öncelik gelen challenge_code
  let challenge = req.query.challenge_code ||
                  req.query.challengeCode ||
                  req.body.challenge_code ||
                  req.body.challengeCode;

  // Eğer boşsa fallback token
  if (!challenge) {
    challenge = FALLBACK_TOKEN;
  }

  // eBay'in beklediği format
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({ challenge });
});

// Test sayfası
app.get("/", (_req, res) => res.send("Server çalışıyor"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 OK on port ${PORT}`));
