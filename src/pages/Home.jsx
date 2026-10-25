import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Users, Smartphone, ShieldAlert, ArrowRight } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

/**
 * Home Page Component
 * Demonstrates:
 * 1. Hero banner layout
 * 2. Rendering arrays of data using reusable ServiceCard components
 */
function Home() {
  // Array of 4 Safety Categories
  const safetyCategories = [
    {
      id: 1,
      title: "Travel Safety",
      description: "Essential guidelines for commute awareness, public transit, and late-night travel safety.",
      icon: <Navigation size={28} />
    },
    {
      id: 2,
      title: "Public Place Safety",
      description: "Key recommendations for staying vigilant in crowded markets, streets, and events.",
      icon: <Users size={28} />
    },
    {
      id: 3,
      title: "Online Safety",
      description: "Best practices for protecting personal data, privacy, and online digital interactions.",
      icon: <Smartphone size={28} />
    },
    {
      id: 4,
      title: "Emergency Preparedness",
      description: "Actionable steps to prepare for emergency situations and quick response protocols.",
      icon: <ShieldAlert size={28} />
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section text-center">
        <div className="container hero-content">
          <span className="hero-tag">Safety Awareness Platform</span>
          
          <h1 className="hero-title">WatchOver</h1>
          <h2 className="hero-subtitle-text">Your Safety, Our Priority</h2>
          
          <p className="hero-description">
            WatchOver is a women's safety awareness platform dedicated to empowering 
            individuals with actionable information, preventive safety guidelines, and 
            practical daily awareness services.
          </p>

          <Link to="/services" className="btn-primary">
            Explore Services <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Safety Categories Section */}
      <section className="page-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Safety Categories</h2>
            <p className="section-subtitle">
              Comprehensive awareness services designed for everyday safety situations.
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
