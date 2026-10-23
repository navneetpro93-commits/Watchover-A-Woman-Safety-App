import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import FormField from '../components/FormField';
import { validateEmail, validateRequired } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

/**
 * Login Page Component
 * Demonstrates CE2 Syllabus Topics:
 * - Form handling in React with Reusable FormField components
 * - Validation strategies (onBlur validation + onSubmit check)
 * - Consuming AuthContext directly for authentication flow
 */
function Login({ onLogin: propOnLogin }) {
  const { login: contextLogin } = useAuth();
  const handleAuthLogin = propOnLogin || contextLogin;

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error dynamically once user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    let err = '';
    if (name === 'email') err = validateEmail(value);
    if (name === 'password') err = validateRequired(value, 'Password');

    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const validateAll = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validateRequired(formData.password, 'Password')
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAll()) {
      setMessage('Please resolve the errors highlighted below.');
      setIsSuccess(false);
      return;
    }

    const derivedName = formData.email.split('@')[0];
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

    const userData = {
      name: formattedName,
      email: formData.email
    };

    setMessage('Login successful! Redirecting to Home...');
    setIsSuccess(true);

    if (handleAuthLogin) {
      handleAuthLogin(userData);
    }

    setTimeout(() => {
      navigate('/home');
    }, 800);
  };

  return (
    <div className="auth-page page-section">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header text-center">
            <div className="auth-icon">
              <LogIn size={26} />
            </div>
            <h2>Welcome to WatchOver</h2>
            <p>Log in to access safety services & features</p>
          </div>

          {message && (
            <div className={`auth-alert ${isSuccess ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <FormField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="name@example.com"
              required
              autoComplete="email"
              icon={<Mail size={18} className="input-icon" />}
              error={touched.email ? errors.email : ''}
            />

            <FormField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              icon={<Lock size={18} className="input-icon" />}
              error={touched.password ? errors.password : ''}
            />

            <button type="submit" className="btn-primary auth-submit-btn">
              Log In
            </button>
          </form>

          <div className="auth-footer text-center">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
