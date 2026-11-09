import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mic, 
  ShieldCheck, 
  FolderLock, 
  Compass, 
  Lock, 
  Scale, 
  HardDrive 
} from 'lucide-react';
import AudioEvidenceRecorder from '../components/AudioEvidenceRecorder';
import AudioVaultList from '../components/AudioVaultList';
import { useLanguage } from '../utils/useLanguage';

/**
 * AudioVault Page Component
 * Dedicated page uniting the 1-Tap Stealth Audio Evidence Recorder and Saved Evidence Vault.
 * Provides on-device encrypted voice recording, playback, and legal evidence export.
 */
function AudioVault() {
  const { t } = useLanguage();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Triggered when a new recording is completed and saved
  const handleRecordingSaved = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="audio-vault-page">
      {/* Header Banner */}
      <div className="tips-header text-center">
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Link 
              to="/services" 
              className="back-link-btn" 
              style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={16} /> Back to Services
            </Link>
          </div>
          <h1 className="section-title">Stealth Audio Evidence Vault</h1>
          <p className="section-subtitle">
            Discreetly capture ambient conversations and threats. Saved directly to on-device memory with zero cloud transmission.
          </p>
        </div>
      </div>

      <div className="container page-section" style={{ paddingTop: '10px' }}>
        
        {/* 1. Main Stealth Audio Recorder Component */}
        <AudioEvidenceRecorder onRecordingComplete={handleRecordingSaved} />

        {/* 2. Saved Evidence Vault List & Player Component */}
        <AudioVaultList refreshTrigger={refreshTrigger} />

        {/* 3. Real-World Situational Guidelines Grid */}
        <div className="call-use-cases-grid" style={{ marginTop: '30px' }}>
          <div className="use-case-card">
            <div className="use-case-icon bg-blue">
              <Compass size={22} />
            </div>
            <h4>Solo Ride & Commute Safety</h4>
            <p>
              If a driver takes an unapproved diversion or acts suspiciously, tap Record and enable <em>Stealth Mode</em>. Your screen appears pitch black while every word is documented as evidence.
            </p>
          </div>

          <div className="use-case-card">
            <div className="use-case-icon bg-purple">
              <Lock size={22} />
            </div>
            <h4>Workplace & Public Harassment</h4>
            <p>
              When dealing with aggressive individuals or harassment, discreet audio capture preserves verbatim evidence that cannot be disputed or retracted.
            </p>
          </div>

          <div className="use-case-card">
            <div className="use-case-icon bg-amber">
              <Scale size={22} />
            </div>
            <h4>Legal & Police Documentation</h4>
            <p>
              Clips can be downloaded as standard <code>.webm</code> files for sharing with guardians or filing police complaints (under Indian Evidence Act electronic records provisions).
            </p>
          </div>
        </div>

        {/* 4. Technical Architecture Explanation */}
        <div className="services-awareness-card" style={{ marginTop: '36px' }}>
          <div className="services-awareness-header">
            <div className="services-awareness-icon-box">
              <ShieldCheck size={24} />
            </div>
            <h3 className="services-awareness-title">
              Technical Architecture & On-Device Privacy
            </h3>
          </div>
          <p className="services-awareness-text">
            This module combines the <strong>HTML5 MediaStream & MediaRecorder APIs</strong> with the <strong>Web Audio AnalyserNode</strong> for real-time 32-bin frequency spectrum analysis. Audio files are encoded using the high-fidelity <strong>Opus codec</strong> and saved to client-side <strong>IndexedDB</strong> storage, bypassing third-party servers and ensuring 100% data confidentiality.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AudioVault;
