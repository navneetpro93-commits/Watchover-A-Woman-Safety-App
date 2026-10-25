import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Navigation, 
  Users, 
  Smartphone, 
  ShieldAlert, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

/**
 * ServiceDetail Component
 * Demonstrates React Router Dynamic Routing using useParams() hook.
 * Route path: /services/:serviceId
 */
function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  // Comprehensive service details mapped by dynamic route ID or slug
  const servicesMap = {
    '1': {
      title: "Travel & Commute Safety",
      category: "Transport & Navigation",
      icon: <Navigation size={32} />,
      badgeColor: "bg-blue",
      tagline: "Essential guidelines for staying safe during daily travel, late-night transit, and rideshares.",
      details: [
        "Share your live location with trusted emergency contacts before entering cabs or auto-rickshaws.",
        "Always verify driver details, license plate numbers, and vehicle model against ride-hailing apps.",
        "Sit directly behind the driver or near exits when using public buses or metro trains.",
        "Avoid using headphones on max volume so you remain alert to your surrounding environment.",
        "Keep your phone battery charged above 30% and save offline emergency speed-dial numbers."
      ],
      checklist: ["Live GPS active", "Battery > 30%", "Emergency contacts ready", "Cab plate verified"]
    },
    '2': {
      title: "Public Space Vigilance",
      category: "Environmental Awareness",
      icon: <Users size={32} />,
      badgeColor: "bg-rose",
      tagline: "Practical steps to stay safe in crowded markets, public gatherings, and unfamiliar areas.",
      details: [
        "Identify well-lit streets and high-activity zones when walking in commercial areas at night.",
        "Locate emergency exits, security booths, and staff counters upon entering large venues.",
        "Trust your instincts—if a situation or individual feels suspicious, move toward populated stores.",
        "Keep your hands free and personal belongings zipped in front-facing cross-body bags.",
        "Know the location of nearby police stations, hospitals, and safe public spots in your area."
      ],
      checklist: ["Stay in well-lit areas", "Locate safe exits", "Keep belongings secure", "Trust your intuition"]
    },
    '3': {
      title: "Digital Privacy & Cyber Safety",
      category: "Online Protection",
      icon: <Smartphone size={32} />,
      badgeColor: "bg-purple",
      tagline: "Protecting your online digital footprint, social media location tags, and personal data.",
      details: [
        "Never post real-time location check-ins on social media while you are still present at the venue.",
        "Enable Two-Factor Authentication (2FA) on all personal email accounts and social profiles.",
        "Regularly review app permissions to restrict camera, microphone, and background location access.",
        "Avoid using public unencrypted Wi-Fi networks without a virtual private network (VPN).",
        "Keep passwords strong (> 6 characters + 1 special symbol) and update them periodically."
      ],
      checklist: ["2FA Enabled", "Background GPS restricted", "No live geotagging", "Strong unique passwords"]
    },
    '4': {
      title: "Emergency Preparedness",
      category: "Crisis Readiness",
      icon: <ShieldAlert size={32} />,
      badgeColor: "bg-slate",
      tagline: "Building rapid emergency response habits and maintaining dedicated family contact networks.",
      details: [
        "Configure speed dial triggers for National Emergency Helpline (112) and Women Helpline (1091).",
        "Keep your primary Parent contact and Guardian contacts updated in your WatchOver Settings.",
        "Practice emergency quick-gesture shortcuts (e.g. triple pressing power button for SOS).",
        "Maintain a physical emergency medical card with blood group and allergy details in your wallet.",
        "Discuss a predetermined meeting point with family members in case of network outages."
      ],
      checklist: ["112 & 1091 on Speed Dial", "Parent details verified", "SOS shortcut setup", "Medical card carried"]
    }
  };

  // Extract matched service or fallback to service 1
  const service = servicesMap[serviceId] || servicesMap['1'];

  return (
    <div className="service-detail-page page-section">
      <div className="container">
        
        {/* Back Navigation Bar */}
        <div className="detail-top-bar" style={{ marginBottom: '24px' }}>
          <button 
            onClick={() => navigate('/services')} 
            className="btn-secondary-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}
          >
            <ArrowLeft size={18} /> Back to All Services
          </button>
        </div>

        {/* Hero Header Box */}
        <div className="about-feature-card service-detail-hero" style={{ padding: '36px', marginBottom: '32px' }}>
          <div className="feature-card-header" style={{ marginBottom: '16px' }}>
            <div className={`feature-icon ${service.badgeColor}`}>
              {service.icon}
            </div>
            <div>
              <span className="card-tag">Dynamic Route Parameter: /services/{serviceId}</span>
              <h1 style={{ fontSize: '1.8rem', marginTop: '4px' }}>{service.title}</h1>
            </div>
          </div>

          <p className="about-hero-desc" style={{ fontSize: '1.05rem', margin: 0, textAlign: 'left' }}>
            {service.tagline}
          </p>
        </div>

        {/* Dynamic Details Content Grid */}
        <div className="about-grid-two" style={{ gap: '24px', marginBottom: '40px' }}>
          
          {/* Key Guidelines List */}
          <div className="about-section-box" style={{ margin: 0 }}>
            <div className="section-box-header" style={{ marginBottom: '20px' }}>
              <div className="feature-icon bg-rose" style={{ width: '40px', height: '40px' }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem' }}>Core Safety Guidelines</h3>
                <p style={{ fontSize: '0.85rem' }}>Actionable steps for maximum awareness:</p>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {service.details.map((item, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>
                    <CheckCircle2 size={18} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Readiness Checklist */}
          <div className="about-section-box" style={{ margin: 0 }}>
            <div className="section-box-header" style={{ marginBottom: '20px' }}>
              <div className="feature-icon bg-blue" style={{ width: '40px', height: '40px' }}>
                <Sparkles size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem' }}>Readiness Checklist</h3>
                <p style={{ fontSize: '0.85rem' }}>Quick verification before heading out:</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.checklist.map((check, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: 'var(--bg-main)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.92rem',
                    fontWeight: '600',
                    color: 'var(--secondary)'
                  }}
                >
                  <span className="numeric-badge" style={{ padding: '2px 8px' }}>Step {index + 1}</span>
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        
        <div className="not-found-badge" style={{ width: '100%', justifyContent: 'center', margin: 0, padding: '12px' }}>
          <HelpCircle size={16} /> Demonstrating Dynamic Route Matching: <code>react-router-dom useParams()</code> extracted parameter <strong>{serviceId}</strong>
        </div>

      </div>
    </div>
  );
}

export default ServiceDetail;
