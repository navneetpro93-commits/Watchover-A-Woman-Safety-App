import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * Uses AuthContext to verify authentication state before rendering protected children.
 * If not authenticated, redirects automatically to /login.
 */
function ProtectedRoute({ isAuthenticated: propIsAuth, children }) {
  const { isAuthenticated: contextIsAuth } = useAuth();
  const isAuth = propIsAuth !== undefined ? propIsAuth : contextIsAuth;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;

