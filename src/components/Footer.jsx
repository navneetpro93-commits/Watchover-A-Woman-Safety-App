import React from 'react';
import { Shield, Users, Crown } from 'lucide-react';
import { useLanguage } from '../utils/useLanguage';
import watchoverLogo from '../assets/watchover_logo_edited.jpg';

function Footer() {
  const { t } = useLanguage();

  const teamMembers = [
    { name: 'Divyanshi' },
    { name: 'Rachit Goyal' },
    { name: 'Navneet' },
    { name: 'Hriday Sehgal' }
  ];

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div
          className="navbar-logo"
          style={{ color: 'var(--footer-brand)' }}
        >
          <div className="navbar-logo-icon">
            <Shield size={18} />
          </div>

          <div
            className="navbar-logo-img-wrapper"
            style={{ width: '42px', height: '42px' }}
          >
            <img
              src={watchoverLogo}
              alt="WatchOver Logo"
              className="navbar-logo-img"
              onError={(e) => {
                e.currentTarget.src = '/watchover_logo_edited.jpg';
              }}
            />
          </div>

          <div className="navbar-brand-text-group">
            <span
              className="navbar-brand-text"
              style={{
                color: 'var(--footer-brand)',
                fontSize: '1.4rem'
              }}
            >
              Watch<span className="brand-accent">Over</span>
            </span>
          </div>
        </div>

        <p className="footer-message">
          {t.footer.message}
        </p>

        <div className="footer-team-section">
          <div className="footer-team-header">
            <Users size={16} />
            <span>{t.footer.createdBy}</span>
          </div>

          <div className="footer-team-grid">
            {teamMembers.map((member, index) => (
              <span key={index} className="footer-team-badge">
                {member.name}
              </span>
            ))}
          </div>
        </div>

        <p className="footer-copy">
          &copy; 2026 WatchOver
        </p>
      </div>
    </footer>
  );
}

export default Footer;
