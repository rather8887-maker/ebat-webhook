const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const FALLBACK = "CNSFUR2025TOKENABCDEF12345678aaaa";

// eBay doğrulama: DÜZ METİN olarak token’ı geri ver
app.all("/webhook", (req, res) => {
  const q = req.query || {};
  const b = req.body || {};

  const token =
    b.verificationToken ||
    q.verificationToken ||
    b.challenge || q.challenge ||
    b.challengeCode || q.challengeCode ||
    FALLBACK;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.status(200).send(String(token));
});

app.get("/", (_req, res) => res.send("Server çalışıyor"));
app.listen(process.env.PORT || 3000, () => console.log("OK"));
