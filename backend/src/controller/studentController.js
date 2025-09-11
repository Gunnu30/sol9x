const Student = require('../models/student');

// Get a single student by ID
const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send({ student });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Get all students (admin only)
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Add a new student (admin only)
const addStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).send({ student: newStudent });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(400).send({ message: "Invalid student data" });
  }
};

// Update student by ID

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    let updates = req.body;

    // ✅ Normalize gender if needed
    if (updates.gender) {
      updates.gender = updates.gender.trim();
    }

    // ✅ Ensure hobbies is an array
    if (typeof updates.hobbies === "string") {
      updates.hobbies = updates.hobbies
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h.length > 0);
    }

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).send({ message: "No update data provided" });
    }

    const student = await Student.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true // ✅ Enforce schema validation
    });

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.status(200).send({ student });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// Delete student by ID (admin only)
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  getStudent,
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent
};