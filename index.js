const express = require("express");
const crypto = require("crypto");
const app = express();

const VERIFICATION_TOKEN = "52161ff4651cb71888801b47bae62f44d7f6d0aab17e70d00f64fc84368ca38f";
const ENDPOINT_URL = "https://ebat-webhook.onrender.com/webhook";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/webhook", (req, res) => {
  console.log("📩 Gelen istek:", {
    method: req.method,
    query: req.query,
    body: req.body
  });

  // eBay'in challenge_code'u
  const challengeCode =
    req.query.challenge_code ||
    req.query.challengeCode ||
    req.body.challenge_code ||
    req.body.challengeCode ||
    "";

  // SHA256 ile resmi formatta cevap
  const challengeResponse = crypto
    .createHash("sha256")
    .update(challengeCode)
    .update(VERIFICATION_TOKEN)
    .update(ENDPOINT_URL)
    .digest("hex");

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({ challengeResponse });
});

app.get("/", (_req, res) => res.send("Server çalışıyor"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 OK on port ${PORT}`));
