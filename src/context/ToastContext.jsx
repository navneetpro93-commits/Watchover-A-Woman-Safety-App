import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

/**
 * ToastContext
 * Demonstrates:
 * 1. Global Alert/Notification state architecture via React Context API
 * 2. Async queue management with dynamic IDs and auto-dismiss timeouts
 * 3. Feedback categories: 'success' | 'error' | 'warning' | 'info'
 * 4. Custom hook `useToast()` for clean, reusable invocation
 */
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Remove toast by unique ID
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Add toast with auto-dismiss duration
  const addToast = useCallback(({ message, type = 'info', duration = 3500, title = '' }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    
    setToasts((prev) => [...prev, { id, message, type, title, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  // Convenience helper methods
  const success = useCallback((message, options = {}) => {
    return addToast({ message, type: 'success', ...options });
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast({ message, type: 'error', duration: 4500, ...options });
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast({ message, type: 'warning', ...options });
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast({ message, type: 'info', ...options });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
      {children}
      
      {/* Toast Container rendered at application root */}
      <div 
        className="toast-container" 
        aria-live="polite" 
        aria-atomic="true"
        role="region"
        aria-label="Notification Center"
      >
        {toasts.map((toast) => (
          <ToastItem 
            key={toast.id} 
            toast={toast} 
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Single Toast Item with Accessible Icons and Smooth Slide-in
function ToastItem({ toast, onClose }) {
  const { type, message, title } = toast;

  const iconMap = {
    success: <CheckCircle2 size={20} className="toast-icon success" />,
    error: <AlertCircle size={20} className="toast-icon error" />,
    warning: <AlertTriangle size={20} className="toast-icon warning" />,
    info: <Info size={20} className="toast-icon info" />
  };

  return (
    <div className={`toast-item toast-${type}`} role="alert">
      <div className="toast-icon-wrapper">
        {iconMap[type] || iconMap.info}
      </div>
      
      <div className="toast-content">
        {title && <div className="toast-title">{title}</div>}
        <div className="toast-message">{message}</div>
      </div>

      <button 
        type="button"
        className="toast-close-btn" 
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={15} />
      </button>

      {/* Visual countdown progress line */}
      <div className="toast-progress-bar" />
    </div>
  );
}

// Custom Hook to consume ToastContext anywhere in the app
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export default ToastContext;
