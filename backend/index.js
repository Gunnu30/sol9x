const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const studentRoutes = require("./src/routes/student");
const adminRoutes = require("./src/routes/admin");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Replace this with your actual frontend domain
const FRONTEND_URL = "https://solo3-project-6.vercel.app";

// ✅ Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api", adminRoutes);
app.use("/api", studentRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ DB connection error:", error);
  });
