import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Info, 
  Target, 
  Code, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles,
  Lock,
  Compass,
  Zap,
  ExternalLink,
  GraduationCap,
  Layers,
  CheckCircle2,
  FileText,
  Volume2,
  Cpu
} from 'lucide-react';
import watchoverLogo from '../assets/watchover_logo_edited.jpg';

/**
 * About Page Component
 * Publicly accessible page showcasing WatchOver's mission, impact stats,
 * core safety services preview, tech stack, and full CE1 & CE2 academic syllabus coverage.
 * 
 * @param {Object} props
 * @param {boolean} props.isAuthenticated - Current user login status
 */
function About({ isAuthenticated }) {
  // Tech stack list with official documentation URLs covering CE1 and CE2 tools
  const techStack = [
    { name: "HTML5", desc: "Semantic & Accessible Elements", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS3", desc: "Custom System & Keyframes", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "JavaScript", desc: "ES6+ Logic & Web APIs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "ReactJS 18", desc: "Component Architecture", url: "https://react.dev" },
    { name: "React Router", desc: "SPA Multi-Page Routing", url: "https://reactrouter.com" },
    { name: "Redux & Context", desc: "Global State Architecture", url: "https://redux-toolkit.js.org" },
    { name: "Web Audio API", desc: "Oscillator Distress Siren", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" },
    { name: "Vite", desc: "Next-Gen Frontend Bundler", url: "https://vitejs.dev" }
  ];

  // Quick stats highlights
  const stats = [
    { number: "8+", label: "Actionable Safety Tips", icon: <Sparkles size={20} /> },
    { number: "4", label: "Core Safety Services", icon: <Compass size={20} /> },
    { number: "100%", label: "Free & Open Access", icon: <HeartHandshake size={20} /> },
    { number: "24/7", label: "Awareness & SOS System", icon: <ShieldCheck size={20} /> }
  ];

  // Continuous Evaluation (CE1 & CE2) Syllabus Mapping
  const syllabusEvaluations = [
    {
      evalId: "CE1",
      badge: "Continuous Evaluation 1",
      title: "Front-End Fundamentals & SPA Architecture",
      icon: <Layers size={24} />,
      accentClass: "ce1-accent",
      description: "Covers core web architecture, modular component layout, responsive styling, and client-side multi-page routing.",
      modules: [
        {
          heading: "HTML5 & Modern CSS3 System",
          detail: "Semantic layouts, responsive flexbox & CSS grid, CSS custom properties (--primary, --card-bg), and custom keyframe animations."
        },
        {
          heading: "JavaScript (ES6+) & DOM Manipulation",
          detail: "Functional programming patterns, array transformations (map, filter), modular imports, and localStorage persistence."
        },
        {
          heading: "React Component Hierarchy",
          detail: "Reusable ServiceCard and TipCard components, props passing, unidirectional data flow, and local UI state with useState."
        },
        {
          heading: "React Router SPA Navigation",
          detail: "Multi-page client-side routing with BrowserRouter, NavLink active tracking, URL route parameters, and ProtectedRoute guards."
        }
      ]
    },
    {
      evalId: "CE2",
      badge: "Continuous Evaluation 2",
      title: "State Architecture, Redux / Context & Form Handling",
      icon: <Cpu size={24} />,
      accentClass: "ce2-accent",
      description: "Covers enterprise state architecture, global contexts & Redux, rigorous form validation strategies, and browser audio APIs.",
      modules: [
        {
          heading: "Global State with Redux Toolkit & Context API",
          detail: "Redux Toolkit store with safetyKitSlice (cart quantity, price computations), and Context API for authentication lifecycle and theme."
        },
        {
          heading: "Form Handling & Validation Strategies",
          detail: "Reusable FormField components, real-time regex validation (email, password, phone), touched state tracking, and defensive error messaging."
        },
        {
          heading: "Browser Audio Synthesis (Web Audio API)",
          detail: "Zero-dependency dual-frequency audio oscillator simulating emergency SOS distress siren directly through native browser APIs."
        },
        {
          heading: "Emergency Contact & Dispatch Simulation",
          detail: "Automated emergency dispatch messaging, WhatsApp one-tap broadcast formatting, and national women helpline directory."
        }
      ]
    }
  ];

  return (
    <div className="about-page">
      {/* 1. Hero Banner */}
      <section className="about-hero-section">
        <div className="container text-center">
          {/* WatchOver Logo */}
          <div className="hero-brand-logo-wrapper">
            <img 
              src={watchoverLogo} 
              alt="WatchOver Logo" 
              className="hero-brand-logo" 
              onError={(e) => { e.currentTarget.src = '/watchover_logo_edited.jpg'; }}
            />
          </div>

          <div className="hero-badge">
            <Shield size={16} /> Women's Safety Awareness Platform
          </div>

          <h1 className="about-hero-title">
            Empowering Safety Through <span className="highlight-text">Awareness & Technology</span>
          </h1>

          <p className="about-hero-desc">
            WatchOver is a modern digital platform designed to provide practical safety guidelines, 
            commute awareness, emergency SOS alert simulation, and personal contact dispatch.
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
              and daily commuters. Developed as a progressive college project spanning CE1 and CE2, 
              it combines clean design with practical guidelines to foster confidence in daily travel, 
              public spaces, and emergency readiness.
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
              The primary goal is to make essential safety tips easily accessible while serving as an 
              in-depth academic demonstration of modern ReactJS architectures: from multi-page routing 
              in CE1 to Redux / Context API state architecture and robust form validation in CE2.
            </p>
          </div>
        </div>

        {/* 4. Academic Syllabus & Continuous Evaluation Mapping (CE1 & CE2) */}
        <div className="about-section-box syllabus-section-box">
          <div className="section-box-header">
            <div className="feature-icon bg-purple">
              <GraduationCap size={24} />
            </div>
            <div>
              <span className="card-tag">Curriculum Alignment</span>
              <h3>Academic Syllabus Implementation (CE1 & CE2)</h3>
              <p>Every feature in WatchOver is mapped directly to our college coursework competencies:</p>
            </div>
          </div>

          <div className="syllabus-grid">
            {syllabusEvaluations.map((item) => (
              <div key={item.evalId} className={`syllabus-card ${item.accentClass}`}>
                <div className="syllabus-card-header">
                  <div className="syllabus-icon-badge">{item.icon}</div>
                  <div>
                    <span className="syllabus-badge">{item.badge}</span>
                    <h4 className="syllabus-title">{item.title}</h4>
                  </div>
                </div>
                <p className="syllabus-desc">{item.description}</p>

                <div className="syllabus-modules-list">
                  {item.modules.map((mod, idx) => (
                    <div key={idx} className="syllabus-module-item">
                      <div className="module-bullet">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="module-text">
                        <strong>{mod.heading}:</strong> <span>{mod.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Why Join WatchOver Section */}
        <div className="why-section">
          <div className="text-center">
            <span className="hero-tag">Core Capabilities</span>
            <h2 className="section-title">Why Use WatchOver?</h2>
            <p className="section-subtitle">
              Designed with simplicity and practicality in mind to keep safety tips and emergency tools at your fingertips.
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
              <div className="why-icon"><Volume2 size={24} /></div>
              <h4>SOS Siren Simulation</h4>
              <p>High-pitch dual tone browser audio alarm for disorienting attackers and signaling distress.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><Sparkles size={24} /></div>
              <h4>Emergency SafetyKit</h4>
              <p>Personal emergency tool bag powered by Redux Toolkit state with item checkout simulation.</p>
            </div>
          </div>
        </div>

        {/* 6. Technologies Used */}
        <div className="about-section-box">
          <div className="section-box-header">
            <div className="feature-icon bg-blue">
              <Code size={24} />
            </div>
            <div>
              <h3>Technologies Used (CE1 & CE2 Stack)</h3>
              <p>Built using clean, modern front-end web standards with zero bloated external UI dependencies:</p>
            </div>
          </div>

          <div className="tech-cards-grid">
            {techStack.map((tech, index) => (
              <a 
                key={index} 
                href={tech.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="tech-badge-card"
                title={`Click to visit official ${tech.name} documentation website`}
              >
                <div className="tech-name">
                  <span>{tech.name}</span>
                  <ExternalLink size={14} className="tech-link-icon" />
                </div>
                <div className="tech-desc">{tech.desc}</div>
              </a>
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
            and trigger emergency alerts when needed.
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

export default About;
