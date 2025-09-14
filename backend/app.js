const express = require("express");
const cors = require("cors");
const studentRoutes = require("./src/routes/student");
const adminRoutes = require("./src/routes/admin");

const app = express();

// ✅ Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://sol9x-project-vercel1.app"
];

// ✅ CORS options
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

// ✅ Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Routes
app.use("/api", adminRoutes);
app.use("/api", studentRoutes);

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Backend is running!" });
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err.message);
  res.status(err.statusCode || 500).json({ error: err.message });
});

module.exports = app;
