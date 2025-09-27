"use client"

import { useState } from "react"
import {
  Power,
  AlertTriangle,
  Activity,
  Zap,
  MapPin,
  Settings
} from "lucide-react"
import "./dashboard.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Dashboard = () => {
  const [selectedPole, setSelectedPole] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    { title: "Total Devices", value: "247", icon: Activity, color: "#00BFFF" },
    { title: "Active Faults", value: "12", icon: AlertTriangle, color: "#FF4444" },
    { title: "Power Usage", value: "1.2MW", icon: Zap, color: "#32CD32" },
    { title: "Online Poles", value: "235", icon: Power, color: "#00BFFF" },
  ]

  const alerts = [
    { id: 1, message: "High current detected at Pole #47", time: "2 min ago", severity: "high" },
    { id: 2, message: "Voltage fluctuation at Sector 12", time: "5 min ago", severity: "medium" },
    { id: 3, message: "Tilt sensor alert at Pole #23", time: "8 min ago", severity: "high" },
    { id: 4, message: "Normal operation restored at Pole #15", time: "12 min ago", severity: "low" },
  ]

  const poles = [
    { id: 1, x: 20, y: 30, status: "normal" },
    { id: 2, x: 40, y: 25, status: "warning" },
    { id: 3, x: 60, y: 45, status: "critical" },
    { id: 4, x: 80, y: 35, status: "normal" },
    { id: 5, x: 30, y: 60, status: "normal" },
  ]

  return (
    <div className="dashboard-container">
      <div className="main-wrapper">
        <header className="dashboard-header">
          <div className="header-left">
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>
              <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            <div>
              <h1>Dashboard</h1>
              <p>Real-time electricity grid monitoring</p>
            </div>
          </div>
          <div className="header-right">
            <button className="settings-btn">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{ color: stat.color }}>
                  <stat.icon size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="main-content">
            <div className="map-section">
              <div className="map-header">
                <h2>Grid Overview</h2>
                <div className="map-legend">
                  <div className="legend-item">
                    <span className="legend-dot normal"></span>
                    Normal
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot warning"></span>
                    Warning
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot critical"></span>
                    Critical
                  </div>
                </div>
              </div>
              <div className="interactive-map">
                <MapContainer center={[18.457542863645475, 73.87709805840844]} zoom={10} style={{ height: "500px", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[18.46095528315637, 73.87741844661039]}>
                        <Popup>Pole S001 - Active</Popup>
                    </Marker>
                    <Marker position={[18.45644670948127, 73.87804907136866]}>
                        <Popup>Pole S002 - Active</Popup>
                    </Marker>
                    <Marker position={[18.460948887704625, 73.87295595126346]}>
                        <Popup>Pole S003 - Active</Popup>
                    </Marker>
                    <Marker position={[18.460815251728373, 73.88192569046863]}>
                        <Popup>Pole S004 - Active</Popup>
                    </Marker>
                </MapContainer>
              </div>
            </div>

            <div className="alerts-panel">
              <h2>Recent Alerts</h2>
              <div className="alerts-list">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`alert-item ${alert.severity}`}>
                    <div className="alert-icon">
                      <AlertTriangle size={16} />
                    </div>
                    <div className="alert-content">
                      <p>{alert.message}</p>
                      <span className="alert-time">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="control-panel">
            <h2>Quick Controls</h2>
            <div className="control-buttons">
              <button className="control-btn emergency">Emergency Shutdown</button>
              <button className="control-btn warning">Sector Isolation</button>
              <button className="control-btn normal">System Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
