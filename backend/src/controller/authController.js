const jwt = require("jsonwebtoken");
const students = require("../models/student");
const admins = require("../models/admin");
const bcrypt = require("bcrypt");
require("dotenv").config();

const roleModelMap = {
  student: students,
  admin: admins,
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("Registering:", name, email, role);

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase();

    // Validate role
    const Model = roleModelMap[role];
    if (!Model) {
      return res.status(400).send({ message: "Invalid role specified" });
    }

    // Check if user exists
    const userExists = await Model.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).send({ message: "User already exists, please login!" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Model({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Send response
    res.status(201).send({
      message: "Registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).send({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { register };

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const Model = roleModelMap[role];
    if (!Model) {
      return res.status(400).send({ message: "Invalid role specified" });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await Model.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).send({ message: "User not found, please register!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials, please try again!" });
    }

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log(user.name, "from login");

    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", error: error.message });
  }
};
module.exports = { register, login };