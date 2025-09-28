"use client"

import { Search, Filter, MoreVertical, Power, RotateCcw, MapPin, TrendingUp } from "lucide-react"
import "./devicemanagement.css"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useLocation } from "react-router-dom" // Added useLocation to get navigation state

const DeviceManagement = () => {
<<<<<<< HEAD
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voltage, setVoltage] = useState("Waiting for data...");
=======
  const [voltage, setVoltage] = useState("Waiting for data...")
>>>>>>> 43d90414d9b6179417c4e27cff41572f5b0484c4
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const location = useLocation()

  useEffect(() => {
    const socket = io("http://localhost:5000")

    socket.on("newData", (data) => {
      console.log("Received:", data) // { deviceId, voltage, timestamp }
      setVoltage(`${data.voltage} V`)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

<<<<<<< HEAD
  useEffect(() => {
    fetch("http://localhost:5000/devices") // your backend URL
      .then((res) => res.json())
      .then((data) => {
        setDevices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching devices:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading devices...</p>;

  
=======
  const devices = [
    {
      id: "DEV001",
      location: "Sector A - Pole 12",
      status: "Online",
      lastReading: "2 min ago",
      current: 45.2,
      voltage: voltage.value || 230.5,
      tilt: 0.2,
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    {
      id: "DEV002",
      location: "Sector B - Pole 23",
      status: "Warning",
      lastReading: "1 min ago",
      current: 52.8,
      voltage: 225.1,
      tilt: 2.1,
      coordinates: { lat: 40.7589, lng: -73.9851 },
    },
    {
      id: "DEV003",
      location: "Sector C - Pole 47",
      status: "Critical",
      lastReading: "30 sec ago",
      current: 78.9,
      voltage: 210.3,
      tilt: 5.2,
      coordinates: { lat: 40.7505, lng: -73.9934 },
    },
    {
      id: "DEV004",
      location: "Sector A - Pole 15",
      status: "Online",
      lastReading: "3 min ago",
      current: 42.1,
      voltage: 232.8,
      tilt: 0.1,
      coordinates: { lat: 40.7282, lng: -74.0776 },
    },
  ]

  useEffect(() => {
    if (location.state?.selectedDeviceId) {
      const deviceToSelect = devices.find((device) => device.id === location.state.selectedDeviceId)
      if (deviceToSelect) {
        setSelectedDevice(deviceToSelect)
      }
    }
  }, [location.state])

  const filteredDevices = devices.filter(
    (device) =>
      device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )
>>>>>>> 43d90414d9b6179417c4e27cff41572f5b0484c4


  return (
    <div className="device-management-container">
      <header className="device-header">
        <h1>Device Management</h1>
        <p>Monitor and control LT line devices</p>
        {location.state?.selectedDeviceId && (
          <div
            style={{
              backgroundColor: "#e3f2fd",
              padding: "8px 16px",
              borderRadius: "4px",
              marginTop: "8px",
              fontSize: "14px",
              color: "#1976d2",
            }}
          >
            📍 Navigated from map - Device {location.state.selectedDeviceId} selected
          </div>
        )}
      </header>

      <div className="device-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-btn">
          <Filter size={20} />
          Filter
        </button>
      </div>

      <div className="device-content">
        <div className="device-list">
          <div className="device-table">
            <div className="table-header">
              <div>Device ID</div>
              <div>Location</div>
              <div>Status</div>
              <div>Last Reading</div>
              <div>Actions</div>
            </div>
            {devices.map((device) => (
  <div
    key={device.deviceId}
    className={`table-row ${
      selectedDevice?.deviceId === device.deviceId ? "selected" : ""
    }`}
    onClick={() => setSelectedDevice(device)}
  >
    {/* Device ID */}
    <div className="device-id">{device.deviceId}</div>

    {/* Location */}
    <div className="device-location">
      {device.location?.coordinates
        ? `${device.location.coordinates[1]}, ${device.location.coordinates[0]}`
        : "N/A"}
    </div>

    {/* Voltage Threshold as Status Example */}
    <div className="device-status">
      <span
        className="status-indicator"
        style={{
          backgroundColor:
            device.voltageThreshold && device.voltageThreshold > 0
              ? "#32CD32" // green if threshold is set
              : "gray",   // gray if not set
        }}
      ></span>
      {device.voltageThreshold ? "Active" : "Inactive"}
    </div>

    {/* Last Reading (from timestamp if you merge with DataSchema) */}
    <div className="last-reading">
      {device.timestamp
        ? new Date(device.timestamp).toLocaleString()
        : "No Data"}
    </div>

    {/* Actions */}
    <div className="device-actions">
      <button className="action-btn">
        <MoreVertical size={16} />
      </button>
    </div>
  </div>
))}


          </div>
        </div>

        {selectedDevice && (
          <div className="device-details">
            <div className="details-header">
              <h2>{selectedDevice.id}</h2>
              <div className="details-actions">
                <button className="restart-btn">
                  <RotateCcw size={16} />
                  Restart
                </button>
                <button className="shutdown-btn">
                  <Power size={16} />
                  Shutdown
                </button>
              </div>
            </div>

            <div className="details-content">
              <div className="real-time-data">
                <h3>Real-time Readings</h3>
                <div className="readings-grid">
                  <div className="reading-card">
                    <div className="reading-value">{selectedDevice.current}A</div>
                    <div className="reading-label">Current</div>
                  </div>
                  <div className="reading-card">
                    <div className="reading-value">{selectedDevice.voltage}V</div>
                    <div className="reading-label">Voltage</div>
                  </div>
                  <div className="reading-card">
                    <div className="reading-value">{selectedDevice.tilt}°</div>
                    <div className="reading-label">Tilt</div>
                  </div>
                </div>
              </div>

              <div className="historical-chart">
                <h3>Historical Data</h3>
                <div className="chart-placeholder">
                  <TrendingUp size={48} />
                  <p>24-hour trend chart</p>
                </div>
              </div>

              <div className="device-location-map">
                <h3>Location</h3>
                <div className="location-info">
                  <MapPin size={20} />
                  <span>{selectedDevice.location}</span>
                </div>
                <div className="map-placeholder">
                  <p>Device Location Map</p>
                  <p>
                    Lat: {selectedDevice.coordinates.lat}, Lng: {selectedDevice.coordinates.lng}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeviceManagement
