import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  Clock, 
  UserCheck, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  X, 
  Play, 
  CheckCircle2, 
  HelpCircle,
  Radio
} from 'lucide-react';
import { 
  CALLER_SCRIPTS, 
  speakCallerDialogue, 
  stopCallerDialogue,
  unlockAudio 
} from '../utils/fakeCallAudio';
import FakeCallModal from './FakeCallModal';
import { useToast } from '../context/ToastContext';

/**
 * FakeCallTrigger Component
 * Control panel to configure, schedule, and trigger a simulated incoming phone call.
 * Offers customizable caller identities and countdown timers (Instant, 10s, 30s, 60s).
 */
function FakeCallTrigger() {
  const { showToast } = useToast();

  const [selectedCallerKey, setSelectedCallerKey] = useState('police');
  const [delaySeconds, setDelaySeconds] = useState(0);
  const [isScheduled, setIsScheduled] = useState(false);
  const [countdownRemaining, setCountdownRemaining] = useState(0);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isTestingVoice, setIsTestingVoice] = useState(false);

  // Available timer presets
  const timerPresets = [
    { label: 'Instant', value: 0 },
    { label: '10s Delay', value: 10 },
    { label: '30s Delay', value: 30 },
    { label: '60s Delay', value: 60 }
  ];

  const currentCaller = CALLER_SCRIPTS[selectedCallerKey] || CALLER_SCRIPTS.police;

  // Cleanup timers & audio on unmount
  useEffect(() => {
    return () => {
      stopCallerDialogue();
    };
  }, []);

  // Bulletproof countdown scheduler hook
  useEffect(() => {
    if (!isScheduled) return;

    if (countdownRemaining <= 0) {
      setIsScheduled(false);
      setIsCallModalOpen(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdownRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isScheduled, countdownRemaining]);

  // Test voice dialogue directly in panel
  const handleToggleVoiceTest = () => {
    unlockAudio();

    if (isTestingVoice) {
      stopCallerDialogue();
      setIsTestingVoice(false);
      return;
    }

    setIsTestingVoice(true);
    speakCallerDialogue(
      currentCaller,
      () => setIsTestingVoice(true),
      () => setIsTestingVoice(false)
    );
  };

  // Initiate call trigger
  const handleStartCall = () => {
    // Unlock browser audio context during this explicit user click gesture
    unlockAudio();

    if (delaySeconds === 0) {
      // Instant call
      setIsScheduled(false);
      setIsCallModalOpen(true);
      showToast({
        title: "Incoming Call Active",
        message: `Simulating call from ${currentCaller.name}`,
        type: "info",
        duration: 3000
      });
      return;
    }

    // Start scheduled countdown
    setIsScheduled(true);
    setCountdownRemaining(delaySeconds);

    showToast({
      title: "Call Scheduled",
      message: `Simulated call from ${currentCaller.name} will ring in ${delaySeconds} seconds.`,
      type: "info",
      duration: 3500
    });
  };

  // Cancel scheduled countdown
  const handleCancelCountdown = () => {
    setIsScheduled(false);
    setCountdownRemaining(0);
    showToast({
      title: "Scheduled Call Cancelled",
      message: "The fake call timer was safely dismissed.",
      type: "info",
      duration: 3000
    });
  };

  return (
    <div className="fake-call-trigger-card">
      <div className="trigger-card-header">
        <div className="trigger-title-group">
          <div className="trigger-icon-badge">
            <PhoneCall size={22} />
          </div>
          <div>
            <h3 className="trigger-card-title">Fake Call Escape Simulator</h3>
            <p className="trigger-card-sub">
              Trigger a realistic incoming phone call to gracefully exit uncomfortable conversations or lonely transit encounters.
            </p>
          </div>
        </div>

        {/* Live Active Countdown Status Pill */}
        {isScheduled && (
          <div className="active-countdown-pill">
            <span className="countdown-ring-pulse"></span>
            <span>Ringing in <strong>{countdownRemaining}s</strong></span>
            <button 
              type="button" 
              className="cancel-countdown-btn"
              onClick={handleCancelCountdown}
              title="Cancel Scheduled Call"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* 1. Caller Identity Selection */}
      <div className="trigger-section">
        <label className="trigger-section-label">
          <UserCheck size={16} /> 1. Select Caller Identity
        </label>
        <div className="caller-presets-grid">
          {Object.entries(CALLER_SCRIPTS).map(([key, caller]) => {
            const isSelected = selectedCallerKey === key;
            return (
              <button
                key={key}
                type="button"
                className={`caller-preset-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedCallerKey(key)}
              >
                <div 
                  className="caller-preset-avatar"
                  style={{ backgroundColor: caller.avatarBg }}
                >
                  {caller.name.charAt(0)}
                </div>
                <div className="caller-preset-info">
                  <div className="caller-preset-name">
                    {caller.name}
                    {isSelected && <CheckCircle2 size={15} className="preset-check" />}
                  </div>
                  <div className="caller-preset-num">{caller.number}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Timer Presets */}
      <div className="trigger-section">
        <label className="trigger-section-label">
          <Clock size={16} /> 2. Choose Delay Countdown
        </label>
        <div className="timer-presets-row">
          {timerPresets.map((preset) => {
            const isSelected = delaySeconds === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                className={`timer-preset-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setDelaySeconds(preset.value)}
                disabled={isScheduled}
              >
                <Clock size={14} />
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Action Buttons & Dialogue Preview */}
      <div className="trigger-footer">
        <div className="script-preview-box">
          <div className="script-preview-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Volume2 size={14} className={isTestingVoice ? 'icon-pulse-blue' : ''} />
              <span>Spoken Voice Preview:</span>
            </div>
            <button 
              type="button" 
              className={`test-voice-preview-btn ${isTestingVoice ? 'active-testing' : ''}`}
              onClick={handleToggleVoiceTest}
              title="Click to test spoken voice dialogue now"
            >
              {isTestingVoice ? <VolumeX size={13} /> : <Volume2 size={13} />}
              <span>{isTestingVoice ? 'Stop Speaking' : 'Test Spoken Voice'}</span>
            </button>
          </div>
          <p className="script-preview-text">
            "{currentCaller.script}"
          </p>
        </div>

        <div className="trigger-action-row">
          {isScheduled ? (
            <button 
              type="button" 
              className="btn-danger cancel-scheduled-btn"
              onClick={handleCancelCountdown}
            >
              <X size={18} /> Cancel Scheduled Call ({countdownRemaining}s)
            </button>
          ) : (
            <button 
              type="button" 
              className="btn-primary trigger-call-btn"
              onClick={handleStartCall}
            >
              <Play size={18} /> 
              {delaySeconds === 0 ? "Trigger Call Now (Instant)" : `Schedule Call in ${delaySeconds}s`}
            </button>
          )}
        </div>
      </div>

      {/* Safety Guideline Note */}
      <div className="trigger-tip-note">
        <ShieldAlert size={15} />
        <span>
          <strong>Pro-Tip:</strong> Set a 30s delay before getting into an auto-rickshaw or cab. When it rings, answer and say <em>"Yes, I shared my live location with you, see you soon"</em> to deter any ill intentions.
        </span>
      </div>

      {/* Smartphone Call Modal Component */}
      <FakeCallModal 
        isOpen={isCallModalOpen} 
        caller={currentCaller} 
        onClose={() => setIsCallModalOpen(false)} 
      />
    </div>
  );
}

export default FakeCallTrigger;
