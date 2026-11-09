import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Users, Smartphone, ShieldAlert, CheckCircle, PhoneCall, ArrowRight, Mic } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { useLanguage } from '../utils/useLanguage';

/**
 * Services Page Component
 * Multilingual supported via useLanguage hook
 */
function Services() {
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      title: t.services.travelTitle,
      description: t.services.travelDesc,
      icon: <Navigation size={28} />
    },
    {
      id: 2,
      title: t.services.publicTitle,
      description: t.services.publicDesc,
      icon: <Users size={28} />
    },
    {
      id: 3,
      title: t.services.onlineTitle,
      description: t.services.onlineDesc,
      icon: <Smartphone size={28} />
    },
    {
      id: 4,
      title: t.services.emergencyTitle,
      description: t.services.emergencyDesc,
      icon: <ShieldAlert size={28} />
    }
  ];

  return (
    <div className="services-page">
      {/* Page Header */}
      <div className="tips-header text-center">
        <div className="container">
          <h1 className="section-title">{t.services.title}</h1>
          <p className="section-subtitle">
            {t.services.subtitle}
          </p>
        </div>
      </div>

      <div className="container page-section" style={{ paddingTop: 0 }}>
        <div className="categories-grid" style={{ marginBottom: '32px' }}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>

        {/* Quick-Action Escape Tool: Fake Call Simulator */}
        <div className="fake-call-banner-card">
          <div className="fake-call-banner-left">
            <div className="fake-call-banner-icon">
              <PhoneCall size={28} />
            </div>
            <div>
              <span className="card-tag">Escape & De-escalation Simulator</span>
              <h3 className="fake-call-banner-title">Need a Discretionary Exit? Fake Incoming Call</h3>
              <p className="fake-call-banner-desc">
                Simulate a realistic incoming phone call from "Dad", "Mom", or "Inspector Sharma" with native audio ringing and voice dialogue to exit uncomfortable situations safely.
              </p>
            </div>
          </div>
          <Link to="/fake-call" className="btn-primary fake-call-launch-btn">
            Launch Simulator <ArrowRight size={18} />
          </Link>
        </div>

        {/* Quick-Action Tool: Stealth Audio Evidence Recorder */}
        <div className="fake-call-banner-card audio-vault-banner-card">
          <div className="fake-call-banner-left">
            <div className="fake-call-banner-icon audio-vault-banner-icon">
              <Mic size={28} />
            </div>
            <div>
              <span className="card-tag">Legal & Evidence Recording</span>
              <h3 className="fake-call-banner-title">1-Tap Stealth Audio Evidence Vault</h3>
              <p className="fake-call-banner-desc">
                Discreetly record ambient audio evidence with live waveform visualizer and blacked-out stealth mode. Saved locally with instant playback and .webm export.
              </p>
            </div>
          </div>
          <Link to="/audio-vault" className="btn-primary fake-call-launch-btn">
            Open Audio Vault <ArrowRight size={18} />
          </Link>
        </div>

        {/* Why Awareness Matters Informational Card */}
        <div className="services-awareness-card">
          <div className="services-awareness-header">
            <div className="services-awareness-icon-box">
              <CheckCircle size={24} />
            </div>
            <h2 className="services-awareness-title">
              {t.services.whyMattersTitle}
            </h2>
          </div>
          <p className="services-awareness-text">
            {t.services.whyMattersText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
