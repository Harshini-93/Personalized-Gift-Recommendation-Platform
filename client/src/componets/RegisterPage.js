import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("core");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        password,
        role,
      });
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div
      className="questionnaire-container"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleRegister} style={{ width: "300px" }}>
        <h2>Register</h2>
        <div className="input-section">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-input"
          />
        </div>
        <div className="input-section">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-input"
          />
        </div>
        <div className="input-section">
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="text-input"
          >
            <option value="core">Core User</option>
            <option value="admin">Admin User</option>
          </select>
        </div>
        <button type="submit" className="next-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
