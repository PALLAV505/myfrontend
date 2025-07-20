import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5170/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.status === 201) {
      
        navigate('/login');
      } else if (response.status === 409) {
        const data = await response.json();
        setError(data.message || "User already exists.");
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container" style={{width:"480px"}}>
      <h2>Register</h2>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      /><br />
      <input
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        required
      /><br />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        required
      /><br />
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit}>Register</button><br />
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Register;
