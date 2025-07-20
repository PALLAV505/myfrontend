import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ taskName: '', assignedTo: '', status: 'Pending' });

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5170/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5170/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditClick = (task, index) => {
    setEditIndex(index);
    setEditData({ taskName: task.taskName, assignedTo: task.assignedTo, status: task.status });
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5170/api/tasks/${id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditIndex(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <tr key={task._id}>
                {editIndex === i ? (
                  <>
                    <td><input value={editData.taskName} onChange={(e) => setEditData({ ...editData, taskName: e.target.value })} /></td>
                    <td><input value={editData.assignedTo} onChange={(e) => setEditData({ ...editData, assignedTo: e.target.value })} /></td>
                    <td>
                      <select value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })}>
                        <option value="Pending">Pending</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td> 
                    <td> 
                      <button onClick={() => handleSave(task._id) } >Save</button>
                      <button onClick={() => setEditIndex(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{task.taskName}</td>
                    <td>{task.assignedTo}</td>
                    <td>{task.status}</td>
                    <td>
                      <button onClick={() => handleEditClick(task, i)}>Edit</button>
                      <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
