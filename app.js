require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/db");
const authRouter = require("./routes/auth");
const protectedRouter = require("./routes/protected");
const scheduleTokenUpdate = require("./services/tokenUpdater");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/api", protectedRouter); // Protected routes

// Database connection
mongoose
  .connect(config.uri, config.options)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    scheduleTokenUpdate();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
