import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Radio, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Compass, 
  RefreshCw,
  PhoneCall,
  MessageSquare
} from 'lucide-react';
import { useGeolocation } from '../utils/useGeolocation';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../utils/useLanguage';

/**
 * LiveTracker Component (Step 2 of Live GPS Tracking)
 * Demonstrates Syllabus Topics:
 * - Lectures 25-36: Web APIs & Event Handlers (Clipboard API, Geolocation API)
 * - Lectures 49-60: React Component State, Conditional Rendering, Props & Hooks
 * - Lectures 61-72: Custom Hooks Consumption (useGeolocation, useToast, useLanguage)
 * - Lectures 85-90: Async States (Pulsing Radar, Loading Spinners, Defensive Error Handling, WhatsApp Emergency Sharing)
 * 
 * @param {Object} props
 * @param {Array} props.emergencyContacts - Registered emergency contacts for WhatsApp sharing
 */
function LiveTracker({ emergencyContacts = [] }) {
  const {
    coordinates,
    isTracking,
    isLoading,
    error,
    permissionStatus,
    shareableLinks,
    getImmediateLocation,
    startTracking,
    stopTracking
  } = useGeolocation();

  const toast = useToast();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Copy GPS Coordinates or Google Maps Link to Clipboard
  const handleCopyLink = () => {
    if (!shareableLinks.googleMaps) {
      toast.warning('No GPS fix available yet. Click "Get Current Location" first.', { title: 'Coordinates Missing' });
      return;
    }

    const textToCopy = `Emergency Live Location: ${shareableLinks.googleMaps} (Lat: ${coordinates.latitude?.toFixed(5)}, Lon: ${coordinates.longitude?.toFixed(5)})`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      toast.success('Live location link copied to clipboard!', { title: 'Copied' });
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      toast.error('Failed to copy to clipboard.');
    });
  };

  // Construct automated distress WhatsApp message with live GPS
  const getWhatsAppMessage = () => {
    if (!coordinates.latitude || !coordinates.longitude) {
      return "URGENT: I need help! Please contact me immediately.";
    }
    return `URGENT SOS: Here is my real-time GPS location: ${shareableLinks.googleMaps} (Accuracy: within ${Math.round(coordinates.accuracy || 15)}m). Please track me or send assistance!`;
  };

  return (
    <div className="live-tracker-card">
      {/* 1. Header with Status Badge */}
      <div className="tracker-header">
        <div className="tracker-title-group">
          <div className="tracker-icon-badge">
            <Navigation size={22} className={isTracking ? 'tracker-compass-spin' : ''} />
          </div>
          <div>
            <h3 className="tracker-title">Live GPS Location Radar</h3>
            <p className="tracker-subtitle">Real-time satellite positioning & guardian emergency sharing</p>
          </div>
        </div>

        {/* Live Signal Indicator Pill */}
        <div className={`tracker-status-pill ${isTracking ? 'tracking' : 'idle'}`}>
          <span className="tracker-status-dot" />
          <span>{isTracking ? 'Active Live Tracking' : 'Idle / Standby'}</span>
        </div>
      </div>

      {/* 2. Error Display Banner (if GPS is denied or unavailable) */}
      {error && (
        <div className="tracker-error-banner" role="alert">
          <AlertTriangle size={18} className="tracker-error-icon" />
          <div className="tracker-error-text">
            <strong>Location Warning:</strong> {error.message}
          </div>
        </div>
      )}

      {/* 3. Coordinates & Satellite Telemetry Grid */}
      <div className="telemetry-grid">
        <div className="telemetry-box">
          <div className="telemetry-label">Latitude</div>
          <div className="telemetry-value">
            {coordinates.latitude !== null ? coordinates.latitude.toFixed(6) : '—'}
          </div>
        </div>

        <div className="telemetry-box">
          <div className="telemetry-label">Longitude</div>
          <div className="telemetry-value">
            {coordinates.longitude !== null ? coordinates.longitude.toFixed(6) : '—'}
          </div>
        </div>

        <div className="telemetry-box">
          <div className="telemetry-label">Accuracy</div>
          <div className="telemetry-value">
            {coordinates.accuracy !== null ? `±${Math.round(coordinates.accuracy)} meters` : '—'}
          </div>
        </div>

        <div className="telemetry-box">
          <div className="telemetry-label">Last Ping</div>
          <div className="telemetry-value telemetry-time">
            {coordinates.timestamp ? (
              <>
                <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />
                {coordinates.timestamp}
              </>
            ) : 'Pending Fix'}
          </div>
        </div>
      </div>

      {/* 4. Action Controls Bar */}
      <div className="tracker-controls-bar">
        {!isTracking ? (
          <button 
            type="button"
            className="btn-primary tracker-btn start-btn"
            onClick={() => {
              startTracking();
              toast.info('Starting continuous GPS hardware satellite tracking...', { title: 'Radar Activated' });
            }}
            disabled={isLoading}
          >
            <Radio size={18} className={isLoading ? 'animate-spin' : ''} />
            <span>{isLoading ? 'Acquiring Satellites...' : 'Start Live Tracking'}</span>
          </button>
        ) : (
          <button 
            type="button"
            className="btn-secondary-outline tracker-btn stop-btn"
            onClick={() => {
              stopTracking();
              toast.warning('Continuous GPS live tracking stopped.', { title: 'Radar Paused' });
            }}
          >
            <Radio size={18} />
            <span>Stop Tracking</span>
          </button>
        )}

        {/* Quick 1-Time Location Refresh */}
        <button 
          type="button" 
          className="btn-secondary-outline tracker-btn"
          onClick={() => {
            getImmediateLocation();
            toast.info('Requesting fresh GPS coordinates...');
          }}
          disabled={isLoading}
          title="Fetch instantaneous coordinates"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          <span>One-Time Fix</span>
        </button>

        {/* Copy Link to Clipboard */}
        <button 
          type="button" 
          className="btn-secondary-outline tracker-btn copy-btn"
          onClick={handleCopyLink}
          disabled={!coordinates.latitude}
          title="Copy Google Maps link to clipboard"
        >
          {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
          <span>{copied ? 'Link Copied!' : 'Copy Location Link'}</span>
        </button>

        {/* Direct Open in Google Maps */}
        {shareableLinks.googleMaps && (
          <a 
            href={shareableLinks.googleMaps} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary-outline tracker-btn ext-btn"
            title="Open in Google Maps"
          >
            <ExternalLink size={16} />
            <span>Open Maps</span>
          </a>
        )}
      </div>

      {/* 5. Guardian WhatsApp Instant Dispatch Panel */}
      <div className="tracker-dispatch-section">
        <div className="dispatch-header">
          <Share2 size={16} className="text-primary" />
          <span>Broadcast Location to Registered Guardians:</span>
        </div>

        {emergencyContacts && emergencyContacts.length > 0 ? (
          <div className="guardian-quick-dispatch-list">
            {emergencyContacts.map((contact) => {
              const cleanPhone = (contact.phone || '').replace(/[^0-9]/g, '');
              const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(getWhatsAppMessage())}`;

              return (
                <div key={contact.id} className="guardian-chip">
                  <div className="guardian-chip-info">
                    <strong>{contact.name}</strong>
                    <small>{contact.phone}</small>
                  </div>
                  <div className="guardian-chip-actions">
                    <a 
                      href={`tel:${contact.phone}`} 
                      className="chip-btn call"
                      title={`Call ${contact.name}`}
                    >
                      <PhoneCall size={13} /> Call
                    </a>
                    <a 
                      href={waLink}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="chip-btn whatsapp"
                      title={`Send live GPS to ${contact.name} via WhatsApp`}
                    >
                      <MessageSquare size={13} /> WhatsApp GPS
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="guardian-empty-hint">
            <ShieldCheck size={15} />
            <span>No emergency contacts configured yet. Visit <strong>Settings</strong> to add parent & guardian phone numbers for 1-tap WhatsApp location dispatch.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveTracker;
