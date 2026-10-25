import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Services from './pages/Services';
import SafetyTips from './pages/SafetyTips';
import SafetyKit from './pages/SafetyKit';
import EmergencyNumbers from './pages/EmergencyNumbers';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import SosModal from './components/SosModal';

/**
 * Main Application Component
 * Demonstrates:
 * 1. Global state management for user profile, emergency contacts array & theme preferences
 * 2. Light / Dark mode theme persistence using useEffect & document data-theme
 * 3. Protected Routes for Home, Services, SafetyTips, Profile, and Settings
 */
function App() {
  // Store logged-in user details in localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('watchover_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Emergency SOS distress modal state
  const [isSosOpen, setIsSosOpen] = useState(false);

  // Dark mode theme state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('watchover_theme') === 'dark';
  });

  // Apply dark mode theme to root document HTML element whenever state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('watchover_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('watchover_theme', 'light');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Derived authentication status
  const isAuthenticated = !!user;

  // Handle successful user login
  const handleLogin = (userData) => {
    const defaultUser = {
      name: userData.name || 'WatchOver Member',
      email: userData.email || 'user@watchover.org',
      phone: '+91 98765 43210',
      altPhone: '+91 98765 01234',
      emergencyContacts: [
        { id: 1, name: 'Primary Guardian', phone: '+91 91234 56789' },
        { id: 2, name: 'Secondary Contact', phone: '+91 98765 00000' }
      ],
      notifications: true,
      locationPermission: true
    };
    setUser(defaultUser);
    localStorage.setItem('watchover_user', JSON.stringify(defaultUser));
  };

  // Handle profile / settings update
  const handleUpdateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('watchover_user', JSON.stringify(updatedUserData));
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('watchover_user');
  };

  return (
    <Router>
      <Navbar 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenSos={() => setIsSosOpen(true)}
      />
      <main>
        <Routes>
          {/* Public Pages Accessible Before Login */}
          <Route 
            path="/about" 
            element={<About isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/helpline" 
            element={<EmergencyNumbers />} 
          />
          <Route 
            path="/helplines" 
            element={<Navigate to="/helpline" replace />} 
          />
          <Route 
            path="/emergency-numbers" 
            element={<Navigate to="/helpline" replace />} 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Signup />
            } 
          />

          {/* Protected Routes (Require Login to Access Further) */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/services" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Services />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/safety-tips" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SafetyTips />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/safety-kit" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SafetyKit />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Settings 
                  user={user} 
                  onUpdateUser={handleUpdateUser} 
                  darkMode={darkMode}
                  onToggleDarkMode={handleToggleDarkMode}
                />
              </ProtectedRoute>
            } 
          />

          {/* Default Root Redirect */}
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/home" : "/about"} replace />} 
          />

          {/* Catch-all Fallback Redirect */}
          <Route 
            path="*" 
            element={<Navigate to={isAuthenticated ? "/home" : "/about"} replace />} 
          />
        </Routes>
      </main>
      <Footer />
      <SosModal 
        isOpen={isSosOpen} 
        onClose={() => setIsSosOpen(false)} 
        user={user}
      />
    </Router>
  );
}

export default App;
