const express = require("express");
const crypto = require("crypto");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eBay developer console'dan aldığın token
const VERIFY_TOKEN = "52161ff4651cb71888801b47bae62f44d7f6d0aab17e70d00f64fc84368ca38f";

// Webhook endpoint
app.all("/webhook", (req, res) => {
  console.log("📩 Gelen istek:", {
    method: req.method,
    query: req.query,
    body: req.body
  });

  const challengeCode =
    req.query.challenge_code ||
    req.body.challenge_code ||
    "";

  if (!challengeCode) {
    return res.status(400).send("challenge_code eksik");
  }

  // eBay'in istediği hash formatı: SHA256(challengeCode + verifyToken)
  const hash = crypto
    .createHash("sha256")
    .update(challengeCode + VERIFY_TOKEN)
    .digest("hex");

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({ challengeResponse: hash });
});

app.get("/", (_req, res) => res.send("Server çalışıyor"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 OK on port ${PORT}`));
