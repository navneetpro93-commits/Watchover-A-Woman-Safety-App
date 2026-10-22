import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  User,
  Mail,
  Phone,
  PhoneCall,
  ShieldAlert,
  Bell,
  CheckCircle,
  Save,
  Sliders,
  Check,
  Plus,
  Trash2,
  AlertCircle,
  ArrowRightLeft
} from 'lucide-react';

/**
 * Settings Page Component
 * Features:
 * 1. Dynamic Multiple Emergency Contacts management (Add & Remove contacts as wish)
 * 2. Radio button selection for Theme (Light Mode vs Dark Mode)
 * 3. Primary & Alternative phone number fields
 * 4. Privacy & notification settings
 *
 * @param {Object} props
 * @param {Object} props.user - Current user object
 * @param {Function} props.onUpdateUser - Callback function to update user state in App
 * @param {boolean} props.darkMode - Current dark mode state
 * @param {Function} props.onToggleDarkMode - Callback function to toggle theme
 */
function Settings({ user, onUpdateUser, darkMode, onToggleDarkMode }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedTheme, setSelectedTheme] = useState(darkMode ? 'dark' : 'light');

  // Profile form states
  const [name, setName] = useState(user?.name || 'WatchOver Member');
  const [email, setEmail] = useState(user?.email || 'user@watchover.org');
