import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Restricts access to main website pages before logging in.
 * If user is not logged in, redirects automatically to /login.
 * 
 * @param {Object} props
 * @param {boolean} props.isAuthenticated - Current authentication state
 * @param {React.ReactNode} props.children - Protected page component
 */
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
