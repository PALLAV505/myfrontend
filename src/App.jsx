import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import OwnTask from "./pages/OwnTask";
import TaskList from "./pages/TaskList";
import ChangePassword from "./pages/ChangePassword";
import ChangeRole from "./pages/ChangeRole";
import CreateTask from "./pages/CreateTask";

// NavBar
import NavBar from "./pages/Navbar";

// NotFound fallback
const NotFound = () => <h2 style={{ textAlign: "center", marginTop: "2rem" }}>404 - Page Not Found</h2>;

const App = () => {
  const location = useLocation();
  const hideNav = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!hideNav && <NavBar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/ownTask" element={<OwnTask />} />
        <Route path="/taskList" element={<TaskList />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/changeRole" element={<ChangeRole />} />
        <Route path="/createTask" element={<CreateTask />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;