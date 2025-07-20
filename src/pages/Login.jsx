import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5170/api/users/login', form);
      localStorage.setItem('token', res.data.token[1]);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container" style={{width:"480px"}}>
      <h2>Login</h2>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        type="email"
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
      <button onClick={handleSubmit}>Login</button><br />
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
}

export default Login;
