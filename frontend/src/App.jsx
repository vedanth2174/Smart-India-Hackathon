import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom';

import Login from './components/login'
import Dashboard from './components/dashboard'
import DeviceManagement from './components/devicemanagement'
import Alerts from './components/alerts'
import Analytics from './components/analytics'
import AdminPanel from './components/adminpanel'
import Navbar from './components/navbar'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Layout component that includes navbar for all protected routes
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/device-management",
    element: (
      <ProtectedRoute>
        <Layout>
          <DeviceManagement />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/alerts",
    element: (
      <ProtectedRoute>
        <Layout>
          <Alerts />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/analytics",
    element: (
      <ProtectedRoute>
        <Layout>
          <Analytics />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin-panel",
    element: (
      <ProtectedRoute>
        <Layout>
          <AdminPanel />
        </Layout>
      </ProtectedRoute>
    )
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
