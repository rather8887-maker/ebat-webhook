const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TOKEN = "CNSFUR2025TOKENABCDEF12345678aaaa";

// eBay ne gönderirse **aynı key** ile geri yansıt.
// Yoksa varsayılan olarak verificationToken döndür.
app.all("/webhook", (req, res) => {
  const q = req.query || {};
  const b = req.body || {};

  // Gönderilen olası anahtarları sırayla kontrol et
  const key =
    (b && "verificationToken" in b && "verificationToken") ||
    (q && "verificationToken" in q && "verificationToken") ||
    (b && "challenge" in b && "challenge") ||
    (q && "challenge" in q && "challenge") ||
    (b && "challengeCode" in b && "challengeCode") ||
    (q && "challengeCode" in q && "challengeCode") ||
    "verificationToken"; // fallback key

  const val =
    (b && b[key]) ||
    (q && q[key]) ||
    TOKEN;

  res.set("Content-Type", "application/json; charset=utf-8");
  return res.status(200).json({ [key]: val });
});

// Basit test
app.get("/", (_req, res) => res.send("Server çalışıyor"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`OK on port ${PORT}`));
