import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import SafetyTips from './pages/SafetyTips';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

/**
 * AppContent Component
 * Consumes global AuthContext and ThemeContext via custom hooks (useAuth, useTheme).
 * Eliminates prop-drilling across routes, navbar, and protected views.
 */
function AppContent() {
  const { user, isAuthenticated, login, signup, updateUser, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          {/* Public Pages Accessible Before Login */}
          <Route 
            path="/about" 
            element={<About isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Login onLogin={login} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Signup onSignup={signup} />
            } 
          />

          {/* Protected Routes (Require Login to Access Further) */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/services" 
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/services/:serviceId" 
            element={
              <ProtectedRoute>
                <ServiceDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/safety-tips" 
            element={
              <ProtectedRoute>
                <SafetyTips />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile user={user} onLogout={logout} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings 
                  user={user} 
                  onUpdateUser={updateUser} 
                  darkMode={darkMode}
                  onToggleDarkMode={toggleDarkMode}
                />
              </ProtectedRoute>
            } 
          />

          {/* Default Root Redirect */}
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/home" : "/about"} replace />} 
          />

          {/* Catch-all Fallback Route */}
          <Route 
            path="*" 
            element={<NotFound isAuthenticated={isAuthenticated} />} 
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

/**
 * Root Application Component
 * Wraps the application tree in Global ThemeProvider and AuthProvider.
 * Fulfills syllabus: Context API, State architecture in React apps, Global vs local state.
 */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

