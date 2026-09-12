import React from 'react';

/**
 * ServiceCard Component
 * Reusable component for displaying safety categories and services.
 * Demonstrates receiving props in React.
 * 
 * @param {Object} props
 * @param {string} props.title - Title of the service
 * @param {string} props.description - Short summary of the service
 * @param {React.ReactNode} props.icon - Icon element for visual representation
 */
function ServiceCard({ title, description, icon }) {
  return (
    <div className="service-card">
      {icon && <div className="service-card-icon">{icon}</div>}
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-desc">{description}</p>
    </div>
  );
}

export default ServiceCard;
