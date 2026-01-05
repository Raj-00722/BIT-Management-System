const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ✅ Root route REQUIRED for Render
app.get("/", (req, res) => {
  res.status(200).send("Backend running successfully");
});

// API routes
app.use("/api", Routes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server ALWAYS
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
