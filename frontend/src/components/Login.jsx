import { Navigate } from "react-router-dom";
import { Component } from "react";
import { AuthContext } from "../context/AuthContext";
import './cssfiles/login.css'
class Login extends Component {
  static contextType = AuthContext;

  state = {
    email: "",
    password: "",
    role: "student",
    isLoading: false,
    redirect: "",
    error: ""
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = this.state;
    this.setState({ isLoading: true, error: "" });

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/${role}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });

      const data = await res.json();
      this.setState({ isLoading: false });

      if (res.ok) {
        this.context.login({
          token: data.token,
          name: data.user.name,
          role: data.user.role,
          id: data.user.id
        });

        this.setState({ redirect: `/${role}/dashboard` });
      } else {
        this.setState({ error: data.message || "Login failed" });
      }
    } catch (error) {
      console.error("Login error:", error);
      this.setState({ isLoading: false, error: "Network error" });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleOnChange}
            autoComplete="email"
            className="form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleOnChange}
            autoComplete="current-password"
            className="form-input"
          />
          <select
            name="role"
            value={this.state.role}
            onChange={this.handleOnChange}
            className="form-input"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          {!this.state.isLoading ? (
            <button type="submit" className="form-button">Login</button>
          ) : (
            <p className="loading-text">Loading...</p>
          )}
          {this.state.error && (
            <p className="error-text">{this.state.error}</p>
          )}
          <p className="register-prompt">You want to Register</p>
          <a href="/register" className="register-link">Register</a>
        </form>
      </div>

    );
  }
}

export default Login;
