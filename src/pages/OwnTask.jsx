import React, { useEffect, useState } from "react";
import axios from "axios";

const OwnTask = () => {
  const [tasks, setTasks] = useState([]);
  const email = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5170/api/tasks/user/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (email) fetchTasks();
  }, [email]);

  return (
    <div className="container">
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <tr key={i}>
                <td>{task.taskName}</td>
                <td>{task.assignedTo}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OwnTask;