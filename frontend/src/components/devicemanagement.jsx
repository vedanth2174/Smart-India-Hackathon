"use client"

import { useState, useEffect, useMemo } from "react";
// import { io } from "socket.io-client";
import axios from 'axios';

import {
  Search,
  Filter,
  MoreVertical,
  Power,
  RotateCcw,
  MapPin,
  TrendingUp
} from "lucide-react";
import "./devicemanagement.css";

const DeviceManagement = () => {
  // const socket = io("http://10.72.18.236:5000");
  const [status, setStatus] = useState("OFF");
  const backendUrl = "http://localhost:5000/relay"; // Backend IP
  const [readings, setReadings] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   socket.on("relayUpdate", (state) => {
  //     setRelayState(state);
  //   });

  //   return () => socket.off("relayUpdate");
  // }, []);

  // const new1 = status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://10.72.18.45:5000/api/voltage");
        console.log("Response data:", res.data); // correct object
        setReadings(res.data);
      } catch (err) {
        console.error("Error fetching voltage:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  // log only when reading changes
  useEffect(() => {
  }, [readings]);

  const sendAction = async (action) => {
    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      console.log(data);
      setStatus(action === "start" ? "ON" : "OFF");
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch device list from backend
  useEffect(() => {
    fetch("http://localhost:5000/devices")
      .then(res => res.json())
      .then(data => {
        setDevices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching devices:", err);
        setLoading(false);
      });
  }, []);


  // Socket for real-time updates
  // useEffect(() => {
  //   const socket = io("http://localhost:5000");

  //   socket.on("newData", (data) => {
  //     setDevices(prevDevices =>
  //       prevDevices.map(d =>
  //         d.deviceId === data.deviceId ? { ...d, ...data } : d
  //       )
  //     );

  //     // Update selectedDevice if it's the same
  //     if (selectedDevice?.deviceId === data.deviceId) {
  //       setSelectedDevice(prev => ({ ...prev, ...data }));
  //     }
  //   });

  //   return () => socket.disconnect();
  // }, [selectedDevice]);

  const filteredDevices = useMemo(() => {
    if (!searchTerm) return devices;
    return devices.filter(d =>
      d.deviceId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [devices, searchTerm]);

  if (loading) return <p>Loading devices...</p>;
  const volt = readings ? readings.voltage*280 : 0 
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
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-btn">
          <Filter size={20} /> Filter
        </button>
      </div>

      <div className="device-content">
        {/* Device Table */}
        <div className="device-list">
          <div className="device-table">
            <div className="table-header">
              <div>Device ID</div>
              <div>Location</div>
              <div>Status</div>
              <div>Last Reading</div>
              <div>Actions</div>
            </div>

            {filteredDevices.map(device => (
              <div
                key={device.deviceId}
                className={`table-row ${
                  selectedDevice?.deviceId === device.deviceId ? "selected" : ""
                }`}
                onClick={() => setSelectedDevice(device)}
              >
                <div className="device-id">{device.deviceId}</div>
                <div className="device-location">
                  {device.location?.coordinates
                    ? `${device.location.coordinates[1]}, ${device.location.coordinates[0]}`
                    : "N/A"}
                </div>
                <div className="device-status">
                  <span
                    className="status-indicator"
                    style={{
                      backgroundColor: device.voltageThreshold > 0 ? "#32CD32" : "gray"
                    }}
                  ></span>
                  {device.voltageThreshold ? "Active" : "Inactive"}
                </div>
                <div className="last-reading">
                  {device.timestamp ? new Date(device.timestamp).toLocaleString() : "No Data"}
                </div>
                <div className="device-actions">
                  <button className="action-btn"><MoreVertical size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Device Details */}
        {selectedDevice && (
          <div className="device-details">
            <div className="details-header">
              <h2>{selectedDevice.deviceId}</h2>
              <div className="details-actions">
                <button className="restart-btn"
                onClick={() => sendAction("shutdown")}
                ><RotateCcw size={16} /> Restart</button>
                <button className="shutdown-btn"
                onClick={() => sendAction("start")}
                ><Power size={16} /> Shutdown</button>
              </div>
            </div>

            <div className="details-content">
              <div className="real-time-data">
                <h3>Real-time Readings</h3>
                <div className="readings-grid">
                  <div className="reading-card">
                    <div className="reading-value">A</div>
                    <div className="reading-label">Current</div>
                  </div>
                  <div className="reading-card">
                    <div className="reading-value">{volt}V</div>
                    <div className="reading-label">Voltage</div>
                  </div>
                  <div className="reading-card">
                    <div className="reading-value">°</div>
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
                  <span>
                    {selectedDevice.location?.coordinates
                      ? `${selectedDevice.location.coordinates[1]}, ${selectedDevice.location.coordinates[0]}`
                      : "N/A"}
                  </span>
                </div>
                <div className="map-placeholder">
                  <p>Device Location Map</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceManagement;
