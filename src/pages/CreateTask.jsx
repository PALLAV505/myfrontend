import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [task, setTask] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task || !assignedTo) {
      setError("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5170/api/tasks", {
        taskName: task,
        status,
        assignedTo,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 201) {
        navigate("/taskList");
      } else {
        setError("Task creation failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="container">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Task Name" value={task} onChange={(e) => setTask(e.target.value)} />
        <input placeholder="Assign To (email)" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </select>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
