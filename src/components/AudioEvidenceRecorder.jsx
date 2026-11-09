import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Square, 
  ShieldAlert, 
  EyeOff, 
  Clock, 
  Sparkles, 
  Check, 
  AlertCircle,
  Radio,
  Lock,
  Eye
} from 'lucide-react';
import { 
  startAudioCapture, 
  stopAudioCapture, 
  saveRecordingToVault 
} from '../utils/audioRecorderService';
import { useToast } from '../context/ToastContext';

/**
 * AudioEvidenceRecorder Component
 * Provides 1-tap stealth audio capture with live AnalyserNode frequency waveforms,
 * a blackout stealth mode for discreet operation, and auto-saves to IndexedDB.
 * 
 * @param {Object} props
 * @param {Function} props.onRecordingComplete - Callback when a new recording is saved
 */
function AudioEvidenceRecorder({ onRecordingComplete }) {
  const { showToast } = useToast();

  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [waveformData, setWaveformData] = useState(new Array(24).fill(10));
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [clipTitle, setClipTitle] = useState('');

  const timerRef = useRef(null);
  const stealthTapCountRef = useRef(0);
  const stealthTapTimeoutRef = useRef(null);

  // Timer counter when recording is active
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setDuration(0);
      setWaveformData(new Array(24).fill(10));
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  // Start recording
  const handleStartRecording = async () => {
    setClipTitle(`Evidence Clip - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);

    const success = await startAudioCapture({
      onWaveformData: (data) => {
        // Downsample 32 bins to 24 bars for visual balance
        const sampled = [];
        const step = Math.floor(data.length / 24) || 1;
        for (let i = 0; i < 24; i++) {
          const val = data[i * step] || 10;
          sampled.push(Math.max(val, 8));
        }
        setWaveformData(sampled);
      },
      onError: (err) => {
        showToast({
          title: "Microphone Access Required",
          message: err.message || "Please allow microphone permissions in your browser.",
          type: "danger",
          duration: 4000
        });
        setIsRecording(false);
      }
    });

    if (success) {
      setIsRecording(true);
      showToast({
        title: "Stealth Audio Recording Active",
        message: "Microphone capturing audio evidence in background.",
        type: "warning",
        duration: 3000
      });
    }
  };

  // Stop recording & save to IndexedDB vault
  const handleStopRecording = async () => {
    setIsSaving(true);
    const result = await stopAudioCapture();
    setIsRecording(false);
    setIsStealthMode(false);

    if (result && result.blob) {
      const recordingRecord = {
        id: `rec_${Date.now()}`,
        title: clipTitle || `Evidence Clip - ${new Date().toLocaleTimeString()}`,
        blob: result.blob,
        mimeType: result.mimeType,
        size: result.size,
        duration: duration,
        timestamp: new Date().toISOString()
      };

      try {
        await saveRecordingToVault(recordingRecord);
        showToast({
          title: "Evidence Saved to Secure Vault",
          message: `Saved ${formatTime(duration)} audio clip encrypted locally.`,
          type: "success",
          duration: 4000
        });

        if (onRecordingComplete) {
          onRecordingComplete(recordingRecord);
        }
      } catch (saveErr) {
        console.error("Vault save failed:", saveErr);
        showToast({
          title: "Save Failed",
          message: "Could not save audio clip to IndexedDB.",
          type: "danger",
          duration: 3500
        });
      }
    }
    setIsSaving(false);
  };

  // Handle double-tap to exit stealth mode
  const handleStealthScreenClick = () => {
    stealthTapCountRef.current += 1;
    if (stealthTapCountRef.current === 1) {
      stealthTapTimeoutRef.current = setTimeout(() => {
        stealthTapCountRef.current = 0;
      }, 400);
    } else if (stealthTapCountRef.current >= 2) {
      clearTimeout(stealthTapTimeoutRef.current);
      stealthTapCountRef.current = 0;
      setIsStealthMode(false);
      showToast({
        title: "Stealth Disguise Deactivated",
        message: "Returned to WatchOver Audio Dashboard.",
        type: "info",
        duration: 2500
      });
    }
  };

  return (
    <>
      {/* Blackout Stealth Disguise Screen (When user wants zero visual traces) */}
      {isStealthMode && (
        <div 
          className="stealth-blackout-screen"
          onClick={handleStealthScreenClick}
          title="Double-tap anywhere to exit stealth disguise"
        >
          <div className="stealth-disguise-content">
            <div className="fake-clock-time">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="fake-battery-indicator">
              <span className="fake-battery-level"></span> 84%
            </div>
            <div className="stealth-hint-text">
              <Lock size={12} /> Double-tap screen to disarm view
            </div>
          </div>
        </div>
      )}

      {/* Main Evidence Recorder Card */}
      <div className="audio-recorder-card">
        <div className="recorder-header">
          <div className="recorder-title-wrap">
            <div className={`recorder-icon-badge ${isRecording ? 'badge-recording' : ''}`}>
              <Mic size={24} />
            </div>
            <div>
              <h3 className="recorder-title">1-Tap Stealth Audio Evidence Recorder</h3>
              <p className="recorder-sub">
                Capture encrypted audio evidence discreetly in hostile or uncomfortable encounters without alerting others.
              </p>
            </div>
          </div>

          {/* Live Recording Status Badge */}
          {isRecording && (
            <div className="recording-live-pill">
              <span className="rec-red-dot"></span>
              <span>REC <strong>{formatTime(duration)}</strong></span>
            </div>
          )}
        </div>

        {/* Live Visual Waveform Visualizer */}
        <div className={`waveform-visualizer-container ${isRecording ? 'visualizer-active' : ''}`}>
          <div className="waveform-bars-wrapper">
            {waveformData.map((val, index) => {
              // Scale value to height (min 6px, max 54px)
              const height = isRecording ? Math.min(Math.max((val / 255) * 58, 6), 56) : 8;
              return (
                <div 
                  key={index} 
                  className="waveform-bar"
                  style={{ 
                    height: `${height}px`,
                    backgroundColor: isRecording ? (height > 35 ? '#ef4444' : '#6366f1') : 'var(--border-color)'
                  }}
                />
              );
            })}
          </div>
          <div className="waveform-info-bar">
            <span>
              {isRecording ? "🔴 Capturing Ambient Audio..." : "Microphone Idle • Ready to Record"}
            </span>
            <span className="waveform-codec-tag">Web Media API • Opus / WebM</span>
          </div>
        </div>

        {/* Action Controls Row */}
        <div className="recorder-controls-row">
          {!isRecording ? (
            <button 
              type="button" 
              className="btn-danger start-record-btn"
              onClick={handleStartRecording}
              disabled={isSaving}
            >
              <Mic size={20} />
              <span>Start Stealth Recording</span>
            </button>
          ) : (
            <div className="recording-actions-group">
              {/* Stealth Mode Button */}
              <button 
                type="button" 
                className="btn-stealth-mode"
                onClick={() => setIsStealthMode(true)}
                title="Disguises screen with a black clock view so no one sees recording"
              >
                <EyeOff size={18} />
                <span>Disguise Screen (Stealth Mode)</span>
              </button>

              {/* Stop & Save Button */}
              <button 
                type="button" 
                className="btn-primary stop-record-btn"
                onClick={handleStopRecording}
                disabled={isSaving}
              >
                <Square size={18} />
                <span>Stop & Save to Vault ({formatTime(duration)})</span>
              </button>
            </div>
          )}
        </div>

        {/* Tactical Pro-Tip Banner */}
        <div className="recorder-pro-tip">
          <ShieldAlert size={16} />
          <span>
            <strong>Legal & Safety Note:</strong> Audio is captured securely and stored strictly in your browser's local sandbox memory (IndexedDB). It is never sent to third-party cloud servers without your explicit command.
          </span>
        </div>
      </div>
    </>
  );
}

export default AudioEvidenceRecorder;
