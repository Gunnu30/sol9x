import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './index.css'
import NavBar from "./NavBar";
import Cookies from 'js-cookie'
const AdminDashboard = () => {
  const { id, userName } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const getStudentDetails = async () => {
    try {
      const res = await fetch("http://sol9x-mi3ktmohd-tookala-pushpak-ashriths-projects.vercel.app/api/admin/students" , {
        method:"GET"
      });
      if (!res.ok) throw new Error("Failed to fetch student data");
      const data = await res.json();
      console.log(data.students);
      setStudents(data.students); // ✅ assuming your API returns { students: [...] }
    } catch (error) {
      console.error("Error fetching student details:", error);
      setStudents([]);
    }
  };

  useEffect(() => {
    if (id) {
      getStudentDetails();
    }
  }, [id]);

  if (!userName) {
    return <Navigate to="/login" />;
  }

  const handleEdit = (studentId) => {
    navigate(`/admin/student/edit/${studentId}`);
  };
  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
        const res = await fetch(`http://sol9x-mi3ktmohd-tookala-pushpak-ashriths-projects.vercel.app/api/admin/student/delete/${studentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Barier ${Cookies.get("token")}`
        }
        });
        
        if (!res.ok) throw new Error("Failed to delete student");

        // Refresh list after deletion
        setStudents((prev) => prev.filter((s) => s._id !== studentId));
    } catch (error) {
        console.error("Error deleting student:", error);
    }
    };

  
  return (
    <div>
      <NavBar />
      <div>
        <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {userName}</h1>
        <h2 className="dashboard-subtitle">Student Details</h2>
        </div>

        <ul>
          {Array.isArray(students) && students.length > 0 ? (
            students.map((student) => (
              <li key={student._id} className="student-card">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Role:</strong> {student.role}</p>
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>Date of Birth:</strong> 
                {student.dob 
                ? new Date(student.dob).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                    })
                : "Not provided"}
            </p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Hobbies:</strong> 
                {Array.isArray(student.hobbies) && student.hobbies.length > 0
                    ? student.hobbies.join(", ")
                    : "Not provided"}
                </p>


            <button onClick={() => handleEdit(student._id)} className="btn btn-edit">✏️ Edit</button>
            <button onClick={() => handleDelete(student._id)} className="btn btn-delete">🗑️ Delete</button>
            </li>

            ))
          ) : (
            <li>No student data available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
