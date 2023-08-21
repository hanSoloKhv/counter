const express = require("express");
const redis = require("redis");

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || "localhost";

const client = redis.createClient({ url: REDIS_URL });

(async () => {
  await client.connect();
})();

app.post("/counter/:id/incr", async (req, res) => {
  const { id } = req.params;
  await client.incr(id);
  const counterValue = await client.get(id);
  res.json({ value: counterValue || 0 });
});

app.get("/counter/:id", async (req, res) => {
  const { id } = req.params;
  const counterValue = await client.get(id);
  res.json({ value: counterValue || 0 });
});

app.listen(PORT, () => {
  console.log(`Counter server listenet on ${PORT}`);
});
