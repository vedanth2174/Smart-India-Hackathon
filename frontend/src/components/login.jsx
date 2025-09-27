"use client"
import {useNavigate} from 'react-router-dom';
import { useState } from "react"
import { LogIn, Eye, EyeOff } from "lucide-react"
import "./login.css"

const Login = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let url = "http://localhost:5000/login"; // Default to login
    let payload = {
        email: formData.email,
        password: formData.password
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || response.statusText || ("Login failed"));
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    navigate("/dashboard") // ✅ better than window.location.href

  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
};

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="power-lines"></div>
        <div className="electric-poles"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <h1>Smart Line Monitor</h1>
          </div>
          <p>Electricity Disaster Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button">
            <LogIn size={20} />
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>Secure access to power grid monitoring</p>
        </div>
      </div>
    </div>
  )
}

export default Login
