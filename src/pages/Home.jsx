import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Users, Smartphone, ShieldAlert, ArrowRight } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { useLanguage } from '../utils/useLanguage';
import watchoverLogo from '../assets/watchover_logo_edited.jpg';

/**
 * Home Page Component
 * Multilingual supported via useLanguage hook
 */
function Home() {
  const { t } = useLanguage();

  // Array of 4 Safety Categories with reactive translations
  const safetyCategories = [
    {
      id: 1,
      title: t.home.travelSafety,
      description: t.home.travelSafetyDesc,
      icon: <Navigation size={28} />
    },
    {
      id: 2,
      title: t.home.publicSafety,
      description: t.home.publicSafetyDesc,
      icon: <Users size={28} />
    },
    {
      id: 3,
      title: t.home.onlineSafety,
      description: t.home.onlineSafetyDesc,
      icon: <Smartphone size={28} />
    },
    {
      id: 4,
      title: t.home.emergencyPrep,
      description: t.home.emergencyPrepDesc,
      icon: <ShieldAlert size={28} />
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section text-center">
        <div className="container hero-content">
          <div className="hero-brand-logo-wrapper">
            <img 
              src={watchoverLogo} 
              alt="WatchOver Logo" 
              className="hero-brand-logo" 
              onError={(e) => { e.currentTarget.src = '/watchover_logo_edited.jpg'; }}
            />
          </div>

          <span className="hero-tag">{t.home.heroTag}</span>
          
          <h1 className="hero-title">{t.home.heroTitle}</h1>
          <h2 className="hero-subtitle-text">{t.home.heroSubtitle}</h2>
          
          <p className="hero-description">
            {t.home.heroDescription}
          </p>

          <Link to="/services" className="btn-primary">
            {t.home.exploreServices} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Safety Categories Section */}
      <section className="page-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">{t.home.categoriesTitle}</h2>
            <p className="section-subtitle">
              {t.home.categoriesSubtitle}
            </p>
          </div>

          <div className="categories-grid">
            {safetyCategories.map((category) => (
              <ServiceCard
                key={category.id}
                title={category.title}
                description={category.description}
                icon={category.icon}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
