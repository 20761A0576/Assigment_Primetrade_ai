// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// This component protects routes that require authentication
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  // If no token, redirect to the login page
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div>
      {/* Toaster for displaying notifications */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <h1 className="text-3xl font-bold text-gray-700">404 - Page Not Found</h1>
            </div>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;