import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import './cssfiles/studdash.css'
import { useNavigate } from 'react-router-dom';

const StudentEdit = () => {
  const { id, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`https://so3h-backend.vercel.app/api/student/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setDetails(data.student);
      } catch (err) {
        console.error("Failed to fetch student:", err);
      }
    };

    fetchStudent();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details.name || !details.email) {
      alert("Name and email are required.");
      return;
    }

    try {
      const res = await fetch(`https://so3h-backend.vercel.app/api/student/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(details)
      });

      const result = await res.json();
      if (result.student) {
        alert("Student details updated successfully!");
        navigate("/student/dashboard")
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong.");
    }
  };

  if (!details) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600">Loading student details...</p>
      </div>
    );
  }

  return (
    <div className="edit-page-container h-screen">
    <form onSubmit={handleSubmit} className="edit-form-container">
        {["name", "email", "course", "hobbies", "age", "gender"].map((field) => (
            <div key={field} className="form-group">
            <label className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
                type="text"
                name={field}
                value={details[field] || ""}
                onChange={handleChange}
                className="form-input"
            />
            </div>
        ))}
        <button type="submit" className="form-button">
            Update Details
        </button>
        </form>
    </div>
  );
};

export default StudentEdit;
