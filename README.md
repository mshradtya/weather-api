# 🌦️ Weather API Wrapper Service

A simple Express.js-based wrapper around the Visual Crossing Weather API, with Redis caching support to reduce redundant API calls and speed up responses. Built as part of the [roadmap.sh](https://roadmap.sh/projects/weather-api-wrapper-service) project list.

---

## 📦 Features

- 🔁 **Weather data caching** with Redis
- 🚀 Fast responses via local cache hits
- 📬 Accepts **US ZIP code** as input
- 🌐 Uses [Visual Crossing Weather API](https://www.visualcrossing.com/)
- 🔒 Environment-based config (API keys, Redis URL)

---

## 🧑‍💻 Tech Stack

- Node.js
- Express.js
- Redis
- Axios
- dotenv
