import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function ServiceCard({ id, title, description, icon }) {
  const serviceId = id || 1;
  return (
    <div className="service-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {icon && <div className="service-card-icon">{icon}</div>}
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-desc" style={{ flex: 1 }}>{description}</p>
      <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
        <Link 
          to={`/services/${serviceId}`} 
          className="btn-primary" 
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '8px 14px' }}
        >
          Explore Module <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;

