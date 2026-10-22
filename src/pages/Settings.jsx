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

function Settings({ user, onUpdateUser, darkMode, onToggleDarkMode }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedTheme, setSelectedTheme] = useState(darkMode ? 'dark' : 'light');

  
  const [name, setName] = useState(user?.name || 'WatchOver Member');
  const [email, setEmail] = useState(user?.email || 'user@watchover.org');
  const [phone, setPhone] = useState(user?.phone || '');
  const [altPhone, setAltPhone] = useState(user?.altPhone || '');
  
  const [emergencyContacts, setEmergencyContacts] = useState(user?.emergencyContacts || []);


  const isOnlyNumbers = (str) => /^\d[\d\s+\-()]*$/.test(str.trim()) && str.trim().length > 0;
  const containsNumbers = (str) => /\d/.test(str);
  const containsLetters = (str) => /[a-zA-Z]/.test(str);

 
  const [phoneWarning, setPhoneWarning] = useState('');

  
  const handlePhoneInputChange = (setter, val) => {
    if (containsLetters(val)) {
      setPhoneWarning('🚫 Phone number fields only accept digits (0-9). Letters are automatically blocked!');
      setTimeout(() => setPhoneWarning(''), 4000);
    }
    const cleanPhone = val.replace(/[^0-9+\-\s()]/g, '');
    setter(cleanPhone);
  };

  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');


  const [notifications, setNotifications] = useState(user?.notifications ?? true);
  const [locationPermission, setLocationPermission] = useState(user?.locationPermission ?? true);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSwapInputs = () => {
    const tempName = newContactName;
    setNewContactName(newContactPhone);
    setNewContactPhone(tempName);
  };

  const handleAddEmergencyContact = (e) => {
    e.preventDefault();
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
  const handleRemoveContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter(c => c.id !== id));
  };
  const handleThemeRadioChange = (themeValue) => {
    setSelectedTheme(themeValue);
    if ((themeValue === 'dark' && !darkMode) || (themeValue === 'light' && darkMode)) {
      onToggleDarkMode();
    }
  };
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
      
        <div className="compact-settings-header">
          <div className="compact-title-group">
            <div className="settings-header-icon-box">
              <SettingsIcon size={28} className="compact-settings-icon" />
            </div>
            <div>
              <h1 className="compact-settings-title">Settings & Preferences</h1>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0 }}>Manage profile information, emergency directory, theme, & alert privacy.</p>
            </div>
          </div>

          <button onClick={handleSaveSettings} className="btn-primary compact-save-btn">
            <Save size={18} /> Save All Settings
          </button>
        </div>
        {successMessage && (
          <div className="auth-alert alert-success" style={{ marginBottom: '24px' }}>
            <CheckCircle size={18} style={{ display: 'inline', marginRight: '8px' }} />
            {successMessage}
          </div>
        )}

  
        {phoneWarning && (
          <div className="alignment-warning-box" style={{ marginBottom: '24px', padding: '12px 16px', fontSize: '0.92rem' }}>
            <AlertCircle size={18} style={{ flexShrink: 0, verticalAlign: 'middle' }} />
            <span>{phoneWarning}</span>
          </div>
        )}

        <div className="professional-settings-layout">
          {/* Settings Sidebar Nav */}
          <div className="settings-sidebar">
            <button 
              className={`sidebar-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <div className="tab-icon-badge bg-indigo"><User size={20} /></div>
              <span>Profile & Personal Contacts</span>
            </button>

            <button 
              className={`sidebar-tab-btn ${activeTab === 'emergency' ? 'active' : ''}`}
              onClick={() => setActiveTab('emergency')}
            >
              <div className="tab-icon-badge bg-rose"><ShieldAlert size={20} /></div>
              <span>Emergency Contacts ({emergencyContacts.length})</span>
            </button>

            <button 
              className={`sidebar-tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              <div className="tab-icon-badge bg-purple"><Sliders size={20} /></div>
              <span>Appearance & Theme</span>
            </button>

            <button 
              className={`sidebar-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              <div className="tab-icon-badge bg-emerald"><Bell size={20} /></div>
              <span>Notifications & Privacy</span>
            </button>
          </div>

          <div className="settings-content-area">
            <form onSubmit={handleSaveSettings}>
              
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
                          placeholder="Enter your Mobile No "
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
                          placeholder="Enter your Mobile No"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              
              {(activeTab === 'emergency' || activeTab === 'all') && (
                <div className="prof-settings-card">
                  <div className="prof-card-title">
                    <ShieldAlert size={22} className="card-title-icon" />
                    <div>
                      <h3>Emergency Contacts Directory ({emergencyContacts.length})</h3>
                      <p>Add as many emergency contacts as you wish for safety response.</p>
                    </div>
                  </div>

                  
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
