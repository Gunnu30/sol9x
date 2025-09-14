const app = require("../backend/app");
const mongoose = require("mongoose");
const { createServer } = require("http");

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
  }

  const server = createServer(app);
  server.emit("request", req, res);
};
