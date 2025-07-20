import React, { useEffect, useState } from "react";
import axios from "axios";

const ChangeRole = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?._id;

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5170/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users.");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const token = localStorage.getItem("token");

     
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );

      await axios.put(
        `http://localhost:5170/api/roles/change/${id}`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      
      if (id === currentUserId) {
        const updatedUser = { ...currentUser, role: newRole };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      await fetchUsers(); 
    } catch (err) {
      console.error("Error changing role:", err);
      setError(err.response?.data?.message || "Failed to update role.");
      await fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>User Role Management</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && !error ? (
            <tr><td colSpan="4">Loading users...</td></tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="admin">admin</option>
                    <option value="manager">manager</option>
                    <option value="team-lead">team-lead</option>
                    <option value="engineer">engineer</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChangeRole;
