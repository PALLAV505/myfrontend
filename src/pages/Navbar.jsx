import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", background: "#4f46e5" , color: "white" , display: "flex" , justifyContent: "space-evenly", alignItems:"center" ,}}>
      <Link to="/profile" style={{color: "white", textDecoration: "none"}}>Profile</Link> |{" "}
      <Link to="/createTask" style={{color: "white" ,textDecoration: "none"}}>Create Task</Link> |{" "}
      <Link to="/taskList" style={{color: "white",textDecoration: "none"}}>All Tasks</Link> |{" "}
      <Link to="/ownTask" style={{color: "white",textDecoration: "none"}}>Your Tasks</Link> |{" "}
      <Link to="/changeRole" style={{color: "white",textDecoration: "none"}}>Roles</Link> |{" "}
      <Link to="/change-password" style={{color: "white",textDecoration: "none"}}>Change Password</Link> |{" "}
      <button onClick={handleLogout} style={{ border: "none", background: "#a78bfa", cursor: "pointer", color: "white" }}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
