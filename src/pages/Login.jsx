import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Please enter both email and password.');
      setIsSuccess(false);
      return;
    }
  const derivedName = email.split('@')[0];
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

    const userData = {
      name: formattedName,
      email: email
    };

    setMessage('Login successful! Redirecting to Home...');
    setIsSuccess(true);

    if (onLogin) {
      onLogin(userData);
    }

    setTimeout(() => {
      navigate('/home');
    }, 1000);
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

          <form onSubmit={handleSubmit} className="auth-form">
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
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

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
