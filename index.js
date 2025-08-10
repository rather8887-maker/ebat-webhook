const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/webhook", (req, res) => {
  const q = req.query || {};
  const b = req.body || {};

  // Gelen key'i sırayla kontrol et ve HANGİ İSİMLE geldiyse AYNI İSİMLE geri yolla
  const key =
    (b && "challenge_code" in b && "challenge_code") ||
    (q && "challenge_code" in q && "challenge_code") ||
    (b && "challengeCode" in b && "challengeCode") ||
    (q && "challengeCode" in q && "challengeCode") ||
    (b && "challenge" in b && "challenge") ||
    (q && "challenge" in q && "challenge") ||
    (b && "verificationToken" in b && "verificationToken") ||
    (q && "verificationToken" in q && "verificationToken") ||
    "challenge_code"; // yoksa defaults: challenge_code

  const val = (b && b[key]) || (q && q[key]) || "4ba294997ee1c191211875dce92ace43ac252e2fdadf94f7640a374f1742a1f9";

  res.status(200).json({ [key]: val });
});

app.get("/", (_req, res) => res.send("✅ Server çalışıyor"));
app.listen(process.env.PORT || 3000, () => console.log("🚀 OK on port " + (process.env.PORT || 3000)));
