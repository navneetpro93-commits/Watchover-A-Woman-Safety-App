import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut, Settings as SettingsIcon, Sun, Moon, PhoneCall, Radio } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../store/safetyKitSlice';
import { useLanguage } from '../utils/useLanguage';
import watchoverLogo from '../assets/watchover_logo_edited.jpg';

/**
 * Navbar Component
 * Features:
 * 1. WatchOver Brand Logo with custom image badge
 * 2. Multilingual navigation links supporting English, Hindi, and Punjabi
 * 3. Real-time Emergency SafetyKit cart counter badge
 * 4. Theme mode switcher toggle
 */
function Navbar({ isAuthenticated, onLogout, darkMode, onToggleDarkMode, onOpenSos }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalQuantity = useSelector(selectTotalQuantity);
  const { t } = useLanguage();
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
        {/* Brand Logo & Name (Earlier WatchOver Logo with image) */}
        <Link to={isAuthenticated ? "/home" : "/about"} className="navbar-logo" onClick={closeMenu}>
          <div className="navbar-logo-img-wrapper">
            <img 
              src={watchoverLogo} 
              alt="WatchOver Logo" 
              className="navbar-logo-img" 
              onError={(e) => { e.currentTarget.src = '/watchover_logo_edited.jpg'; }}
            />
          </div>
          <div className="navbar-brand-text-group">
            <span className="navbar-brand-text">
              Watch<span className="brand-accent">Over</span>
            </span>
            <span className="navbar-brand-subtag">{t.navbar.brandSubtag}</span>
          </div>
        </Link>

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
                  {t.navbar.home}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/services" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  {t.navbar.services}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/safety-tips" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {t.navbar.safetyTips}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/safety-kit" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {t.navbar.safetyKit} {totalQuantity > 0 && <span className="nav-kit-badge">{totalQuantity}</span>}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/helpline" 
                  className={({ isActive }) => isActive ? 'nav-link nav-link-helpline active' : 'nav-link nav-link-helpline'} 
                  onClick={closeMenu}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <PhoneCall size={14} />
                  <span>{t.navbar.helpline}</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  {t.navbar.about}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  {t.navbar.profile}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/settings" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  {t.navbar.settings}
                </NavLink>
              </li>
              <li>
                <button 
                  onClick={handleLogoutClick} 
                  className="nav-btn-logout"
                >
                  <LogOut size={16} /> {t.navbar.logout}
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
                  {t.navbar.about}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                  onClick={closeMenu}
                >
                  {t.navbar.login}
                </NavLink>
              </li>
              <li>
                <Link 
                  to="/signup" 
                  className="nav-btn-signup" 
                  onClick={closeMenu}
                >
                  {t.navbar.signup}
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Action Controls Suite (Right Wing) */}
        <div className="navbar-actions-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Prominent Emergency SOS Distress Button (Available when user has logged in) */}
          {isAuthenticated && (
            <button 
              type="button" 
              className="nav-sos-btn" 
              onClick={() => { closeMenu(); if (onOpenSos) onOpenSos(); }}
              title="Immediate Distress Siren & Personal Emergency Alert"
            >
              <Radio size={16} className="nav-sos-icon" />
              <span>{t.navbar.sosAlert || 'SOS Alert'}</span>
            </button>
          )}

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
      </div>
    </nav>
  );
}

export default Navbar;
