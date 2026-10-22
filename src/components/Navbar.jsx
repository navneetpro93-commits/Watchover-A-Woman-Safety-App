import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut, Settings as SettingsIcon, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

/**
 * Navbar Component (CE1 Project / CE2 Context API Integration)
 * Demonstrates:
 * 1. Consuming global AuthContext & ThemeContext
 * 2. Public vs Protected navigation links
 * 3. Theme switcher toggle button
 * 4. Settings page link
 * 5. Mobile responsive navigation menu
 */
function Navbar({ 
  isAuthenticated: propIsAuth, 
  onLogout: propOnLogout, 
  darkMode: propDarkMode, 
  onToggleDarkMode: propToggleDark 
}) {
  const { isAuthenticated: contextIsAuth, logout: contextLogout } = useAuth();
  const { darkMode: contextDarkMode, toggleDarkMode: contextToggleDark } = useTheme();

  const isAuthenticated = propIsAuth !== undefined ? propIsAuth : contextIsAuth;
  const darkMode = propDarkMode !== undefined ? propDarkMode : contextDarkMode;
  const onToggleDarkMode = propToggleDark || contextToggleDark;
  const onLogout = propOnLogout || contextLogout;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    closeMenu();
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo & Name */}
        <Link to={isAuthenticated ? "/home" : "/about"} className="navbar-logo" onClick={closeMenu}>
          <div className="navbar-logo-img-wrapper">
            <img src="/watchover_logo_edited.jpg" alt="WatchOver Logo" className="navbar-logo-img" />
          </div>
          <span className="navbar-brand-text">Watch<span className="brand-accent">Over</span></span>
        </Link>

        {/* Action Controls & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Quick Theme Toggle Button */}
          <button 
            className="theme-quick-btn" 
            onClick={onToggleDarkMode} 
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMenu} 
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink 
                  to="/home" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/services" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/safety-tips" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  Safety Tips
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/settings" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  Settings
                </NavLink>
              </li>
              <li>
                <button 
                  onClick={handleLogoutClick} 
                  className="nav-btn-logout"
                >
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <Link 
                  to="/signup" 
                  className="nav-btn-signup" 
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
