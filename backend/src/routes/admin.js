const express = require("express");
const {
  getStudent,
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent
} = require("../controller/studentController");
const { register, login } = require("../controller/authController");
const { verifyAdmin } = require("../middleware");

const router = express.Router();

router.post("/admin/register", register);
router.post("/admin/login", login);
router.get("/admin/student/:id", getStudent);
router.get("/admin/students", getAllStudents);
router.post("/admin/student", addStudent);
router.patch("/admin/student/edit/:id", verifyAdmin, updateStudent);
router.delete("/admin/student/delete/:id", verifyAdmin, deleteStudent);

module.exports = router;
