import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * ServiceCard Component
 * Reusable component for displaying safety categories and services.
 * Features:
 * 1. Demonstrates receiving props in React (id, title, description, icon).
 * 2. Connects to dynamic routing via React Router Link (/services/:serviceId).
 * 
 * @param {Object} props
 * @param {number|string} props.id - Unique ID of the service for dynamic route matching
 * @param {string} props.title - Title of the service
 * @param {string} props.description - Short summary of the service
 * @param {React.ReactNode} props.icon - Icon element for visual representation
 */
function ServiceCard({ id, title, description, icon }) {
  const serviceId = id || 1;
  return (
    <div className="service-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {icon && <div className="service-card-icon">{icon}</div>}
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-desc" style={{ flex: 1 }}>{description}</p>
      <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
        <Link 
          to={`/services/${serviceId}`} 
          className="btn-primary" 
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '9px 14px' }}
        >
          Explore Module <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
