const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eBay doğrulama endpoint
app.all("/webhook", (req, res) => {
  const q = req.query || {};
  const b = req.body || {};

  const challenge =
    b.challenge ||
    b.challengeCode ||
    b.challenge_code ||
    q.challenge ||
    q.challengeCode ||
    q.challenge_code ||
    b.verificationToken ||
    q.verificationToken ||
    "CNSFUR2025TOKENABCDEF12345678aaaa";

  res.status(200).json({ challenge });
});

// Test sayfası
app.get("/", (_req, res) => res.send("Server çalışıyor"));

app.listen(3000, () => console.log("OK on port 3000"));
