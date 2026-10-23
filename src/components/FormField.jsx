import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Reusable FormField Component
 * Demonstrates CE2 Syllabus Topics:
 * - Reusable input components
 * - Accessible form labels and field-level error feedback
 * - Icon prefix support & conditional validation error styling
 */
function FormField({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  icon = null,
  error = '',
  helperText = '',
  disabled = false,
  autoComplete
}) {
  const hasError = Boolean(error);

  return (
    <div className={`form-group reusable-form-field ${hasError ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={id} className="form-field-label">
          {label}
          {required && <span className="required-indicator" aria-hidden="true">*</span>}
        </label>
      )}

      <div className={`input-wrapper ${hasError ? 'input-error' : ''}`}>
        {icon && <span className="input-icon-slot">{icon}</span>}
        <input
          id={id}
          name={name || id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className={`form-input-control ${icon ? 'has-icon-padding' : ''}`}
        />
      </div>

      {hasError ? (
        <p id={`${id}-error`} className="field-error-message" role="alert">
          <AlertCircle size={14} className="field-error-icon" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="field-helper-text">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default FormField;
