import express from "express";
import axios from "axios";
import { createClient } from "redis";
import "dotenv/config";

const app = express();
const port = 3000;
const WEATHER_API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const WEATHER_API_KEY = process.env.VISUALCROSSING_API_KEY;

let redisClient;

(async () => {
  redisClient = createClient();

  redisClient.on("error", (err) => console.error("Redis Client Error", err));

  await redisClient.connect();
  console.log("✅ Connected to Redis");

  app.listen(port, () => {
    console.log(`🚀 Weather API running at http://localhost:${port}`);
  });
})();

app.get("/weather/:zipCode", async (req, res) => {
  try {
    const { zipCode } = req.params;

    const cacheKey = `weather:${zipCode}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("📦 Serving from cache");
      return res.json(JSON.parse(cachedData));
    }

    const response = await axios.get(
      `${WEATHER_API_URL}${zipCode}?key=${WEATHER_API_KEY}`
    );

    const weatherData = response.data.currentConditions;

    await redisClient.set(cacheKey, JSON.stringify(weatherData), {
      EX: 3600,
    });

    console.log("💾 New data cached");
    res.json(weatherData);
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});
