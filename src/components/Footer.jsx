import React from 'react';
import { Users, Crown } from 'lucide-react';

/**
 * Footer Component
 * Dynamic dark theme styling supporting theme switching & team members display.
 */
function Footer() {
  const teamMembers = [
    { name: 'Divyanshi', role: 'Group Leader', isLeader: true },
    { name: 'Hriday Sehgal', role: 'Team Member', isLeader: false },
    { name: 'Rachit Goyal', role: 'Team Member', isLeader: false },
    { name: 'Navneet', role: 'Team Member', isLeader: false }
  ];

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="navbar-logo" style={{ color: 'var(--footer-brand)' }}>
          <div className="navbar-logo-img-wrapper footer-logo-wrapper">
            <img src="/watchover_logo_edited.jpg" alt="WatchOver Logo" className="navbar-logo-img" />
          </div>
          <span className="navbar-brand-text" style={{ color: 'var(--footer-brand)', fontSize: '1.8rem' }}>
            Watch<span className="brand-accent">Over</span>
          </span>
        </div>
        
        <p className="footer-message">
          Empowering safety through awareness, practical tips, and community vigilance.
        </p>

        {/* Team Members Display */}
        <div className="footer-team-section">
          <div className="footer-team-header">
            <Users size={16} /> <span>CE1 Project Team Members</span>
          </div>
          <div className="footer-team-grid">
            {teamMembers.map((member, index) => (
              <span key={index} className={`footer-team-badge ${member.isLeader ? 'leader-badge' : ''}`}>
                {member.isLeader && <Crown size={14} className="leader-crown-icon" />}
                {member.name} {member.isLeader && <small>(Group Leader)</small>}
              </span>
            ))}
          </div>
        </div>

        <p className="footer-copy">
          &copy; 2026 WatchOver &bull; College Project
        </p>
      </div>
    </footer>
  );
}

export default Footer;
