const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const path = require("path");

const app = express();

// Configuration
const { PORT } = 3000;
const { HOST } = "localhost";
const { API_BASE_URL } = "https://poster-rangers-be.onrender.com";

// Proxy
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://poster-rangers-be.onrender.com",
    changeOrigin: true,
  })
);

app.use(express.static(path.join(__dirname, "build")));

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
