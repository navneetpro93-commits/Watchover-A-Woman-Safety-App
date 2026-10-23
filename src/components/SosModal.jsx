import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  X, 
  AlertTriangle, 
  Radio, 
  Volume2, 
  VolumeX, 
  Users, 
  ShieldCheck, 
  Send,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * SosModal Component
 * Demonstrates CE2 Topics:
 * - Modal dialog state & accessibility
 * - Async Web Audio API sound synthesis
 * - Automated personal emergency contact notification & live dispatch status
 * - Consuming global AuthContext for user emergency contacts
 */
function SosModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const [isSirenActive, setIsSirenActive] = useState(true);
  const [dispatchStatus, setDispatchStatus] = useState('broadcasting'); // 'broadcasting' | 'delivered'
  const [notifiedMap, setNotifiedMap] = useState({});
  const [dispatchTime, setDispatchTime] = useState('');

  const audioCtxRef = useRef(null);
  const sirenIntervalRef = useRef(null);

  const emergencyContacts = user?.emergencyContacts || [];

  // Web Audio API Siren Synthesizer
  const startSiren = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      let highTone = true;
      const playTone = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(highTone ? 880 : 660, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.35);
        highTone = !highTone;
      };

      playTone();
      sirenIntervalRef.current = setInterval(playTone, 400);
    } catch (err) {
      console.error("Audio Context Siren Error:", err);
    }
  };

  const stopSiren = () => {
    if (sirenIntervalRef.current) {
      clearInterval(sirenIntervalRef.current);
      sirenIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {
        // audio context already closed
      }
      audioCtxRef.current = null;
    }
  };

  // Trigger siren and auto-dispatch personal contacts notification upon opening
  useEffect(() => {
    if (isOpen) {
      if (isSirenActive) {
        startSiren();
      }
      setDispatchStatus('broadcasting');
      setDispatchTime(new Date().toLocaleTimeString());

      // Simulate automated broadcast delivery to all personal emergency contacts
      const timer = setTimeout(() => {
        setDispatchStatus('delivered');
        const initialMap = {};
        emergencyContacts.forEach((c) => {
          initialMap[c.id] = true;
        });
        setNotifiedMap(initialMap);
      }, 700);

      return () => {
        clearTimeout(timer);
        stopSiren();
      };
    } else {
      stopSiren();
    }
  }, [isOpen, isSirenActive, emergencyContacts]);

  if (!isOpen) return null;

  const toggleSirenAudio = () => {
    setIsSirenActive(prev => !prev);
  };

  const handleManualReNotify = (contactId) => {
    setNotifiedMap(prev => ({ ...prev, [contactId]: true }));
  };

  const handleReBroadcastAll = () => {
    setDispatchStatus('broadcasting');
    setDispatchTime(new Date().toLocaleTimeString());
    setTimeout(() => {
      setDispatchStatus('delivered');
      const allNotified = {};
      emergencyContacts.forEach((c) => {
        allNotified[c.id] = true;
      });
      setNotifiedMap(allNotified);
    }, 600);
  };

  return (
    <div 
      className="modal-overlay sos-modal-overlay" 
      onClick={onClose}
    >
      <div 
        className="modal-card sos-modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Urgent Header Banner */}
        <div className="sos-modal-header">
          <div className="sos-header-title-group">
            <Radio size={22} className="sos-pulse-icon" />
            <h3>EMERGENCY SOS ALERT</h3>
          </div>
          <button 
            type="button"
            onClick={onClose}
            aria-label="Close SOS Alert"
            className="sos-header-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="sos-modal-body">
          
          {/* Automated Notification Broadcast Card */}
          <div className="sos-dispatch-banner">
            <div className="sos-dispatch-status-row">
              <div className="dispatch-badge-wrap">
                {dispatchStatus === 'broadcasting' ? (
                  <span className="dispatch-pill broadcasting">
                    <span className="pulse-dot"></span> Disagreeing/Transmitting SOS...
                  </span>
                ) : (
                  <span className="dispatch-pill delivered">
                    <CheckCircle2 size={14} /> Personal Contacts Notified ({emergencyContacts.length})
                  </span>
                )}
              </div>
              <span className="dispatch-timestamp">
                <Clock size={13} /> {dispatchTime || 'Just now'}
              </span>
            </div>

            <p className="sos-dispatch-note">
              🚨 <strong>Automated Distress Dispatch:</strong> SMS & coordinates simulation sent to your registered contacts: {emergencyContacts.length > 0 ? emergencyContacts.map(c => c.name).join(', ') : 'No contacts saved'}.
            </p>

            <button 
              type="button" 
              onClick={handleReBroadcastAll}
              className="sos-re-broadcast-btn"
            >
              <Send size={13} /> Re-send Emergency Alert to All Contacts
            </button>
          </div>

          {/* Siren Control Bar */}
          <div className="sos-siren-bar">
            <div className="siren-status-label">
              <AlertTriangle size={18} />
              <span>Distress Siren: <strong>{isSirenActive ? 'SOUNDING' : 'MUTED'}</strong></span>
            </div>
            <button
              type="button"
              onClick={toggleSirenAudio}
              className={`siren-toggle-btn ${isSirenActive ? 'active' : ''}`}
            >
              {isSirenActive ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isSirenActive ? 'Mute Siren' : 'Sound Siren'}</span>
            </button>
          </div>

          {/* Quick National Helplines Grid */}
          <h4 className="sos-section-title">
            National Emergency Dispatch (One-Tap Calling)
          </h4>
          <div className="sos-helplines-grid">
            <a href="tel:112" className="sos-helpline-box primary-emergency">
              <PhoneCall size={20} />
              <span className="helpline-num">112</span>
              <small>Police / National Dispatch</small>
            </a>

            <a href="tel:1091" className="sos-helpline-box women-emergency">
              <PhoneCall size={20} />
              <span className="helpline-num">1091</span>
              <small>Women In Distress Helpline</small>
            </a>
          </div>

          {/* User's Verified Emergency Contacts with 1-Click Notify Options */}
          <div className="sos-contacts-header-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} className="text-primary" />
              <h4 className="sos-section-title" style={{ margin: 0 }}>
                Personal Contacts Notified ({emergencyContacts.length})
              </h4>
            </div>
            <span className="sos-active-badge">Auto-Notified</span>
          </div>

          {emergencyContacts.length > 0 ? (
            <div className="sos-contacts-list">
              {emergencyContacts.map((c) => {
                const cleanPhone = c.phone.replace(/[^0-9]/g, '');
                const distressMsg = `🚨 EMERGENCY DISTRESS ALERT from ${user?.name || 'WatchOver Member'}! I need immediate safety assistance. Please contact me immediately.`;
                const isNotified = notifiedMap[c.id];

                return (
                  <div key={c.id} className="sos-contact-card">
                    <div className="contact-info">
                      <div className="contact-name-row">
                        <strong>{c.name}</strong>
                        {isNotified && (
                          <span className="contact-notified-tag">
                            <CheckCircle2 size={11} /> Notified
                          </span>
                        )}
                      </div>
                      <div className="contact-phone-text">{c.phone}</div>
                    </div>

                    <div className="contact-actions-row">
                      {/* Direct Phone Call */}
                      <a 
                        href={`tel:${c.phone}`} 
                        className="contact-action-icon-btn call"
                        title={`Call ${c.name} directly`}
                        onClick={() => handleManualReNotify(c.id)}
                      >
                        <PhoneCall size={14} /> Call
                      </a>

                      {/* Direct WhatsApp Distress Alert */}
                      <a 
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(distressMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-action-icon-btn whatsapp"
                        title="Send WhatsApp SOS message"
                        onClick={() => handleManualReNotify(c.id)}
                      >
                        <MessageSquare size={14} /> WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="sos-no-contacts-box">
              <AlertTriangle size={16} />
              <span>No emergency contacts configured yet. Please visit <strong>Settings</strong> to add your parent & guardian numbers.</span>
            </div>
          )}

          {/* Dismiss Safe Button */}
          <div className="sos-footer-actions">
            <button
              type="button"
              onClick={onClose}
              className="sos-safe-dismiss-btn"
            >
              <ShieldCheck size={18} className="text-emerald" />
              <span>I Am Safe (Dismiss Distress Alert)</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SosModal;
