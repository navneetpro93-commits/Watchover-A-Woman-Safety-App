import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Phone } from 'lucide-react';

/**
 * Signup Page Component
 * Demonstrates:
 * 1. Controlled form inputs with useState
 * 2. Basic form validation (password matching, mandatory parent details)
 * 3. Navigation redirection to Login
 */
function Signup({ onSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Emergency Contacts
  const [parentMobileNo, setParentMobileNo] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [guardianMobileNo, setGuardianMobileNo] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handlePhoneInputChange = (setter, val) => {
    const cleanPhone = val.replace(/[^0-9+\-\s()]/g, '');
    setter(cleanPhone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !mobileNo || !password || !confirmPassword) {
      setMessage('Please fill in all standard fields.');
      setIsSuccess(false);
      return;
    }

    if (!parentMobileNo || !parentEmail) {
      setMessage('Parent mobile number and email are mandatory for emergency safety. They cannot be left blank.');
      setIsSuccess(false);
      return;
    }

    if (password.length <= 6) {
      setMessage('Password must be greater than 6 characters long.');
      setIsSuccess(false);
      return;
    }

    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    if (!hasSpecialChar) {
      setMessage('Password must contain at least one special character (e.g. @, #, $, !).');
      setIsSuccess(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      setIsSuccess(false);
      return;
    }

    // Build emergency contacts list directly from user inputs
    const userEmergencyContacts = [];
    if (parentMobileNo) {
      userEmergencyContacts.push({ id: 1, name: 'Parent Mobile', phone: parentMobileNo });
    }
    if (parentEmail) {
      userEmergencyContacts.push({ id: 2, name: 'Parent Email', phone: parentEmail });
    }
    if (guardianMobileNo) {
      userEmergencyContacts.push({ id: 3, name: 'Guardian Mobile', phone: guardianMobileNo });
    }
    if (guardianEmail) {
      userEmergencyContacts.push({ id: 4, name: 'Guardian Email', phone: guardianEmail });
    }

    const registeredUserData = {
      name,
      email,
      phone: mobileNo,
      altPhone: parentMobileNo,
      parentMobileNo,
      parentEmail,
      guardianMobileNo,
      guardianEmail,
      emergencyContacts: userEmergencyContacts,
      notifications: true,
      locationPermission: true
    };

    // Save user data with exact entered mobile number into localStorage
    localStorage.setItem('watchover_registered_user', JSON.stringify(registeredUserData));
    localStorage.setItem('watchover_user', JSON.stringify(registeredUserData));

    if (onSignup) {
      onSignup(registeredUserData);
    }

    setMessage('Account created successfully! Logging you in...');
    setIsSuccess(true);

    setTimeout(() => {
      navigate('/home');
    }, 1200);
  };

  return (
    <div className="auth-page page-section">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header text-center">
            <div className="auth-icon">
              <UserPlus size={26} />
            </div>
            <h2>Create an Account</h2>
            <p>Join WatchOver to access safety services</p>
          </div>

          {message && (
            <div className={`auth-alert ${isSuccess ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mobileNo">Your Mobile Number</label>
              <div className="input-wrapper">
                <Phone size={18} className="input-icon" />
                <input
                  type="tel"
                  id="mobileNo"
                  placeholder="Enter your mobile number"
                  value={mobileNo}
                  onChange={(e) => handlePhoneInputChange(setMobileNo, e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: '16px', marginBottom: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Emergency Contacts</h3>
              
              <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Parent Details (Required)</h4>
              
              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label htmlFor="parentMobileNo">Parent Mobile Number <span style={{ color: 'var(--primary)' }}>*</span></label>
                <div className="input-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    id="parentMobileNo"
                    placeholder="Parent's mobile number"
                    value={parentMobileNo}
                    onChange={(e) => handlePhoneInputChange(setParentMobileNo, e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label htmlFor="parentEmail">Parent Email <span style={{ color: 'var(--primary)' }}>*</span></label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="parentEmail"
                    placeholder="Parent's email address"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Guardian Details (Optional)</h4>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label htmlFor="guardianMobileNo">Guardian Mobile Number</label>
                <div className="input-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    id="guardianMobileNo"
                    placeholder="Guardian's mobile number (Optional)"
                    value={guardianMobileNo}
                    onChange={(e) => handlePhoneInputChange(setGuardianMobileNo, e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="guardianEmail">Guardian Email</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="guardianEmail"
                    placeholder="Guardian's email address (Optional)"
                    value={guardianEmail}
                    onChange={(e) => setGuardianEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password (min 7 chars, 1 special char)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Must be greater than 6 characters and include at least 1 special character (@, #, $, !, etc.)
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary auth-submit-btn">
              Sign Up
            </button>
          </form>

          <div className="auth-footer text-center">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
