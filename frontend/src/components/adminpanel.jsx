"use client"

import { useState } from "react"
import { Users, Plus, Settings, Trash2, Edit, Save, X, Shield, MapPin,Home,Monitor } from "lucide-react"
import "./adminpanel.css"

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users")
  const [editingUser, setEditingUser] = useState(null)
  const [newDevice, setNewDevice] = useState({
    id: "",
    location: "",
    currentThreshold: 50,
    voltageThreshold: 220,
    tiltThreshold: 3,
  })

  const [users, setUsers] = useState([
    { id: 1, name: "John Smith", email: "john@company.com", role: "Admin", status: "Active" },
    { id: 2, name: "Sarah Johnson", email: "sarah@company.com", role: "Engineer", status: "Active" },
    { id: 3, name: "Mike Wilson", email: "mike@company.com", role: "Operator", status: "Inactive" },
    { id: 4, name: "Lisa Brown", email: "lisa@company.com", role: "Engineer", status: "Active" },
  ])

  const [systemSettings, setSystemSettings] = useState({
    currentThreshold: 55,
    voltageThreshold: 215,
    tiltThreshold: 2.5,
    alertFrequency: 30,
    autoShutdown: true,
    maintenanceMode: false,
  })

  const handleUserEdit = (user) => {
    setEditingUser({ ...user })
  }

  const handleUserSave = () => {
    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)))
    setEditingUser(null)
  }

  const handleUserDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const handleDeviceRegister = () => {
    console.log("Registering device:", newDevice)
    setNewDevice({
      id: "",
      location: "",
      currentThreshold: 50,
      voltageThreshold: 220,
      tiltThreshold: 3,
    })
  }

  const handleSettingChange = (setting, value) => {
    setSystemSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "#FF4444"
      case "Engineer":
        return "#FFD700"
      case "Operator":
        return "#32CD32"
      default:
        return "#EBEBEB"
    }
  }

  return (
    <div className="admin-container">
        
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <p>System configuration and user management</p>
      </header>

      <div className="admin-tabs">
        <button className={`tab-btn ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
          <Users size={20} />
          User Management
        </button>
        <button
          className={`tab-btn ${activeTab === "devices" ? "active" : ""}`}
          onClick={() => setActiveTab("devices")}
        >
          <Plus size={20} />
          Device Registration
        </button>
        <button
          className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={20} />
          System Settings
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "users" && (
          <div className="users-section">
            <div className="section-header">
              <h2>User Management</h2>
              <button className="add-user-btn">
                <Plus size={16} />
                Add User
              </button>
            </div>

            <div className="users-table">
              <div className="table-header">
                <div>Name</div>
                <div>Email</div>
                <div>Role</div>
                <div>Status</div>
                <div>Actions</div>
              </div>

              {users.map((user) => (
                <div key={user.id} className="table-row">
                  {editingUser && editingUser.id === user.id ? (
                    <>
                      <div>
                        <input
                          type="text"
                          value={editingUser.name}
                          onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                          className="edit-input"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          value={editingUser.email}
                          onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                          className="edit-input"
                        />
                      </div>
                      <div>
                        <select
                          value={editingUser.role}
                          onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                          className="edit-select"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Engineer">Engineer</option>
                          <option value="Operator">Operator</option>
                        </select>
                      </div>
                      <div>
                        <select
                          value={editingUser.status}
                          onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                          className="edit-select"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      <div className="action-buttons">
                        <button onClick={handleUserSave} className="save-btn">
                          <Save size={14} />
                        </button>
                        <button onClick={() => setEditingUser(null)} className="cancel-btn">
                          <X size={14} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                      <div className="user-role">
                        <span className="role-badge" style={{ backgroundColor: getRoleColor(user.role) }}>
                          {user.role}
                        </span>
                      </div>
                      <div className="user-status">
                        <span className={`status-indicator ${user.status.toLowerCase()}`}>{user.status}</span>
                      </div>
                      <div className="action-buttons">
                        <button onClick={() => handleUserEdit(user)} className="edit-btn">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => handleUserDelete(user.id)} className="delete-btn">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "devices" && (
          <div className="devices-section">
            <div className="section-header">
              <h2>Device Registration</h2>
            </div>

            <div className="device-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Device ID</label>
                  <input
                    type="text"
                    value={newDevice.id}
                    onChange={(e) => setNewDevice({ ...newDevice, id: e.target.value })}
                    placeholder="Enter device ID"
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <div className="location-input">
                    <MapPin size={16} />
                    <input
                      type="text"
                      value={newDevice.location}
                      onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                      placeholder="Enter location"
                    />
                  </div>
                </div>
              </div>

              <div className="threshold-settings">
                <h3>Threshold Configuration</h3>

                <div className="threshold-grid">
                  <div className="threshold-item">
                    <label>Current Threshold (A)</label>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={newDevice.currentThreshold}
                        onChange={(e) =>
                          setNewDevice({ ...newDevice, currentThreshold: Number.parseInt(e.target.value) })
                        }
                        className="threshold-slider"
                      />
                      <span className="threshold-value">{newDevice.currentThreshold}A</span>
                    </div>
                  </div>

                  <div className="threshold-item">
                    <label>Voltage Threshold (V)</label>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="180"
                        max="250"
                        value={newDevice.voltageThreshold}
                        onChange={(e) =>
                          setNewDevice({ ...newDevice, voltageThreshold: Number.parseInt(e.target.value) })
                        }
                        className="threshold-slider"
                      />
                      <span className="threshold-value">{newDevice.voltageThreshold}V</span>
                    </div>
                  </div>

                  <div className="threshold-item">
                    <label>Tilt Threshold (°)</label>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={newDevice.tiltThreshold}
                        onChange={(e) =>
                          setNewDevice({ ...newDevice, tiltThreshold: Number.parseFloat(e.target.value) })
                        }
                        className="threshold-slider"
                      />
                      <span className="threshold-value">{newDevice.tiltThreshold}°</span>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={handleDeviceRegister} className="register-btn">
                <Plus size={16} />
                Register Device
              </button>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-section">
            <div className="section-header">
              <h2>System Settings</h2>
            </div>

            <div className="settings-grid">
              <div className="settings-card">
                <h3>Alert Thresholds</h3>

                <div className="setting-item">
                  <label>Global Current Threshold</label>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={systemSettings.currentThreshold}
                      onChange={(e) => handleSettingChange("currentThreshold", Number.parseInt(e.target.value))}
                      className="threshold-slider"
                    />
                    <span className="threshold-value">{systemSettings.currentThreshold}A</span>
                  </div>
                </div>

                <div className="setting-item">
                  <label>Global Voltage Threshold</label>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="180"
                      max="250"
                      value={systemSettings.voltageThreshold}
                      onChange={(e) => handleSettingChange("voltageThreshold", Number.parseInt(e.target.value))}
                      className="threshold-slider"
                    />
                    <span className="threshold-value">{systemSettings.voltageThreshold}V</span>
                  </div>
                </div>

                <div className="setting-item">
                  <label>Global Tilt Threshold</label>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={systemSettings.tiltThreshold}
                      onChange={(e) => handleSettingChange("tiltThreshold", Number.parseFloat(e.target.value))}
                      className="threshold-slider"
                    />
                    <span className="threshold-value">{systemSettings.tiltThreshold}°</span>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <h3>System Configuration</h3>

                <div className="setting-item">
                  <label>Alert Frequency (seconds)</label>
                  <input
                    type="number"
                    value={systemSettings.alertFrequency}
                    onChange={(e) => handleSettingChange("alertFrequency", Number.parseInt(e.target.value))}
                    className="number-input"
                  />
                </div>

                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={systemSettings.autoShutdown}
                      onChange={(e) => handleSettingChange("autoShutdown", e.target.checked)}
                    />
                    Enable Auto Shutdown
                  </label>
                </div>

                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={systemSettings.maintenanceMode}
                      onChange={(e) => handleSettingChange("maintenanceMode", e.target.checked)}
                    />
                    Maintenance Mode
                  </label>
                </div>
              </div>

              <div className="settings-card">
                <h3>Security</h3>
                <div className="security-info">
                  <Shield size={24} />
                  <p>All system configurations are encrypted and logged for security purposes.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
