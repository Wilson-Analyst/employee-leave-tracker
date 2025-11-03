import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", { username, password });
      if (response.data === "success") {
        localStorage.setItem("loggedIn", "true");
        navigate("/dashboard");
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title text-center">
          <span className="d-block mb-2">🏢</span>
          Company Name
        </h2>

        <form onSubmit={handleLogin} className="login-form">
          <div className="mb-4">
            <label className="form-label">Username</label>
            <input 
              type="text"
              className="form-control"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input 
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 login-btn mt-2">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;