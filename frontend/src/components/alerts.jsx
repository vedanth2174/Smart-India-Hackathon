"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, Clock, Search, Bell } from "lucide-react"
import "./alerts.css"

const Alerts = () => {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const alerts = [
    {
      id: 1,
      message: "Critical: High current detected at Pole #47 - Immediate attention required",
      deviceId: "DEV047",
      timestamp: "2024-01-15 14:23:45",
      severity: "critical",
      status: "active",
      location: "Sector C - Main Line",
    },
    {
      id: 2,
      message: "Warning: Voltage fluctuation detected at Sector 12",
      deviceId: "DEV012",
      timestamp: "2024-01-15 14:18:22",
      severity: "warning",
      status: "acknowledged",
      location: "Sector B - Distribution",
    },
    {
      id: 3,
      message: "Critical: Tilt sensor alert - Pole may be unstable",
      deviceId: "DEV023",
      timestamp: "2024-01-15 14:15:10",
      severity: "critical",
      status: "active",
      location: "Sector A - Residential",
    },
    {
      id: 4,
      message: "Info: Scheduled maintenance completed successfully",
      deviceId: "DEV015",
      timestamp: "2024-01-15 14:10:33",
      severity: "info",
      status: "resolved",
      location: "Sector A - Main Line",
    },
    {
      id: 5,
      message: "Warning: Temperature threshold exceeded",
      deviceId: "DEV089",
      timestamp: "2024-01-15 14:05:17",
      severity: "warning",
      status: "active",
      location: "Sector D - Industrial",
    },
    {
      id: 6,
      message: "Critical: Power outage detected in multiple devices",
      deviceId: "MULTIPLE",
      timestamp: "2024-01-15 13:58:44",
      severity: "critical",
      status: "acknowledged",
      location: "Sector E - Commercial",
    },
  ]

  const filteredAlerts = alerts.filter((alert) => {
    const matchesFilter = filter === "all" || alert.status === filter
    const matchesSearch =
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })


  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "#FF4444"
      case "warning":
        return "#FFD700"
      case "info":
        return "#32CD32"
      default:
        return "#EBEBEB"
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
        return AlertTriangle
      case "warning":
        return AlertTriangle
      case "info":
        return CheckCircle
      default:
        return Bell
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#FF4444"
      case "acknowledged":
        return "#FFD700"
      case "resolved":
        return "#32CD32"
      default:
        return "#EBEBEB"
    }
  }

  const handleAcknowledge = (alertId) => {
    console.log(`Acknowledging alert ${alertId}`)
  }

  const handleResolve = (alertId) => {
    console.log(`Resolving alert ${alertId}`)
  }

  const getAlertCounts = () => {
    return {
      total: alerts.length,
      active: alerts.filter((a) => a.status === "active").length,
      acknowledged: alerts.filter((a) => a.status === "acknowledged").length,
      resolved: alerts.filter((a) => a.status === "resolved").length,
      critical: alerts.filter((a) => a.severity === "critical").length,
    }
  }

  const counts = getAlertCounts()

  return (
    <div className="alerts-container">
      <header className="alerts-header">
        <div className="header-left">
          <h1>Alerts & Notifications</h1>
          <p>Real-time disaster management alerts</p>
        </div>
        <div className="alert-stats">
          <div className="stat-item critical">
            <span className="stat-number">{counts.critical}</span>
            <span className="stat-label">Critical</span>
          </div>
          <div className="stat-item active">
            <span className="stat-number">{counts.active}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-item total">
            <span className="stat-number">{counts.total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </header>

      <div className="alerts-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
            All Alerts
          </button>
          <button className={`filter-btn ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>
            Active
          </button>
          <button
            className={`filter-btn ${filter === "acknowledged" ? "active" : ""}`}
            onClick={() => setFilter("acknowledged")}
          >
            Acknowledged
          </button>
          <button
            className={`filter-btn ${filter === "resolved" ? "active" : ""}`}
            onClick={() => setFilter("resolved")}
          >
            Resolved
          </button>
        </div>
      </div>

      <div className="alerts-feed">
        {filteredAlerts.map((alert) => {
          const SeverityIcon = getSeverityIcon(alert.severity)
          return (
            <div key={alert.id} className={`alert-card ${alert.severity} ${alert.status}`}>
              <div className="alert-icon">
                <SeverityIcon size={24} style={{ color: getSeverityColor(alert.severity) }} />
              </div>

              <div className="alert-content">
                <div className="alert-header">
                  <div className="alert-severity">
                    <span className="severity-badge" style={{ backgroundColor: getSeverityColor(alert.severity) }}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="status-badge" style={{ color: getStatusColor(alert.status) }}>
                      {alert.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="alert-time">
                    <Clock size={14} />
                    {alert.timestamp}
                  </div>
                </div>

                <div className="alert-message">{alert.message}</div>

                <div className="alert-details">
                  <div className="alert-device">Device: {alert.deviceId}</div>
                  <div className="alert-location">Location: {alert.location}</div>
                </div>
              </div>

              <div className="alert-actions">
                {alert.status === "active" && (
                  <>
                    <button className="action-btn acknowledge" onClick={() => handleAcknowledge(alert.id)}>
                      Acknowledge
                    </button>
                    <button className="action-btn resolve" onClick={() => handleResolve(alert.id)}>
                      Resolve
                    </button>
                  </>
                )}
                {alert.status === "acknowledged" && (
                  <button className="action-btn resolve" onClick={() => handleResolve(alert.id)}>
                    Resolve
                  </button>
                )}
                {alert.status === "resolved" && (
                  <div className="resolved-indicator">
                    <CheckCircle size={16} />
                    Resolved
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="no-alerts">
          <Bell size={48} />
          <h3>No alerts found</h3>
          <p>No alerts match your current filter criteria.</p>
        </div>
      )}
    </div>
  )
}

export default Alerts
