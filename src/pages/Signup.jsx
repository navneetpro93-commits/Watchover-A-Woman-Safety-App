import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Phone, ShieldCheck } from 'lucide-react';
import FormField from '../components/FormField';
import { 
  validateRequired, 
  validateEmail, 
  validatePhone, 
  validatePassword, 
  validateConfirmPassword 
} from '../utils/validation';
import { useAuth } from '../context/AuthContext';

/**
 * Signup Page Component
 * Demonstrates CE2 Syllabus Topics:
 * - Form handling in React: Validation strategies (real-time, onBlur & onSubmit)
 * - Reusable input components (FormField with icon, error message, and helper text)
 * - Consuming global AuthContext
 */
function Signup({ onSignup: propOnSignup }) {
  const { signup: contextSignup } = useAuth();
  const handleAuthSignup = propOnSignup || contextSignup;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
    parentMobileNo: '',
    parentEmail: '',
    guardianMobileNo: '',
    guardianEmail: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let finalVal = value;

    // Sanitize phone inputs to numeric and phone characters
    if (['mobileNo', 'parentMobileNo', 'guardianMobileNo'].includes(name)) {
      finalVal = value.replace(/[^0-9+\-\s()]/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: finalVal }));

    // Reset error when user resumes typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return validateRequired(value, 'Full Name');
      case 'email':
        return validateEmail(value);
      case 'mobileNo':
        return validatePhone(value, 'Primary mobile number');
      case 'password':
        return validatePassword(value);
      case 'confirmPassword':
        return validateConfirmPassword(value, formData.password);
      case 'parentMobileNo':
        return validatePhone(value, 'Parent mobile number');
      case 'parentEmail':
        return validateEmail(value);
      case 'guardianEmail':
        return value.trim() ? validateEmail(value) : '';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const validateAll = () => {
    const newErrors = {
      name: validateRequired(formData.name, 'Full Name'),
      email: validateEmail(formData.email),
      mobileNo: validatePhone(formData.mobileNo, 'Primary mobile number'),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
      parentMobileNo: validatePhone(formData.parentMobileNo, 'Parent mobile number'),
      parentEmail: validateEmail(formData.parentEmail),
      guardianEmail: formData.guardianEmail.trim() ? validateEmail(formData.guardianEmail) : ''
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      mobileNo: true,
      password: true,
      confirmPassword: true,
      parentMobileNo: true,
      parentEmail: true,
      guardianMobileNo: true,
      guardianEmail: true
    });

    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAll()) {
      setMessage('Please resolve all validation errors highlighted below.');
      setIsSuccess(false);
      return;
    }

    // Build structured emergency contacts list
    const userEmergencyContacts = [
      { id: 1, name: 'Parent Mobile', phone: formData.parentMobileNo },
      { id: 2, name: 'Parent Email', phone: formData.parentEmail }
    ];

    if (formData.guardianMobileNo.trim()) {
      userEmergencyContacts.push({ id: 3, name: 'Guardian Mobile', phone: formData.guardianMobileNo.trim() });
    }
    if (formData.guardianEmail.trim()) {
      userEmergencyContacts.push({ id: 4, name: 'Guardian Email', phone: formData.guardianEmail.trim() });
    }

    const registeredUserData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.mobileNo.trim(),
      altPhone: formData.parentMobileNo.trim(),
      parentMobileNo: formData.parentMobileNo.trim(),
      parentEmail: formData.parentEmail.trim(),
      guardianMobileNo: formData.guardianMobileNo.trim(),
      guardianEmail: formData.guardianEmail.trim(),
      emergencyContacts: userEmergencyContacts,
      notifications: true,
      locationPermission: true
    };

    // Save registered user state
    localStorage.setItem('watchover_registered_user', JSON.stringify(registeredUserData));

    if (handleAuthSignup) {
      handleAuthSignup(registeredUserData);
    }

    setMessage('Account created successfully! Logging you in...');
    setIsSuccess(true);

    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="auth-page page-section">
      <div className="container">
        <div className="auth-card" style={{ maxWidth: '640px' }}>
          <div className="auth-header text-center">
            <div className="auth-icon">
              <UserPlus size={26} />
            </div>
            <h2>Create Your WatchOver Account</h2>
            <p>Join the community and configure your emergency network</p>
          </div>

          {message && (
            <div className={`auth-alert ${isSuccess ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {/* Section 1: Personal Profile */}
            <div className="form-section-header">
              <h4>1. Personal Information</h4>
            </div>

            <FormField
              id="signup-name"
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="e.g. Ananya Sharma"
              required
              autoComplete="name"
              icon={<User size={18} className="input-icon" />}
              error={touched.name ? errors.name : ''}
            />

            <FormField
              id="signup-email"
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="name@example.com"
              required
              autoComplete="email"
              icon={<Mail size={18} className="input-icon" />}
              error={touched.email ? errors.email : ''}
            />

            <FormField
              id="signup-mobile"
              name="mobileNo"
              label="Primary Mobile Number"
              type="tel"
              value={formData.mobileNo}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="+91 98765 43210"
              required
              autoComplete="tel"
              icon={<Phone size={18} className="input-icon" />}
              error={touched.mobileNo ? errors.mobileNo : ''}
            />

            {/* Section 2: Security & Password */}
            <div className="form-section-header" style={{ marginTop: '20px' }}>
              <h4>2. Security Credentials</h4>
            </div>

            <FormField
              id="signup-password"
              name="password"
              label="Account Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Min 7 chars with 1 special char"
              required
              autoComplete="new-password"
              icon={<Lock size={18} className="input-icon" />}
              helperText="Must be at least 7 characters and contain a special character (!@#$%^&*)."
              error={touched.password ? errors.password : ''}
            />

            <FormField
              id="signup-confirm-password"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Re-type your password"
              required
              autoComplete="new-password"
              icon={<Lock size={18} className="input-icon" />}
              error={touched.confirmPassword ? errors.confirmPassword : ''}
            />

            {/* Section 3: Emergency Contacts */}
            <div className="form-section-header" style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} className="text-primary" />
                <h4 style={{ margin: 0 }}>3. Mandatory Emergency Contacts</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                Required for student safety validation and fast emergency dispatch.
              </p>
            </div>

            <FormField
              id="signup-parent-mobile"
              name="parentMobileNo"
              label="Parent / Guardian Mobile Number"
              type="tel"
              value={formData.parentMobileNo}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="+91 98765 00000"
              required
              icon={<Phone size={18} className="input-icon" />}
              error={touched.parentMobileNo ? errors.parentMobileNo : ''}
            />

            <FormField
              id="signup-parent-email"
              name="parentEmail"
              label="Parent / Guardian Email"
              type="email"
              value={formData.parentEmail}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="parent@example.com"
              required
              icon={<Mail size={18} className="input-icon" />}
              error={touched.parentEmail ? errors.parentEmail : ''}
            />

            <FormField
              id="signup-guardian-mobile"
              name="guardianMobileNo"
              label="Secondary Guardian Mobile (Optional)"
              type="tel"
              value={formData.guardianMobileNo}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="+91 98765 11111"
              icon={<Phone size={18} className="input-icon" />}
              error={touched.guardianMobileNo ? errors.guardianMobileNo : ''}
            />

            <button type="submit" className="btn-primary auth-submit-btn" style={{ marginTop: '16px' }}>
              Complete Registration & Access WatchOver
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
