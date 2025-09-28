"use client"

import { Search, Filter, MoreVertical, Power, RotateCcw, MapPin, TrendingUp } from "lucide-react"
import "./devicemanagement.css"
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
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
