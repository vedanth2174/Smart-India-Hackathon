import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/dashboard" className="navbar-logo">
            Smart Line Monitor
          </Link>
        </div>
        
        <div className="navbar-menu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/device-management" 
                className={`nav-link ${isActive('/device-management') ? 'active' : ''}`}
              >
                Device Management
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/alerts" 
                className={`nav-link ${isActive('/alerts') ? 'active' : ''}`}
              >
                Alerts
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/analytics" 
                className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}
              >
                Analytics
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin-panel" 
                className={`nav-link ${isActive('/admin-panel') ? 'active' : ''}`}
              >
                Admin Panel
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="navbar-actions">
          <button 
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
