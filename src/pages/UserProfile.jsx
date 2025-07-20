import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  // Reads the user object from localStorage.
  // This will reflect the latest role if ChangeRole component updates localStorage.
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>User Profile</h2>
      <div className="card">
        <p><strong>Username:</strong> {user?.username}</p>
        {/* Displays the role from the 'user' object in localStorage */}
        <p><strong>Role:</strong> {user?.role}</p>
        <button onClick={() => navigate("/changePassword")}>Change Password</button>
      </div>
    </div>
  );
};

export default UserProfile;