const express = require("express");
const { createHash } = require("crypto");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔴 BURAYI KENDİ DEĞERLERİNLE AYNI YAP
const VERIFICATION_TOKEN = "4ba294997ee1c191211875dce92ace43ac252e2fdadf94f7640a374f1742a1f9";
const ENDPOINT = "https://ebat-webhook.onrender.com/webhook"; // eBay'e yazdığın URL ile harfiyen aynı

// Doğrulama (eBay GET ile challenge_code yollar)
app.get("/webhook", (req, res) => {
  const code = req.query.challenge_code || req.query.challengeCode;
  if (!code) {
    return res.status(400).json({ error: "missing challenge_code" });
  }

  // SHA-256( challenge_code + verificationToken + endpointURL )
  const h = createHash("sha256");
  h.update(String(code));
  h.update(String(VERIFICATION_TOKEN));
  h.update(String(ENDPOINT));
  const challengeResponse = h.digest("hex");

  return res.status(200).json({ challengeResponse });
});

// Gerçek bildirimler (POST) – şimdilik 200 ile ACK ver
app.post("/webhook", (req, res) => res.sendStatus(200));

app.get("/", (_req, res) => res.send("Server çalışıyor"));
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 OK on port ${PORT}`));
