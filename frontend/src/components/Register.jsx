import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import "./cssfiles/register.css"; // ✅ Import your CSS

class Register extends Component {
  static contextType = AuthContext;

  state = {
    name: "",
    email: "",
    password: "",
    role: "student",
    isLoading: false,
    redirect: "",
    error: ""
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = this.state;
    this.setState({ isLoading: true, error: "" });

    try {
      const res = await fetch(`https://so3h-backend.vercel.app/api/${role}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();
      this.setState({ isLoading: false });

      if (res.ok) {
        Cookies.set("token", data.token);
        Cookies.set("userName", data.user.name);
        Cookies.set("role", data.user.role);
        Cookies.set("id", data.user.id);

        this.context.login({
          token: data.token,
          name: data.user.name,
          role: data.user.role,
          id: data.user.id
        });

        this.setState({
          name: "",
          email: "",
          password: "",
          role: "student",
          redirect: `/${role}/dashboard`
        });
      } else {
        this.setState({ error: data.message || "Registration failed" });
      }
    } catch (error) {
      console.error("Registration error:", error);
      this.setState({ isLoading: false, error: "Network error" });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    return (
      <div className="register-container">
        <form className="register-form" onSubmit={this.handleSubmit}>
          <h2 className="form-title">Create Account</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={this.state.name}
            onChange={this.handleChange}
            autoComplete="name"
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleChange}
            autoComplete="email"
            className="form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete="new-password"
            className="form-input"
          />
          <select
            name="role"
            value={this.state.role}
            onChange={this.handleChange}
            className="form-input"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          {!this.state.isLoading ? (
            <button type="submit" className="form-button">Register</button>
          ) : (
            <p className="loading-text">Creating account...</p>
          )}

          {this.state.error && (
            <p className="error-text">{this.state.error}</p>
          )}

          <p className="form-footer">Already have an account?</p>
          <Link to="/login" className="form-link">Login</Link>
        </form>
      </div>
    );
  }
}

export default Register;
