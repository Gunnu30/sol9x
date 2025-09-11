import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './navbar.css'
const NavBar = () => {
  const { userName, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // ✅ Redirect after logout
  };

  return (
   <nav className="navbar">
  <div className="navbar-brand ">
    <p className="app-para">Sol9X</p>
  </div>
  <div className="navbar-right">
    {userName ? (
      <>
        <p className="navbar-welcome">Welcome, {userName}!</p>
        <button onClick={handleLogout} className="navbar-logout">Logout</button>
      </>
    ) : (
      <Link to="/login" className="navbar-login">Login</Link>
    )}
  </div>
</nav>

  );
};

export default NavBar;