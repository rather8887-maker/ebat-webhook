const express = require("express");
const app = express();

const TOKEN = "4ba294997ee1c191211875dce92ace43ac252e2fdadf94f7640a374f1742a1f9";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/webhook", (req, res) => {
  console.log("📩 Gelen istek:", {
    method: req.method,
    query: req.query,
    body: req.body
  });

  // Hangi key geldiyse onu kullan
  const key =
    ("challenge_code" in req.query && "challenge_code") ||
    ("challenge_code" in req.body && "challenge_code") ||
    ("challengeCode"  in req.query && "challengeCode")  ||
    ("challengeCode"  in req.body && "challengeCode")  ||
    ("challenge"      in req.query && "challenge")      ||
    ("challenge"      in req.body  && "challenge")      ||
    ("verificationToken" in req.query && "verificationToken") ||
    ("verificationToken" in req.body  && "verificationToken") ||
    "challengeCode"; // hiçbiri yoksa default

  const val =
    (req.query && req.query[key]) ||
    (req.body  && req.body[key])  ||
    TOKEN;

  return res.status(200).json({ [key]: val });
});

app.get("/", (_req, res) => res.send("Server çalışıyor"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 OK on port ${PORT}`));
