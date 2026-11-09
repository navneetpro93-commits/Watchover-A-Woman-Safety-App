import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Grid, 
  UserPlus, 
  Video, 
  Users, 
  ShieldCheck, 
  X 
} from 'lucide-react';
import { 
  startRingtone, 
  stopRingtone, 
  speakCallerDialogue, 
  stopCallerDialogue 
} from '../utils/fakeCallAudio';

/**
 * FakeCallModal Component
 * Renders a full-screen realistic smartphone incoming & connected call interface.
 * Used as a psychological deterrent and exit strategy in hazardous environments.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Object} props.caller - Active caller profile (name, number, script, avatarBg)
 * @param {Function} props.onClose - Dismiss callback
 */
function FakeCallModal({ isOpen, caller, onClose }) {
  // Call states: 'ringing' | 'connected'
  const [callState, setCallState] = useState('ringing');
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const durationTimerRef = useRef(null);

  // Handle incoming call ringtone lifecycle
  useEffect(() => {
    if (!isOpen) {
      stopRingtone();
      stopCallerDialogue();
      setCallState('ringing');
      setDuration(0);
      setIsSpeaking(false);
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
      return;
    }

    // Play ringing sound on incoming
    if (callState === 'ringing') {
      startRingtone();
    }

    return () => {
      stopRingtone();
      stopCallerDialogue();
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    };
  }, [isOpen, callState]);

  // Answer call handler
  const handleAccept = () => {
    stopRingtone();
    setCallState('connected');
    setDuration(0);
    setIsSpeaking(true);

    // Start live duration counter
    durationTimerRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    // Speak caller dialogue using Web Speech API with caller acoustic profile
    if (caller) {
      speakCallerDialogue(
        caller,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  // Replay speech dialogue
  const handleReplayDialogue = (e) => {
    if (e) e.stopPropagation();
    if (caller) {
      speakCallerDialogue(
        caller,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  // Decline or hang up call
  const handleDecline = () => {
    stopRingtone();
    stopCallerDialogue();
    if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    setCallState('ringing');
    setDuration(0);
    setIsSpeaking(false);
    onClose();
  };

  if (!isOpen || !caller) return null;

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  // Get caller initials for avatar
  const initials = caller.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="fake-call-overlay" role="dialog" aria-modal="true">
      <div className="fake-call-container">
        
        {/* Top Safety Banner & Dismiss */}
        <div className="fake-call-topbar">
          <div className="safety-disclaimer-pill">
            <ShieldCheck size={14} /> WatchOver Safety Simulator
          </div>
          <button 
            type="button" 
            className="fake-call-exit-btn" 
            onClick={handleDecline}
            aria-label="Exit Simulator"
            title="Exit Simulator"
          >
            <X size={18} />
          </button>
        </div>

        {/* Caller Profile Section */}
        <div className="fake-caller-header">
          <div 
            className={`fake-caller-avatar ${callState === 'ringing' ? 'avatar-pulsing' : ''}`}
            style={{ backgroundColor: caller.avatarBg || '#1e3a8a' }}
          >
            <span>{initials}</span>
          </div>

          <h2 className="fake-caller-name">{caller.name}</h2>
          <p className="fake-caller-sub">
            {callState === 'ringing' ? 'Incoming Mobile Call...' : formatTime(duration)}
          </p>
          <span className="fake-caller-number">{caller.number}</span>

          {/* Active Speaking Indicator */}
          {callState === 'connected' && (
            <>
              <div className={`speaking-status-pill ${isSpeaking ? 'active-speaking' : ''}`}>
                <span className="pulse-dot"></span>
                {isSpeaking ? 'Caller Speaking Voice...' : 'Voice Dialogue Ready'}
              </div>

              {/* In-Call Live Transcript & Replay Speech Button */}
              <div className="in-call-transcript-card">
                <div className="transcript-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Volume2 size={14} className={isSpeaking ? 'transcript-speaker-active' : ''} />
                    <span>Caller Voice:</span>
                  </div>
                  <button 
                    type="button" 
                    className="replay-speech-btn"
                    onClick={handleReplayDialogue}
                    title="Tap to speak dialogue again"
                  >
                    🔊 Speak Again
                  </button>
                </div>
                <p className="transcript-quote">"{caller.script}"</p>
              </div>
            </>
          )}
        </div>

        {/* Connected In-Call Action Grid */}
        {callState === 'connected' && (
          <div className="in-call-actions-grid">
            <button 
              type="button" 
              className={`in-call-btn ${isMuted ? 'btn-active' : ''}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              <div className="in-call-icon-wrap">
                {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
              </div>
              <span>{isMuted ? 'Muted' : 'Mute'}</span>
            </button>

            <button type="button" className="in-call-btn" onClick={() => {}}>
              <div className="in-call-icon-wrap">
                <Grid size={22} />
              </div>
              <span>Keypad</span>
            </button>

            <button 
              type="button" 
              className={`in-call-btn ${isSpeaker ? 'btn-active' : ''}`}
              onClick={() => setIsSpeaker(!isSpeaker)}
            >
              <div className="in-call-icon-wrap">
                {isSpeaker ? <Volume2 size={22} /> : <VolumeX size={22} />}
              </div>
              <span>Speaker</span>
            </button>

            <button type="button" className="in-call-btn" onClick={() => {}}>
              <div className="in-call-icon-wrap">
                <UserPlus size={22} />
              </div>
              <span>Add Call</span>
            </button>

            <button type="button" className="in-call-btn" onClick={() => {}}>
              <div className="in-call-icon-wrap">
                <Video size={22} />
              </div>
              <span>FaceTime</span>
            </button>

            <button type="button" className="in-call-btn" onClick={() => {}}>
              <div className="in-call-icon-wrap">
                <Users size={22} />
              </div>
              <span>Contacts</span>
            </button>
          </div>
        )}

        {/* Bottom Call Accept / Decline Controls */}
        <div className="fake-call-footer">
          {callState === 'ringing' ? (
            <div className="ringing-controls-group">
              {/* Decline Button */}
              <div className="call-btn-action-col">
                <button 
                  type="button" 
                  className="call-ctrl-btn decline-call-btn"
                  onClick={handleDecline}
                  aria-label="Decline Call"
                >
                  <PhoneOff size={28} />
                </button>
                <span className="call-btn-label">Decline</span>
              </div>

              {/* Accept Button */}
              <div className="call-btn-action-col">
                <button 
                  type="button" 
                  className="call-ctrl-btn accept-call-btn"
                  onClick={handleAccept}
                  aria-label="Accept Call"
                >
                  <Phone size={28} />
                </button>
                <span className="call-btn-label">Accept</span>
              </div>
            </div>
          ) : (
            <div className="connected-controls-group">
              <div className="call-btn-action-col">
                <button 
                  type="button" 
                  className="call-ctrl-btn decline-call-btn"
                  onClick={handleDecline}
                  aria-label="End Call"
                >
                  <PhoneOff size={30} />
                </button>
                <span className="call-btn-label">End Call</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default FakeCallModal;