const [phone, setPhone] = useState(user?.phone || '');
const [altPhone, setAltPhone] = useState(user?.altPhone || '');

  // Dynamic Multiple Emergency Contacts State Array
  const [emergencyContacts, setEmergencyContacts] = useState(
  user?.emergencyContacts || []
);

  // Helper validations & strict input sanitizers
  const isOnlyNumbers = (str) => /^\d[\d\s+\-()]*$/.test(str.trim()) && str.trim().length > 0;
  const containsNumbers = (str) => /\d/.test(str);
  const containsLetters = (str) => /[a-zA-Z]/.test(str);

  // Phone alignment warning state
  const [phoneWarning, setPhoneWarning] = useState('');

  // Sanitize Phone Input - Strictly block any alphabetic letters
  const handlePhoneInputChange = (setter, val) => {
    if (containsLetters(val)) {
      setPhoneWarning('🚫 Phone number fields only accept digits (0-9). Letters are automatically blocked!');
      setTimeout(() => setPhoneWarning(''), 4000);
    }
    const cleanPhone = val.replace(/[^0-9+\-\s()]/g, '');
    setter(cleanPhone);
  };

  // New emergency contact form inputs
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  // Preferences toggles
  const [notifications, setNotifications] = useState(user?.notifications ?? true);
  const [locationPermission, setLocationPermission] = useState(user?.locationPermission ?? true);

  // Success feedback state
  const [successMessage, setSuccessMessage] = useState('');

  // Quick swap handler if user accidentally puts number in Name field and vice versa
  const handleSwapInputs = () => {
    const tempName = newContactName;
    setNewContactName(newContactPhone);
    setNewContactPhone(tempName);
  };

  // Handle adding a new emergency contact with auto-alignment
  const handleAddEmergencyContact = (e) => {
    e.preventDefault();

    // Auto-alignment: If user typed numbers in Name field and left Phone empty, swap them automatically
    if (isOnlyNumbers(newContactName) && !newContactPhone.trim()) {
      setNewContactPhone(newContactName.trim());
      setNewContactName('');
      setPhoneWarning('💡 Auto-Aligned! Your phone number was shifted to the Phone field. Please type a Contact Name (e.g. Mom).');
      setTimeout(() => setPhoneWarning(''), 5000);
      return;
    }

    if (!newContactName.trim() || !newContactPhone.trim()) return;

    const newContact = {
      id: Date.now(),
      name: newContactName.trim(),
      phone: newContactPhone.trim()
    };

    setEmergencyContacts([...emergencyContacts, newContact]);
    setNewContactName('');
    setNewContactPhone('');
  };

  // Handle removing an emergency contact
  const handleRemoveContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter(c => c.id !== id));
  };

  // Handle Radio button theme change
  const handleThemeRadioChange = (themeValue) => {
    setSelectedTheme(themeValue);
    if ((themeValue === 'dark' && !darkMode) || (themeValue === 'light' && darkMode)) {
      onToggleDarkMode();
    }
  };

  // Handle saving all settings
  const handleSaveSettings = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const updatedUser = {
      ...user,
      name,
      email,
      phone,
      altPhone,
      emergencyContacts,
      notifications,
      locationPermission,
      theme: selectedTheme
    };

    if (onUpdateUser) {
      onUpdateUser(updatedUser);
    }

    setSuccessMessage('Settings updated successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="settings-page page-section" style={{ paddingTop: '30px' }}>
      <div className="container">
        {/* Compact Minimal Header */}
        <div className="compact-settings-header">
          <div className="compact-title-group">
            <SettingsIcon size={24} className="compact-settings-icon" />
            <h1 className="compact-settings-title">Settings</h1>
          </div>

          <button onClick={handleSaveSettings} className="btn-primary compact-save-btn">
            <Save size={18} /> Save Changes
          </button>
        </div>

        {/* Success Feedback Alert Banner */}
        {successMessage && (
          <div className="auth-alert alert-success" style={{ marginBottom: '24px' }}>
            <CheckCircle size={18} style={{ display: 'inline', marginRight: '8px' }} />
            {successMessage}
          </div>
        )}

        {/* Phone Input Strict Letters Warning Banner */}
        {phoneWarning && (
          <div className="auth-alert alert-error" style={{ marginBottom: '24px', backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#d97706', borderColor: '#eab308' }}>
            <AlertCircle size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
            {phoneWarning}
          </div>
        )}

        {/* Main Settings Layout */}
        <div className="professional-settings-layout">
          {/* Settings Sidebar Nav */}
          <div className="settings-sidebar">
            <button
              className={`sidebar-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={22} /> Profile & Contacts
            </button>

            <button
              className={`sidebar-tab-btn ${activeTab === 'emergency' ? 'active' : ''}`}
              onClick={() => setActiveTab('emergency')}
            >
              <ShieldAlert size={22} /> Emergency Contacts ({emergencyContacts.length})
            </button>

            <button
              className={`sidebar-tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              <Sliders size={22} /> Appearance & Theme
            </button>

            <button
              className={`sidebar-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              <Bell size={22} /> Notifications & Privacy
            </button>
          </div>

          {/* Settings Content Area */}
          <div className="settings-content-area">
            <form onSubmit={handleSaveSettings}>
              {/* Tab 1: Profile & Contact Numbers */}
              {(activeTab === 'profile' || activeTab === 'all') && (
                <div className="prof-settings-card">
                  <div className="prof-card-title">
                    <User size={22} className="card-title-icon" />
                    <div>
                      <h3>Profile & Contact Numbers</h3>
                      <p>Update your personal info, primary phone, and alternative phone number.</p>
                    </div>
                  </div>

                  <div className="settings-form-grid">
                    <div className="form-group">
                      <label htmlFor="setting-name">Full Name</label>
                      <div className="input-wrapper">
                        <User size={18} className="input-icon" />
                        <input
                          type="text"
                          id="setting-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          required
                          style={containsNumbers(name) ? { borderColor: '#eab308' } : {}}
                        />
                      </div>
                      {containsNumbers(name) && (
                        <div className="alignment-warning-box">
                          <AlertCircle size={15} style={{ color: '#eab308', flexShrink: 0 }} />
                          <span>Note: Numbers detected in Name field. Usually names consist of text characters.</span>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="setting-email">Email Address</label>
                      <div className="input-wrapper">
                        <Mail size={18} className="input-icon" />
                        <input
                          type="email"
                          id="setting-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="setting-phone">Primary Phone Number (Digits Only)</label>
                      <div className="input-wrapper">
                        <Phone size={18} className="input-icon" />
                        <input
                          type="tel"
                          id="setting-phone"
                          value={phone}
                          onChange={(e) => handlePhoneInputChange(setPhone, e.target.value)}
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="setting-alt-phone">Alternative Phone Number (Digits Only)</label>
                      <div className="input-wrapper">
                        <PhoneCall size={18} className="input-icon" />
                        <input
                          type="tel"
                          id="setting-alt-phone"
                          value={altPhone}
                          onChange={(e) => handlePhoneInputChange(setAltPhone, e.target.value)}
                          placeholder="Enter your mobile number"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Dynamic Multiple Emergency Contacts */}
              {(activeTab === 'emergency' || activeTab === 'all') && (
                <div className="prof-settings-card">
                  <div className="prof-card-title">
                    <ShieldAlert size={22} className="card-title-icon" />
                    <div>
                      <h3>Emergency Contacts Directory ({emergencyContacts.length})</h3>
                      <p>Add as many emergency contacts as you wish for safety response.</p>
                    </div>
                  </div>

                  {/* Add New Emergency Contact Form */}
                  <div className="add-emergency-contact-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ margin: 0 }}>Add New Emergency Contact</h4>
                      {(isOnlyNumbers(newContactName) || containsLetters(newContactPhone)) && (
                        <button
                          type="button"
                          className="swap-inputs-btn"
                          onClick={handleSwapInputs}
                          title="Swap Name and Phone input values"
                        >
                          <ArrowRightLeft size={14} /> Swap Name & Phone
                        </button>
                      )}
                    </div>

                    <div className="add-contact-inputs-grid">
                      <div className="form-group" style={{ gap: '4px' }}>
                        <div className="input-wrapper">
                          <User size={18} className="input-icon" />
                          <input
                            type="text"
                            placeholder="Contact Name (e.g. Mom / Brother)"
                            value={newContactName}
                            onChange={(e) => setNewContactName(e.target.value)}
                            style={isOnlyNumbers(newContactName) ? { borderColor: '#eab308' } : {}}
                          />
                        </div>
                        {isOnlyNumbers(newContactName) && (
                          <div className="alignment-warning-box">
                            <AlertCircle size={14} style={{ color: '#eab308', flexShrink: 0 }} />
                            <span>Number detected in Name! Click 'Swap Name & Phone' or type a name.</span>
                          </div>
                        )}
                      </div>

                      <div className="form-group" style={{ gap: '4px' }}>
                        <div className="input-wrapper">
                          <Phone size={18} className="input-icon" />
                          <input
                            type="tel"
                            placeholder="Phone Number (+91 98765... Digits Only)"
                            value={newContactPhone}
                            onChange={(e) => handlePhoneInputChange(setNewContactPhone, e.target.value)}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn-primary add-contact-btn"
                        onClick={handleAddEmergencyContact}
                      >
                        <Plus size={18} /> Add Contact
                      </button>
                    </div>
                  </div>

                  {/* Existing Emergency Contacts List */}
                  <div className="emergency-contacts-list">
                    <h4>Saved Emergency Contacts</h4>

                    {emergencyContacts.length > 0 ? (
                      <div className="emergency-contacts-grid">
                        {emergencyContacts.map((contact) => {
                          const isNumericName = isOnlyNumbers(contact.name);
                          return (
                            <div key={contact.id} className="emergency-contact-card">
                              <div className="contact-info">
                                <div className="contact-avatar">
                                  <User size={20} />
                                </div>
                                <div className="contact-text-group">
                                  <div className="contact-name-row">
                                    <h5 className="contact-name-heading">{contact.name}</h5>
                                    {isNumericName && (
                                      <span className="numeric-badge" title="This contact name is a number">
                                        # Number ID
                                      </span>
                                    )}
                                  </div>
                                  <p className="contact-phone-text">
                                    <Phone size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                                    {contact.phone}
                                  </p>
                                </div>
                              </div>

                              <button
                                type="button"
                                className="remove-contact-btn"
                                onClick={() => handleRemoveContact(contact.id)}
                                title="Remove Contact"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="empty-saved-card">
                        <p>No emergency contacts added yet. Add a contact above to save!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 3: Appearance & Theme */}
              {(activeTab === 'appearance' || activeTab === 'all') && (
                <div className="prof-settings-card">
                  <div className="prof-card-title">
                    <Sliders size={22} className="card-title-icon" />
                    <div>
                      <h3>Appearance & Theme Selection</h3>
                      <p>Select your preferred interface theme using the radio options below.</p>
                    </div>
                  </div>

                  <div className="theme-radio-grid">
                    {/* Light Mode Radio Card */}
                    <label
                      className={`theme-radio-card ${selectedTheme === 'light' ? 'selected' : ''}`}
                      onClick={() => handleThemeRadioChange('light')}
                    >
                      <div className="radio-card-top">
                        <input
                          type="radio"
                          name="themeChoice"
                          value="light"
                          checked={selectedTheme === 'light'}
                          onChange={() => handleThemeRadioChange('light')}
                          className="theme-radio-input"
                        />
                        <div className="radio-icon-box light-box">
                          <Sun size={24} />
                        </div>
                        {selectedTheme === 'light' && (
                          <span className="selected-check-badge"><Check size={14} /> Active</span>
                        )}
                      </div>
                      <h4>Light Theme</h4>
                      <p>Clean, high-contrast light background for daytime use.</p>
                    </label>

                    {/* Dark Mode Radio Card */}
                    <label
                      className={`theme-radio-card ${selectedTheme === 'dark' ? 'selected' : ''}`}
                      onClick={() => handleThemeRadioChange('dark')}
                    >
                      <div className="radio-card-top">
                        <input
                          type="radio"
                          name="themeChoice"
                          value="dark"
                          checked={selectedTheme === 'dark'}
                          onChange={() => handleThemeRadioChange('dark')}
                          className="theme-radio-input"
                        />
                        <div className="radio-icon-box dark-box">
                          <Moon size={24} />
                        </div>
                        {selectedTheme === 'dark' && (
                          <span className="selected-check-badge"><Check size={14} /> Active</span>
                        )}
                      </div>
                      <h4>Dark Theme</h4>
                      <p>Sleek dark interface to minimize eye strain in low-light conditions.</p>
                    </label>
                  </div>
                </div>
              )}

              {/* Tab 4: Notifications & Privacy */}
              {(activeTab === 'privacy' || activeTab === 'all') && (
                <div className="prof-settings-card">
                  <div className="prof-card-title">
                    <Bell size={22} className="card-title-icon" />
                    <div>
                      <h3>Notifications & Privacy Preferences</h3>
                      <p>Manage alert preferences and location data permissions.</p>
                    </div>
                  </div>

                  <div className="preferences-list">
                    <div className="preference-item">
                      <div>
                        <strong>Safety Alert Notifications</strong>
                        <p>Receive alerts for new safety tips and commute guidelines.</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={notifications}
                          onChange={(e) => setNotifications(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="preference-item">
                      <div>
                        <strong>Location Privacy Permission</strong>
                        <p>Allow WatchOver to access location data for commute safety.</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={locationPermission}
                          onChange={(e) => setLocationPermission(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Save Button */}
              <div className="prof-settings-footer">
                <button type="submit" className="btn-primary" style={{ padding: '14px 32px' }}>
                  <Save size={18} /> Save All Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
