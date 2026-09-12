import React from 'react';
import { Navigation, Users, Smartphone, ShieldAlert, CheckCircle } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

/**
 * Services Page Component
 * Demonstrates:
 * 1. Rendering list of services using Array.map()
 * 2. Component reusability with ServiceCard
 */
function Services() {
  // Array of services as requested
  const services = [
    {
      id: 1,
      title: "Travel Safety",
      description: "Useful information and awareness guidance for staying safe while travelling on public transport, cabs, and late-night journeys.",
      icon: <Navigation size={28} />
    },
    {
      id: 2,
      title: "Public Place Safety",
      description: "Basic awareness tips and environmental vigilance recommendations when navigating public spaces, markets, and gatherings.",
      icon: <Users size={28} />
    },
    {
      id: 3,
      title: "Online Safety",
      description: "Basic digital and online safety awareness tips for protecting personal information, passwords, and social media privacy.",
      icon: <Smartphone size={28} />
    },
    {
      id: 4,
      title: "Emergency Preparedness",
      description: "General information and practical advice about being prepared for unexpected situations and keeping emergency readiness.",
      icon: <ShieldAlert size={28} />
    }
  ];

  return (
    <div className="services-page">
      {/* Page Header */}
      <div className="tips-header text-center">
        <div className="container">
          <h1 className="section-title">WatchOver Services</h1>
          <p className="section-subtitle">
            Explore our safety awareness modules designed to keep you informed in every setting.
          </p>
        </div>
      </div>

      <div className="container page-section" style={{ paddingTop: 0 }}>
        <div className="categories-grid" style={{ marginBottom: '50px' }}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>

        {/* Informational Banner */}
        <div className="about-card" style={{ backgroundColor: 'var(--primary-light)', borderColor: 'var(--border-color)' }}>
          <h3 style={{ color: 'var(--primary)' }}>
            <CheckCircle size={22} />
            Why Awareness Matters
          </h3>
          <p>
            Safety awareness is the first line of defense. By understanding your surroundings, 
            maintaining digital security, and keeping emergency protocols ready, you significantly 
            reduce risks in everyday life.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
