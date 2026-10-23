import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut, Settings as SettingsIcon, Sun, Moon, Radio } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

/**
 * Navbar Component (3-Zone Professional Spacing)
 * Features:
 * 1. Brand Section (Left Wing) with Logo and Brand Identity
 * 2. Primary Navigation Links (Center Wing)
 * 3. Action Controls Suite (Right Wing) with SOS Alert, Theme Switcher, and Auth buttons
 * 4. Eliminates collision between logo and SOS button, utilizing full horizontal display space
 */
function Navbar({ 
  isAuthenticated: propIsAuth, 
  onLogout: propOnLogout, 
  darkMode: propDarkMode, 
  onToggleDarkMode: propToggleDark,
  onOpenSos
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
    <header className="navbar">
      <div className="navbar-container">
        
        {/* ========================================================
            ZONE 1: BRAND LOGO & IDENTITY (Left Wing)
           ======================================================== */}
        <div className="navbar-brand-section">
          <Link 
            to={isAuthenticated ? "/home" : "/about"} 
            className="navbar-logo" 
            onClick={closeMenu}
            title="WatchOver — Women's Safety Awareness Platform"
          >
            <div className="navbar-logo-img-wrapper">
              <img 
                src="/watchover_logo_edited.jpg" 
                alt="WatchOver Logo" 
                className="navbar-logo-img" 
              />
            </div>
            
            <div className="navbar-brand-text-group">
              <span className="navbar-brand-text">
                Watch<span className="brand-accent">Over</span>
              </span>
              <span className="navbar-brand-subtag">WOMEN'S SAFETY</span>
            </div>
          </Link>
        </div>

        {/* ========================================================
            ZONE 2: PRIMARY NAVIGATION LINKS (Center Wing)
           ======================================================== */}
        <nav className={`navbar-nav-section ${isMenuOpen ? 'open' : ''}`}>
          <ul className="navbar-links">
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
              </>
            ) : (
              <>
                <li>
                  <NavLink 
                    to="/about" 
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                    onClick={closeMenu}
                  >
                    About WatchOver
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
              </>
            )}
          </ul>
        </nav>

        {/* ========================================================
            ZONE 3: ACTION CONTROLS & UTILITIES (Right Wing)
           ======================================================== */}
        <div className="navbar-actions-section">
          
          {/* Prominent Emergency SOS Distress Button */}
          <button 
            type="button" 
            className="nav-sos-btn" 
            onClick={() => { closeMenu(); if (onOpenSos) onOpenSos(); }}
            title="Immediate Distress Siren & Personal Emergency Alert"
          >
            <Radio size={16} className="nav-sos-icon" />
            <span>SOS Alert</span>
          </button>

          {/* Theme Mode Toggle Button */}
          <button 
            className="theme-quick-btn" 
            onClick={onToggleDarkMode} 
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme Mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Authentication Actions */}
          {isAuthenticated ? (
            <button 
              onClick={handleLogoutClick} 
              className="nav-btn-logout"
              title="Sign out of WatchOver account"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          ) : (
            <Link 
              to="/signup" 
              className="nav-btn-signup" 
              onClick={closeMenu}
            >
              Sign Up
            </Link>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMenu} 
            aria-label="Toggle Mobile Navigation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;
