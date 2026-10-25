
import React from 'react';
import { Shield, Users, Crown } from 'lucide-react';

function Footer() {
  const teamMembers = [
    // Keep your existing team member data here
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
          <span className="footer-brand">WatchOver</span>
        </div>

        <p className="footer-message">
          Empowering safety through awareness, practical tips, and community vigilance.
        </p>

        <div className="footer-team-section">
          <div className="footer-team-header">
            <Users size={16} />
            <span>Created by Members</span>
          </div>

          <div className="footer-team-grid">
            {teamMembers.map((member, index) => (
              <span
                key={index}
                className={`footer-team-badge ${
                  member.isLeader ? 'leader-badge' : ''
                }`}
              >
                {member.isLeader && (
                  <Crown size={16} className="leader-crown-icon" />
                )}
                {member.name}
                {member.isLeader && <small> (Group Leader)</small>}
              </span>
            ))}
          </div>
        </div>

        <p className="footer-copy">
          &copy; 2026 WatchOver &bull; CE1 College Project
        </p>
      </div>
    </footer>
  );
}

export default Footer;

