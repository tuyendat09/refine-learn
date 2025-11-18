const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const jsonParser = bodyParser.json();

const app = express();

// === Router Config ===
const authRouter = require("./routes/auth.routes");
const categoryRouter = require("./routes/category.routes");

// === Enable CORS ===
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

// === Parse JSON body ===
app.use(jsonParser);

// === Route ===
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);

// === Error Handler ===
app.use(errorHandler);

// === Export App ===
module.exports = app;
