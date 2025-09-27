import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from './components/login'
import Dashboard from './components/dashboard'
import DeviceManagement from './components/devicemanagement'
import Alerts from './components/alerts'
import Analytics from './components/analytics'
import AdminPanel from './components/adminpanel'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/device-management"
          element={
            <ProtectedRoute>
              <DeviceManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute>
              <AdminPanel/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </>
  )
}

export default App
