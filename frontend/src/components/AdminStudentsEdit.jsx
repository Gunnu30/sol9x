import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Cookies from 'js-cookie'
const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    age: "",
    dob: "",
    course: "",
    gender: "",
    hobbies: ""
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`https://so3h-backend.vercel.app/api/admin/student/${id}`);
        const data = await res.json();
        setStudent(data.student);
        setFormData({
          name: data.student.name || "",
          email: data.student.email || "",
          role: data.student.role || "",
          age: data.student.age || "",
          dob: data.student.dob || "",
          course: data.student.course || "",
          gender: data.student.gender || "",
          hobbies: Array.isArray(data.student.hobbies)
            ? data.student.hobbies.join(", ")
            : data.student.hobbies || ""
        });
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        hobbies: formData.hobbies.split(",").map((h) => h.trim())
      };

   
        const res = await fetch(`https://so3h-backend.vercel.app/api/admin/student/edit/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`
        },
        body: JSON.stringify(updatedData)
        });


      if (!res.ok) throw new Error("Failed to update student");
      const result = await res.json();
      console.log("Update successful:", result);
      navigate("/admin/dashboard"); // Redirect after update
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="edit-container">
        <h2 className="edit-title">Edit Student</h2>
        {student ? (
            <form onSubmit={handleSubmit} className="edit-form">
            <label className="form-label">
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" />
            </label>
            <label className="form-label">
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
            </label>
            <label className="form-label">
                Role:
                <input type="text" name="role" value={formData.role} onChange={handleChange} className="form-input" />
            </label>
            <label className="form-label">
                Age:
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-input" />
            </label>
            <label className="form-label">
                Date of Birth:
                <DatePicker
                    selected={formData.dob ? new Date(formData.dob) : null}
                    onChange={(date) =>
                    setFormData((prev) => ({
                        ...prev,
                        dob: date.toISOString().split("T")[0]
                    }))
                    }
                    dateFormat="dd-MM-yyyy"
                    className="form-input"
                    placeholderText="Select DOB"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                />
                </label>

            <label className="form-label">
                Course:
                <input type="text" name="course" value={formData.course} onChange={handleChange} className="form-input" />
            </label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>

           <label className="form-label">
        Hobbies (comma-separated):
        <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. Reading, Coding, Music"
        />
        </label>


            <button type="submit" className="form-button">✅ Save Changes</button>
            </form>
        ) : (
            <p className="loading-text">Loading student data...</p>
        )}
        </div>

  );
};

export default EditStudent;
