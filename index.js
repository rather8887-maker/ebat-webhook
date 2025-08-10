const express = require("express");
const app = express();

// eBay token
const FALLBACK = "4ba294997ee1c191211875dce92ace43ac252e2fdadf94f7640a374f1742a1f9";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Webhook endpoint
app.all("/webhook", (req, res) => {
  console.log("📩 Gelen istek:", {
    method: req.method,
    query: req.query,
    body: req.body
  });

  const challenge =
    req.query.challenge_code ||
    req.query.challenge ||
    req.body.challenge_code ||
    req.body.challenge ||
    FALLBACK;

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  return res.status(200).send(JSON.stringify({ challenge }));
});

// Test için ana sayfa
app.get("/", (_req, res) => res.send("Server çalışıyor"));

// Render'da otomatik port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 OK on port ${PORT}`));
