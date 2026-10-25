import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Info, 
  Target, 
  Code, 
  Rocket, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  HeartHandshake, 
  Sparkles,
  Lock,
  Compass,
  Zap
} from 'lucide-react';

/**
 * About Page Component
 * Publicly accessible page showcasing WatchOver's mission, impact stats,
 * core safety services preview, tech stack, and future roadmap.
 * 
 * @param {Object} props
 * @param {boolean} props.isAuthenticated - Current user login status
 */
function About({ isAuthenticated }) {
  // Tech stack list
  const techStack = [
    { name: "HTML5", desc: "Semantic Markup" },
    { name: "CSS3", desc: "Custom Design System" },
    { name: "JavaScript", desc: "ES6+ Logic" },
    { name: "ReactJS", desc: "V18 UI Framework" },
    { name: "Vite", desc: "Next-Gen Bundler" },
    { name: "React Router", desc: "SPA Navigation" }
  ];

  // Quick stats highlights
  const stats = [
    { number: "8+", label: "Actionable Safety Tips", icon: <Sparkles size={20} /> },
    { number: "4", label: "Core Safety Services", icon: <Compass size={20} /> },
    { number: "100%", label: "Free & Open Access", icon: <HeartHandshake size={20} /> },
    { number: "24/7", label: "Awareness Platform", icon: <ShieldCheck size={20} /> }
  ];

  // Future Scope Roadmap
  const futureRoadmap = [
    { term: "CE2 Scope", title: "Emergency Contacts & SOS", desc: "Quick-access helpline directory, SOS alert simulation, and offline local storage." },
    { term: "CE3 Scope", title: "Hooks & Component Composition", desc: "useEffect data fetching, custom hooks, dynamic routing, and lifting state up." },
    { term: "Final Term", title: "Live GPS & Maps Integration", desc: "Google Maps integration, live location sharing, backend API server, and database." }
  ];

  return (
    <div className="about-page">
      {/* 1. Hero Banner */}
      <section className="about-hero-section">
        <div className="container text-center">
          <div className="hero-badge">
            <Shield size={16} /> Women's Safety Awareness Platform
          </div>

          <h1 className="about-hero-title">
            Empowering Safety Through <span className="highlight-text">Awareness & Knowledge</span>
          </h1>

          <p className="about-hero-desc">
            WatchOver is a modern digital platform designed to provide practical safety guidelines, 
            commute awareness, and emergency preparedness tips for women everywhere.
          </p>

          {/* Call to Action buttons */}
          <div className="hero-cta-group">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn-primary hero-btn">
                  Log In to Access Platform <ArrowRight size={18} />
                </Link>
                <Link to="/signup" className="btn-secondary-outline hero-btn">
                  Create Free Account
                </Link>
              </>
            ) : (
              <Link to="/services" className="btn-primary hero-btn">
                Explore Services & Tips <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 2. Quick Impact Stats Bar */}
      <section className="stats-bar-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container page-section">
        {/* 3. Mission & Objective Grid */}
        <div className="about-grid-two">
          {/* Mission Card */}
          <div className="about-feature-card">
            <div className="feature-card-header">
              <div className="feature-icon bg-rose">
                <Info size={24} />
              </div>
              <div>
                <span className="card-tag">Our Vision</span>
                <h3>What is WatchOver?</h3>
              </div>
            </div>
            <p>
              WatchOver is an initiative focused on spreading safety awareness among women, students, 
              and daily commuters. Built as a foundational college project (CE1), it combines clean, 
              intuitive design with practical advice to foster confidence in daily travel, public spaces, 
              and digital environments.
            </p>
          </div>

          {/* Objective Card */}
          <div className="about-feature-card">
            <div className="feature-card-header">
              <div className="feature-icon bg-slate">
                <Target size={24} />
              </div>
              <div>
                <span className="card-tag">Our Mission</span>
                <h3>Project Objective</h3>
              </div>
            </div>
            <p>
              The primary goal is to make essential safety tips easily accessible while serving as a 
              structured learning foundation in ReactJS. WatchOver provides actionable steps for 
              situational awareness, privacy protection, and emergency preparedness.
            </p>
          </div>
        </div>

        {/* 4. Why Join WatchOver Section */}
        <div className="why-section">
          <div className="text-center">
            <span className="hero-tag">Core Features</span>
            <h2 className="section-title">Why Use WatchOver?</h2>
            <p className="section-subtitle">
              Designed with simplicity and practicality in mind to keep safety tips at your fingertips.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon"><Compass size={24} /></div>
              <h4>Commute Awareness</h4>
              <p>Practical tips for staying alert while traveling late at night or using public transit.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><Lock size={24} /></div>
              <h4>Digital Privacy</h4>
              <p>Guidelines to protect your location data, social media footprint, and online presence.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><Zap size={24} /></div>
              <h4>Instant Tip Search</h4>
              <p>Quickly search and filter safety guidelines by keywords whenever you need them.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><BookmarkCheckIcon size={24} /></div>
              <h4>Save Favorite Tips</h4>
              <p>Bookmark important safety tips for fast access in your personal dashboard.</p>
            </div>
          </div>
        </div>

        {/* 5. Technologies Used */}
        <div className="about-section-box">
          <div className="section-box-header">
            <div className="feature-icon bg-blue">
              <Code size={24} />
            </div>
            <div>
              <h3>Technologies Used (CE1 Stack)</h3>
              <p>Built using clean, modern front-end web standards:</p>
            </div>
          </div>

          <div className="tech-cards-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-badge-card">
                <div className="tech-name">{tech.name}</div>
                <div className="tech-desc">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Future Scope & Development Roadmap */}
        <div className="about-section-box roadmap-box">
          <div className="section-box-header">
            <div className="feature-icon bg-purple">
              <Rocket size={24} />
            </div>
            <div>
              <h3>Future Development Roadmap</h3>
              <p>WatchOver is architected to scale continuously across future academic terms:</p>
            </div>
          </div>

          <div className="roadmap-grid">
            {futureRoadmap.map((item, index) => (
              <div key={index} className="roadmap-card">
                <span className="roadmap-badge">{item.term}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Bottom CTA Banner */}
        <div className="bottom-cta-banner text-center">
          <div className="cta-icon-wrapper">
            <ShieldCheck size={36} />
          </div>
          <h2>Join the WatchOver Community Today</h2>
          <p>
            Log in or create a free account to explore full safety services, search guidelines, 
            and save essential tips to your personal profile.
          </p>

          {!isAuthenticated ? (
            <div className="cta-buttons">
              <Link to="/login" className="btn-primary">
                Log In Now <ArrowRight size={18} />
              </Link>
              <Link to="/signup" className="btn-secondary-outline white-btn">
                Create Account
              </Link>
            </div>
          ) : (
            <Link to="/home" className="btn-primary">
              Go to Home Dashboard <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper icon component
function BookmarkCheckIcon({ size }) {
  return <Sparkles size={size} />;
}

export default About;
