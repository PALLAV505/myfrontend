import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>Sorry, the page you are looking for doesn't exist.</p>
      <Link to="/login" style={styles.link}>Go back to Login</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "10%",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "3rem",
    color: "#e74c3c",
  },
  message: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  link: {
    fontSize: "1rem",
    color: "#3498db",
    textDecoration: "underline",
  },
};

export default NotFound;
