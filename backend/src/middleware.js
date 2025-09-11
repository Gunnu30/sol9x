const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).send({ message: "Forbidden: Admins only" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token", error: error.message });
  }
};

module.exports = { verifyAdmin };
