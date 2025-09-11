// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const studentRoutes = require("./src/routes/student");
const adminRoutes   = require("./src/routes/admin");

const app  = express();
const port = process.env.PORT || 5000;

// Allowed origins (dev + prod)
const allowedOrigins = [
  "http://localhost:5173",
  "https://solo3-project-6.vercel.app"
];

// CORS options
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS (handles preflight internally)
app.use(cors(corsOptions));

// Built-in JSON body parser
app.use(express.json());

// ---- Your API Routes ----
app.use("/api", adminRoutes);
app.use("/api", studentRoutes);

// Health-check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Backend is running!" });
});

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err.message);
  res.status(err.statusCode || 500).json({ error: err.message });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  });
})
.catch(error => {
  console.error("❌ DB connection error:", error);
});
