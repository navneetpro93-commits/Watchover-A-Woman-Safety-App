/**
 * Form Validation Strategies Utility
 * Demonstrates CE2 Syllabus Topics:
 * - Form handling in React: Validation strategies
 * - Reusable validation helper functions
 */

export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || !value.toString().trim()) {
    return `${fieldName} is required.`;
  }
  return '';
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email address is required.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address (e.g. name@domain.com).';
  }
  return '';
};

export const validatePhone = (phone, fieldName = 'Phone number') => {
  if (!phone || !phone.trim()) {
    return `${fieldName} is required.`;
  }
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.length < 10) {
    return `${fieldName} must contain at least 10 digits.`;
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required.';
  }
  if (password.length < 7) {
    return 'Password must be at least 7 characters long.';
  }
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  if (!hasSpecial) {
    return 'Password must include at least one special character (!@#$%^&*).';
  }
  return '';
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) {
    return 'Please confirm your password.';
  }
  if (confirmPassword !== password) {
    return 'Passwords do not match.';
  }
  return '';
};
