const express = require("express");
const { register,login } = require("../controller/authController");
const {getStudent , updateStudent}  = require("../controller/studentController");
const route = express.Router();

route.post("/student/register", register);
route.post("/student/login", login);
route.get("/student/:id", getStudent);
route.put('/student/edit/:id' , updateStudent)
module.exports = route;