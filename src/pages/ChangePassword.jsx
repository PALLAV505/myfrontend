import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPass !== confirm) {
      setError("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5170/api/users/change-password",
        { email: user.email, currentPassword: current, newPassword: newPass },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Password changed successfully!");
      setError("");
    } catch {
      setError("Failed to change password");
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Current Password" type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
        <input placeholder="New Password" type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
        <input placeholder="Confirm New Password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;