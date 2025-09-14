import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import NavBar from "./NavBar";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import './cssfiles/studdash.css'
const StudentDashboard = () => {
  const { userName, id } = useContext(AuthContext);
  const [student, setStudent] = useState(null); // ✅ store full student object
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (userId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/student/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      });

      const data = await res.json();
      console.log(data);
      setMessage(data.message);
      setStudent(data.student); // ✅ assuming your backend returns { student, message }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  return (
    <>
      <>
      <NavBar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Student Dashboard</h1>

        {userName && (
          <p className="dashboard-welcome">
            Hello, {userName}! You are logged in as a student.
          </p>
        )}

        {student && (
          <div className="student-card">
            <div className="student-field">
              <label>Name:</label>
              <p>{student.name}</p>
            </div>
            <div className="student-field">
              <label>Email:</label>
              <p>{student.email}</p>
            </div>
            <div className="student-field">
              <label>Age:</label>
              <p>{student.age}</p>
            </div>
            <div className="student-field">
              <label>Course:</label>
              <p>{student.course}</p>
            </div>
            <div className="student-field">
              <label>Role:</label>
              <p>{student.role}</p>
            </div>
            <div className="student-field">
              <label>Hobbies:</label>
              <p>{student.hobbies?.length ? student.hobbies.join(", ") : "None"}</p>
            </div>
            <div className="student-field">
              <label>Student ID:</label>
              <p>{student._id}</p>
            </div>
          </div>
        )}

        <div className="dashboard-menu">
          <p>📋 Menu</p>
          <Link to="/student/edit">
            <button className="edit-button">Edit Profile</button>
          </Link>
        </div>
      </div>
    </>

    </>
  );
};

export default StudentDashboard;
