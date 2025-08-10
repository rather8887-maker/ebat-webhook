const express = require("express");
const app = express();
const TOKEN = "CNSFUR2025TOKENABCDEF12345678aaaa";

app.all("/webhook", (_req, res) => {
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.status(200).send(TOKEN); // her zaman sabit token
});

app.get("/", (_req, res) => res.send("Server çalışıyor"));
app.listen(process.env.PORT || 3000, () => console.log("OK"));
