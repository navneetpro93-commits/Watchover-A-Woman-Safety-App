import React from 'react';
import { Shield } from 'lucide-react';

/**
 * Footer Component
 * Dynamic dark theme styling supporting theme switching.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="navbar-logo" style={{ color: 'var(--footer-brand)' }}>
          <div className="navbar-logo-icon">
            <Shield size={18} />
          </div>
          <span className="footer-brand">WatchOver</span>
        </div>
        
        <p className="footer-message">
          Empowering safety through awareness, practical tips, and community vigilance.
        </p>

        <p className="footer-copy">
          &copy; 2026 WatchOver &bull; CE1 College Project
        </p>
      </div>
    </footer>
  );
}

export default Footer;
