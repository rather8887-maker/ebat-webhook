const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/webhook", (req, res) => {
  console.log("📩 Gelen istek:", {
    method: req.method,
    query: req.query,
    body: req.body
  });

  const code =
    req.query.challenge_code ||
    req.body.challenge_code ||
    req.query.challengeCode ||
    req.body.challengeCode ||
    "";

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({ challengeCode: code });
});

app.get("/", (_req, res) => res.send("Server çalışıyor"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 OK on port ${PORT}`));
