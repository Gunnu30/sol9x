import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './home.css'
const Home = () => {
  const { userName, role, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "student") {
      navigate("/student/dashboard");
    } else {
      alert("Unknown role. Please log in again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return (
  <div className="home-container">
    <h1 className="home-title">Welcome to the Home Page</h1>

    {userName ? (
      <>
        <p className="home-message">
          You're logged in as <span className="home-highlight">{userName}</span>.
        </p>
        <button onClick={handleDashboardRedirect} className="home-button">
          Go to Dashboard
        </button>
      </>
    ) : (
      <>
        <p className="home-message">You're not logged in yet.</p>
        <p className="home-message">
          Please <a href="/login" className="home-link">log in</a> as an admin or student,
          or <a href="/register" className="home-link">register</a> if you're new.
        </p>
      </>
    )}
  </div>
);


};
export default Home;