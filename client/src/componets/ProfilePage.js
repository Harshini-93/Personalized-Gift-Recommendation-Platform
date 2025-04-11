import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const username = decoded ? decoded.id : "Unknown"; // Using id as a proxy; adjust if username is in token

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
      <div style={{ width: "300px", textAlign: "center" }}>
        <h2>Profile</h2>
        <p>
          <strong>Username:</strong> {username}
        </p>
        <button
          onClick={handleLogout}
          className="next-btn"
          style={{ marginTop: "20px" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
