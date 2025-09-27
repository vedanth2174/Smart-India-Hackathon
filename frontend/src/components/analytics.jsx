"use client"

import { useState } from "react"
import { Calendar, Download, TrendingUp, BarChart3, Activity, FileText } from "lucide-react"
import "./analytics.css"

const Analytics = () => {
  const [dateRange, setDateRange] = useState("7days")
  const [selectedChart, setSelectedChart] = useState("consumption")

  const chartData = {
    consumption: [
      { time: "00:00", value: 850 },
      { time: "04:00", value: 720 },
      { time: "08:00", value: 1200 },
      { time: "12:00", value: 1450 },
      { time: "16:00", value: 1380 },
      { time: "20:00", value: 1100 },
      { time: "24:00", value: 900 },
    ],
    faults: [
      { day: "Mon", count: 3 },
      { day: "Tue", count: 1 },
      { day: "Wed", count: 5 },
      { day: "Thu", count: 2 },
      { day: "Fri", count: 4 },
      { day: "Sat", count: 1 },
      { day: "Sun", count: 2 },
    ],
  }

  const heatmapData = [
    { sector: "A", faults: 12, color: "#FF4444" },
    { sector: "B", faults: 5, color: "#FFD700" },
    { sector: "C", faults: 18, color: "#FF4444" },
    { sector: "D", faults: 2, color: "#32CD32" },
    { sector: "E", faults: 8, color: "#FFD700" },
    { sector: "F", faults: 1, color: "#32CD32" },
  ]

  const exportData = (format) => {
    console.log(`Exporting data as ${format}`)
  }

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <div className="header-left">
          <h1>Analytics & Reports</h1>
          <p>Electricity usage and fault analysis</p>
        </div>
        <div className="header-controls">
          <div className="date-selector">
            <Calendar size={20} />
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="24hours">Last 24 Hours</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>
          <div className="export-buttons">
            <button onClick={() => exportData("pdf")} className="export-btn pdf">
              <FileText size={16} />
              PDF
            </button>
            <button onClick={() => exportData("excel")} className="export-btn excel">
              <Download size={16} />
              Excel
            </button>
          </div>
        </div>
      </header>

      <div className="analytics-content">
        <div className="chart-tabs">
          <button
            className={`tab-btn ${selectedChart === "consumption" ? "active" : ""}`}
            onClick={() => setSelectedChart("consumption")}
          >
            <TrendingUp size={20} />
            Consumption Trends
          </button>
          <button
            className={`tab-btn ${selectedChart === "faults" ? "active" : ""}`}
            onClick={() => setSelectedChart("faults")}
          >
            <BarChart3 size={20} />
            Fault Frequency
          </button>
          <button
            className={`tab-btn ${selectedChart === "performance" ? "active" : ""}`}
            onClick={() => setSelectedChart("performance")}
          >
            <Activity size={20} />
            Performance
          </button>
        </div>

        <div className="main-charts">
          {selectedChart === "consumption" && (
            <div className="chart-container">
              <h2>Electricity Consumption Trends</h2>
              <div className="line-chart">
                <svg viewBox="0 0 800 300" className="chart-svg">
                  <defs>
                    <linearGradient id="consumptionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <line
                      key={i}
                      x1="50"
                      y1={50 + i * 40}
                      x2="750"
                      y2={50 + i * 40}
                      stroke="rgba(235, 235, 235, 0.1)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Chart line */}
                  <polyline
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="3"
                    points={chartData.consumption
                      .map((point, index) => `${50 + index * 116},${250 - (point.value / 1500) * 200}`)
                      .join(" ")}
                  />

                  {/* Fill area */}
                  <polygon
                    fill="url(#consumptionGradient)"
                    points={`50,250 ${chartData.consumption
                      .map((point, index) => `${50 + index * 116},${250 - (point.value / 1500) * 200}`)
                      .join(" ")} 750,250`}
                  />

                  {/* Data points */}
                  {chartData.consumption.map((point, index) => (
                    <g key={index}>
                      <circle
                        cx={50 + index * 116}
                        cy={250 - (point.value / 1500) * 200}
                        r="4"
                        fill="#FFD700"
                        stroke="#1A3B5D"
                        strokeWidth="2"
                      />
                      <text x={50 + index * 116} y={280} textAnchor="middle" fill="#EBEBEB" fontSize="12">
                        {point.time}
                      </text>
                    </g>
                  ))}

                  {/* Y-axis labels */}
                  {[0, 500, 1000, 1500].map((value, index) => (
                    <text key={index} x="40" y={255 - index * 66.67} textAnchor="end" fill="#EBEBEB" fontSize="12">
                      {value}kW
                    </text>
                  ))}
                </svg>
              </div>
            </div>
          )}

          {selectedChart === "faults" && (
            <div className="chart-container">
              <h2>Fault Frequency Analysis</h2>
              <div className="bar-chart">
                <svg viewBox="0 0 800 300" className="chart-svg">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <line
                      key={i}
                      x1="50"
                      y1={50 + i * 40}
                      x2="750"
                      y2={50 + i * 40}
                      stroke="rgba(235, 235, 235, 0.1)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Bars */}
                  {chartData.faults.map((point, index) => (
                    <g key={index}>
                      <rect
                        x={80 + index * 100}
                        y={250 - point.count * 40}
                        width="60"
                        height={point.count * 40}
                        fill="#32CD32"
                        rx="4"
                      />
                      <text
                        x={110 + index * 100}
                        y={245 - point.count * 40}
                        textAnchor="middle"
                        fill="#EBEBEB"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {point.count}
                      </text>
                      <text x={110 + index * 100} y={270} textAnchor="middle" fill="#EBEBEB" fontSize="12">
                        {point.day}
                      </text>
                    </g>
                  ))}

                  {/* Y-axis labels */}
                  {[0, 1, 2, 3, 4, 5].map((value, index) => (
                    <text key={index} x="40" y={255 - index * 40} textAnchor="end" fill="#EBEBEB" fontSize="12">
                      {value}
                    </text>
                  ))}
                </svg>
              </div>
            </div>
          )}

          {selectedChart === "performance" && (
            <div className="chart-container">
              <h2>System Performance Metrics</h2>
              <div className="performance-grid">
                <div className="metric-card">
                  <div className="metric-value">98.5%</div>
                  <div className="metric-label">Uptime</div>
                  <div className="metric-trend positive">+0.3%</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">1.2s</div>
                  <div className="metric-label">Response Time</div>
                  <div className="metric-trend negative">+0.1s</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">247</div>
                  <div className="metric-label">Active Devices</div>
                  <div className="metric-trend positive">+2</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">12</div>
                  <div className="metric-label">Alerts Today</div>
                  <div className="metric-trend negative">+3</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="heatmap-section">
          <h2>Fault Distribution Heatmap</h2>
          <div className="heatmap-grid">
            {heatmapData.map((sector) => (
              <div key={sector.sector} className="heatmap-cell" style={{ backgroundColor: `${sector.color}33` }}>
                <div className="sector-label">Sector {sector.sector}</div>
                <div className="fault-count" style={{ color: sector.color }}>
                  {sector.faults} faults
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
