import React from 'react';
import { PhoneCall, ShieldCheck, ArrowLeft, AlertCircle, Compass, Lock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import FakeCallTrigger from '../components/FakeCallTrigger';
import { useLanguage } from '../utils/useLanguage';

/**
 * FakeCall Page Component
 * Dedicated safety tool page providing the Fake Incoming Call Simulator.
 * Helps users de-escalate uncomfortable or threatening situations without raising suspicion.
 */
function FakeCall() {
  const { t } = useLanguage();

  return (
    <div className="fake-call-page">
      {/* Header Banner */}
      <div className="tips-header text-center">
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Link to="/services" className="back-link-btn" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={16} /> Back to Services
            </Link>
          </div>
          <h1 className="section-title">Fake Call Escape Simulator</h1>
          <p className="section-subtitle">
            Trigger a realistic incoming phone call with ringtone audio and spoken dialogue to create a natural, safe exit.
          </p>
        </div>
      </div>

      <div className="container page-section" style={{ paddingTop: '10px' }}>
        {/* Main Fake Call Trigger Control Panel */}
        <FakeCallTrigger />

        {/* Tactical Situational Guide Cards */}
        <div className="call-use-cases-grid" style={{ marginTop: '30px' }}>
          <div className="use-case-card">
            <div className="use-case-icon bg-blue">
              <Compass size={22} />
            </div>
            <h4>Solo Cab or Auto Commute</h4>
            <p>
              Schedule a 30s call when boarding. When the phone rings, answer and say <em>"Yes Dad, I've boarded, sharing live location with you now."</em> The driver knows someone is tracking your trip.
            </p>
          </div>

          <div className="use-case-card">
            <div className="use-case-icon bg-purple">
              <Lock size={22} />
            </div>
            <h4>Uncomfortable Encounter</h4>
            <p>
              Stuck in an unwanted or pushy conversation? Trigger an instant call from <em>"Mom"</em> or <em>"Inspector Sharma"</em> to excuse yourself immediately with zero confrontation.
            </p>
          </div>

          <div className="use-case-card">
            <div className="use-case-icon bg-amber">
              <Zap size={22} />
            </div>
            <h4>Secluded Walkways at Night</h4>
            <p>
              Keep the simulator active in your hand. An active phone conversation signals vigilance to potential offenders and reduces vulnerability.
            </p>
          </div>
        </div>

        {/* Technical Competency Box */}
        <div className="services-awareness-card" style={{ marginTop: '36px' }}>
          <div className="services-awareness-header">
            <div className="services-awareness-icon-box">
              <ShieldCheck size={24} />
            </div>
            <h3 className="services-awareness-title">
              How the Simulator Works Under the Hood
            </h3>
          </div>
          <p className="services-awareness-text">
            This module leverages the <strong>HTML5 Web Audio API</strong> to generate true-to-frequency telecom dual-tones (440Hz + 480Hz) without downloading external audio files. When answered, the browser's <strong>Web Speech API (`SpeechSynthesis`)</strong> speaks tailored emergency responses. Everything executes client-side and functions reliably even in dead network zones.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FakeCall;
