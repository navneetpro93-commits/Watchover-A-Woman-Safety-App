import React, { useState, useEffect } from 'react';
import { 
  X, 
  AlertTriangle, 
  MapPin, 
  ShieldAlert, 
  Send, 
  Compass, 
  CheckCircle2, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { incidentService } from '../services/incidentService';
import { useGeolocation } from '../utils/useGeolocation';
import { useToast } from '../context/ToastContext';

/**
 * ReportIncidentModal Component (Step 3 of Community Incident Reporter)
 * Demonstrates Syllabus Topics:
 * - Lectures 37-48: Controlled Components, Form Handling & Form State
 * - Lectures 49-60: Modal Dialog Pattern, Conditional Rendering, Accessibility
 * - Lectures 85-90: Form Validation, Async Submission, Error State Boundaries, and Toast Integration
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility flag
 * @param {Function} props.onClose - Modal close handler
 * @param {Function} props.onIncidentCreated - Callback to trigger feed refresh
 * @param {Object} props.user - Authenticated user object
 */
function ReportIncidentModal({ isOpen, onClose, onIncidentCreated, user }) {
  const toast = useToast();
  const { coordinates, getImmediateLocation, isLoading: isLocating } = useGeolocation();

  // Controlled Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Poor Street Lighting',
    severity: 'Medium',
    location: '',
    latitude: '',
    longitude: '',
    description: ''
  });

  // Validation Error State & Touched Field Tracker
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill GPS coordinates when modal opens or coordinates update
  useEffect(() => {
    if (isOpen) {
      if (!coordinates.latitude) {
        getImmediateLocation();
      } else {
        setFormData((prev) => ({
          ...prev,
          latitude: coordinates.latitude.toFixed(6),
          longitude: coordinates.longitude.toFixed(6)
        }));
      }
    }
  }, [isOpen, coordinates.latitude, coordinates.longitude, getImmediateLocation]);

  if (!isOpen) return null;

  // Real-time defensive form validation
  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        if (!value.trim()) return 'Incident title is required.';
        if (value.trim().length < 5) return 'Title must be at least 5 characters.';
        return '';
      case 'location':
        if (!value.trim()) return 'Specific street name or landmark is required.';
        if (value.trim().length < 4) return 'Location description is too short.';
        return '';
      case 'description':
        if (!value.trim()) return 'Detailed incident description is required.';
        if (value.trim().length < 15) return 'Please provide at least 15 characters describing the safety hazard.';
        return '';
      default:
        return '';
    }
  };

  // Handle Controlled Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  // Handle onBlur field touch tracking
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  // Sync Current GPS Coordinates manually
  const handleSyncCurrentLocation = () => {
    getImmediateLocation();
    if (coordinates.latitude) {
      setFormData((prev) => ({
        ...prev,
        latitude: coordinates.latitude.toFixed(6),
        longitude: coordinates.longitude.toFixed(6)
      }));
      toast.info('GPS satellite coordinates synced.');
    }
  };

  // Handle Async Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched for comprehensive validation
    const titleErr = validateField('title', formData.title);
    const locErr = validateField('location', formData.location);
    const descErr = validateField('description', formData.description);

    const validationErrors = {
      title: titleErr,
      location: locErr,
      description: descErr
    };

    setErrors(validationErrors);
    setTouched({ title: true, location: true, description: true });

    if (titleErr || locErr || descErr) {
      toast.warning('Please resolve highlighted form errors before posting.', { title: 'Incomplete Report' });
      return;
    }

    setIsSubmitting(true);
    try {
      await incidentService.createIncident({
        ...formData,
        reportedBy: user?.name || 'WatchOver Member'
      });

      toast.success('Your incident report has been published to the community feed.', {
        title: 'Safety Hazard Reported'
      });

      // Reset form state
      setFormData({
        title: '',
        category: 'Poor Street Lighting',
        severity: 'Medium',
        location: '',
        latitude: '',
        longitude: '',
        description: ''
      });
      setErrors({});
      setTouched({});

      if (onIncidentCreated) {
        onIncidentCreated();
      }

      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to publish incident report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Poor Street Lighting',
    'Harassment Hotspot',
    'Secluded Area',
    'Suspicious Activity'
  ];

  const severities = ['Medium', 'High', 'Critical'];

  return (
    <div className="report-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="report-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="report-modal-header">
          <div className="report-header-title-group">
            <div className="report-modal-icon-badge">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h3>Report Safety Hazard or Incident</h3>
              <p>Alert fellow commuters and request local patrol verification</p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onClose} 
            className="report-close-btn"
            aria-label="Close report modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body / Controlled Form */}
        <form onSubmit={handleSubmit} className="report-form-body">
          {/* Incident Title */}
          <div className="report-form-group">
            <label className="report-label">
              Incident Summary / Title <span className="req-star">*</span>
            </label>
            <input 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Broken streetlights near South Exit"
              className={`report-input ${touched.title && errors.title ? 'input-error' : ''}`}
            />
            {touched.title && errors.title && (
              <span className="field-error-msg">{errors.title}</span>
            )}
          </div>

          {/* Category & Severity Row */}
          <div className="report-form-row">
            <div className="report-form-group">
              <label className="report-label">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="report-select"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="report-form-group">
              <label className="report-label">Severity Level</label>
              <select 
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="report-select"
              >
                {severities.map((sev) => (
                  <option key={sev} value={sev}>{sev} Priority</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location Landmark */}
          <div className="report-form-group">
            <label className="report-label">
              Street Name / Exact Landmark <span className="req-star">*</span>
            </label>
            <div className="input-with-icon-wrapper">
              <MapPin size={16} className="input-inner-icon" />
              <input 
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Ring Road Bus Stand, Sector 12 Gate"
                className={`report-input with-icon ${touched.location && errors.location ? 'input-error' : ''}`}
              />
            </div>
            {touched.location && errors.location && (
              <span className="field-error-msg">{errors.location}</span>
            )}
          </div>

          {/* GPS Coordinates Bar */}
          <div className="report-gps-sync-card">
            <div className="gps-sync-left">
              <Compass size={18} className="text-primary" />
              <div>
                <strong>Attached GPS Coordinates:</strong>
                <small>
                  {formData.latitude && formData.longitude
                    ? `${formData.latitude}, ${formData.longitude}`
                    : 'Coordinates will default to active city center'}
                </small>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-secondary-outline gps-sync-btn"
              onClick={handleSyncCurrentLocation}
              disabled={isLocating}
            >
              <Sparkles size={14} className={isLocating ? 'animate-spin' : ''} />
              <span>{isLocating ? 'Acquiring...' : 'Sync Live GPS'}</span>
            </button>
          </div>

          {/* Detailed Description */}
          <div className="report-form-group">
            <label className="report-label">
              Detailed Observations <span className="req-star">*</span>
            </label>
            <textarea 
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Describe the safety concern in detail (e.g. lack of visibility, missing security guards, suspicious individuals, alternative safer paths)..."
              className={`report-textarea ${touched.description && errors.description ? 'input-error' : ''}`}
            />
            {touched.description && errors.description && (
              <span className="field-error-msg">{errors.description}</span>
            )}
          </div>

          {/* Modal Actions */}
          <div className="report-modal-footer">
            <button 
              type="button" 
              onClick={onClose} 
              className="btn-secondary-outline"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary report-submit-btn"
              disabled={isSubmitting}
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Publishing Report...' : 'Publish to Feed'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportIncidentModal;
