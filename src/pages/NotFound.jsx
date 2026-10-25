import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Shield, ArrowLeft, PhoneCall, Sparkles } from 'lucide-react';

/**
 * NotFound (404) Component
 * Demonstrates:
 * 1. Catch-all client-side routing fallback using path="*"
 * 2. Accessing dynamic invalid route path via useLocation() hook
 * 3. Fast user recovery actions and recommended navigation paths
 */
function NotFound({ isAuthenticated }) {
  const location = useLocation();

  return (
    <div className="not-found-page">
      <div className="not-found-card">
        {/* Visual 404 Illustration */}
        <div className="not-found-img-container">
          <img 
            src="/404_illustration.png" 
            alt="404 Page Not Found Illustration" 
            className="not-found-img"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        <div className="not-found-badge">
          <Shield size={16} /> Route Error
        </div>

        <div className="dynamic-route-badge">
          <span>Requested Route:</span>
          <code className="dynamic-path-text">{location.pathname}</code>
        </div>

        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-desc">
          The safety page or resource you are looking for doesn't exist or has been moved. 
          Use the quick links below to return to safe ground.
        </p>

        <div className="not-found-actions">
          <Link to={isAuthenticated ? "/home" : "/about"} className="btn-primary">
            <ArrowLeft size={18} /> {isAuthenticated ? "Back to Home Dashboard" : "Back to About WatchOver"}
          </Link>
          <Link to="/services" className="btn-secondary-outline">
            <Compass size={18} /> Explore Services
          </Link>
          {isAuthenticated ? (
            <Link to="/helpline" className="btn-secondary-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              <PhoneCall size={18} /> Emergency Helplines
            </Link>
          ) : (
            <Link to="/login" className="btn-secondary-outline">
              Sign In to Access Helplines
            </Link>
          )}
        </div>

        {/* Quick Links for fast recovery */}
        <div className="quick-links-section">
          <div className="quick-links-header">
            <Sparkles size={16} /> Recommended Sections
          </div>
          <div className="quick-links-grid">
            <Link to="/services" className="quick-link-card">
              <div className="quick-link-icon"><Compass size={20} /></div>
              <div className="quick-link-text">
                <strong>Safety Services</strong>
                <p>Browse commute and online safety guidelines</p>
              </div>
            </Link>
            <Link to="/safety-tips" className="quick-link-card">
              <div className="quick-link-icon"><Shield size={20} /></div>
              <div className="quick-link-text">
                <strong>Safety Tips</strong>
                <p>Everyday practical awareness recommendations</p>
              </div>
            </Link>
            {isAuthenticated ? (
              <Link to="/helpline" className="quick-link-card">
                <div className="quick-link-icon"><PhoneCall size={20} /></div>
                <div className="quick-link-text">
                  <strong>Emergency Helpline</strong>
                  <p>1-Click direct women safety contact directory</p>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="quick-link-card">
                <div className="quick-link-icon"><PhoneCall size={20} /></div>
                <div className="quick-link-text">
                  <strong>Emergency Helpline</strong>
                  <p>Log in to view complete contact directory</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
