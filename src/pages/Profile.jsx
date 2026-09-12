import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, PhoneCall, ShieldAlert, ShieldCheck, LogOut, Award, Settings as SettingsIcon } from 'lucide-react';

/**
 * Profile Page Component
 * Displays user profile details & list of saved Emergency Contacts.
 * 
 * @param {Object} props
 * @param {Object} props.user - User information object
 * @param {Function} props.onLogout - Callback to handle logout
 */
function Profile({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const displayName = user?.name || 'WatchOver Member';
  const displayEmail = user?.email || 'user@watchover.org';
  const displayPhone = user?.phone || 'Not provided';
  const displayAltPhone = user?.altPhone || 'Not provided';

  const emergencyContacts = user?.emergencyContacts || [];

  return (
    <div className="profile-page page-section">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header text-center">
            <div className="profile-avatar">
              <User size={40} />
            </div>
            <h2 className="profile-name">{displayName}</h2>
            <p className="profile-status">
              <ShieldCheck size={16} /> Active Safety Advocate
            </p>
          </div>

          <div className="profile-details">
            <div className="profile-detail-item">
              <div className="detail-icon">
                <User size={18} />
              </div>
              <div>
                <span className="detail-label">Full Name</span>
                <p className="detail-value">{displayName}</p>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="detail-icon">
                <Mail size={18} />
              </div>
              <div>
                <span className="detail-label">Email Address</span>
                <p className="detail-value">{displayEmail}</p>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="detail-icon">
                <Phone size={18} />
              </div>
              <div>
                <span className="detail-label">Primary Phone Number</span>
                <p className="detail-value">{displayPhone}</p>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="detail-icon">
                <PhoneCall size={18} style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <span className="detail-label">Alternative Phone Number</span>
                <p className="detail-value">{displayAltPhone}</p>
              </div>
            </div>

            <div className="profile-detail-item">
              <div className="detail-icon">
                <Award size={18} />
              </div>
              <div>
                <span className="detail-label">Member Status</span>
                <p className="detail-value">WatchOver CE1 Verified Member</p>
              </div>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="profile-emergency-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <ShieldAlert size={20} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Emergency Contacts ({emergencyContacts.length})</h3>
            </div>

            {emergencyContacts.length > 0 ? (
              <div className="profile-emergency-grid">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="profile-emergency-card">
                    <span className="contact-name">{contact.name}</span>
                    <span className="contact-phone">{contact.phone}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>No emergency contacts saved yet.</p>
            )}
          </div>

          <div className="profile-actions-grid" style={{ marginTop: '24px' }}>
            <Link to="/settings" className="btn-secondary-outline profile-action-btn">
              <SettingsIcon size={18} /> Edit Profile & Settings
            </Link>

            <button onClick={handleLogoutClick} className="btn-primary logout-btn">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
