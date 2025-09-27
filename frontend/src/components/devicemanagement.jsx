"use client"

import { Search, Filter, MoreVertical, Power, RotateCcw, MapPin, TrendingUp } from "lucide-react"
import "./devicemanagement.css"
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const DeviceManagement = () => {
    const [voltage, setVoltage] = useState("Waiting for data...");
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("newData", (data) => {
      console.log("Received:", data); // { deviceId, voltage, timestamp }
      setVoltage(`${data.voltage} V`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const devices = [
    {
      id: "DEV001",
      location: "Sector A - Pole 12",
      status: "Online",
      lastReading: "2 min ago",
      current: 45.2,
      voltage: {voltage}.value,
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

  const filteredDevices = devices.filter(
    (device) =>
      device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "#32CD32"
      case "Warning":
        return "#FFD700"
      case "Critical":
        return "#FF4444"
      default:
        return "#EBEBEB"
    }
  }

  return (
    <div className="device-management-container">
      <header className="device-header">
        <h1>Device Management</h1>
        <p>Monitor and control LT line devices</p>
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
            {filteredDevices.map((device) => (
              <div
                key={device.id}
                className={`table-row ${selectedDevice?.id === device.id ? "selected" : ""}`}
                onClick={() => setSelectedDevice(device)}
              >
                <div className="device-id">{device.id}</div>
                <div className="device-location">{device.location}</div>
                <div className="device-status">
                  <span className="status-indicator" style={{ backgroundColor: getStatusColor(device.status) }}></span>
                  {device.status}
                </div>
                <div className="last-reading">{device.lastReading}</div>
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
