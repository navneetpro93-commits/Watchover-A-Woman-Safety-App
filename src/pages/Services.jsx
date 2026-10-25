import React from 'react';
import { Navigation, Users, Smartphone, ShieldAlert, CheckCircle } from 'lucide-react';
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
        <div className="categories-grid" style={{ marginBottom: '50px' }}>
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
