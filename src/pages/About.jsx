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
  Cpu,
  Navigation,
  Activity,
  BellRing,
  Globe2,
  ShieldAlert
} from 'lucide-react';
import watchoverLogo from '../assets/watchover_logo_edited.jpg';

/**
 * About Page Component
 * Publicly accessible page showcasing WatchOver's mission, impact stats,
 * core safety services preview, complete tech stack, and full CE1, CE2 & Final Evaluation (Lectures 1-90) syllabus mapping.
 * 
 * @param {Object} props
 * @param {boolean} props.isAuthenticated - Current user login status
 */
function About({ isAuthenticated }) {
  // Complete tech stack list covering full course curriculum (Lectures 1-90)
  const techStack = [
    { name: "HTML5", desc: "Semantic & Accessible Elements (L1-12)", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS3", desc: "Design System, Flex/Grid & Keyframes (L1-24)", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "JavaScript ES6+", desc: "Async/Await, Promises & Modules (L25-36)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "ReactJS 18", desc: "Component Architecture & Hooks (L49-72)", url: "https://react.dev" },
    { name: "React Router v6", desc: "SPA Multi-Page & Dynamic Routing (L73-78)", url: "https://reactrouter.com" },
    { name: "Redux Toolkit", desc: "Predictable Global State Architecture (L79-84)", url: "https://redux-toolkit.js.org" },
    { name: "Context API", desc: "Global Theme, Auth & Toast Providers (L79-84)", url: "https://react.dev/reference/react/useContext" },
    { name: "HTML5 Geolocation", desc: "Hardware Satellite GPS & WatchPosition (L25-36)", url: "https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API" },
    { name: "Web Audio API", desc: "Oscillator Emergency Distress Siren (L25-36)", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" },
    { name: "Async REST Service", desc: "Mock REST CRUD API & LocalStorage Engine (L85-90)", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" },
    { name: "Vite", desc: "Next-Gen Frontend Bundler & HMR", url: "https://vitejs.dev" },
    { name: "i18n Multilingual", desc: "English, Hindi, Punjabi & Kannada Engine", url: "https://react.dev" }
  ];

  // Quick stats highlights
  const stats = [
    { number: "8+", label: "Actionable Safety Tips", icon: <Sparkles size={20} /> },
    { number: "4", label: "Core Safety Services", icon: <Compass size={20} /> },
    { number: "4", label: "Regional Languages (EN, HI, PA, KN)", icon: <Globe2 size={20} /> },
    { number: "24/7", label: "Live GPS & Emergency SOS", icon: <ShieldCheck size={20} /> }
  ];

  // Comprehensive Syllabus Mapping (Lectures 1 to 90) across CE1, CE2, and Final Evaluation
  const syllabusEvaluations = [
    {
      evalId: "CE1",
      badge: "Lectures 1 – 48 • CE1 Scope",
      title: "Front-End Fundamentals & Component Hierarchy",
      icon: <Layers size={24} />,
      accentClass: "ce1-accent",
      description: "Covers core web architecture, modular component layout, responsive design systems, and client-side multi-page routing.",
      modules: [
        {
          heading: "HTML5 & Modern CSS3 System (L1-24)",
          detail: "Semantic layouts, responsive flexbox & CSS grid, CSS custom properties (--primary, --card-bg), and custom keyframe animations."
        },
        {
          heading: "JavaScript (ES6+) & DOM Manipulation (L25-36)",
          detail: "Functional programming patterns, array transformations (map, filter), modular imports, and localStorage persistence."
        },
        {
          heading: "React Component Hierarchy & State (L37-60)",
          detail: "Reusable ServiceCard and TipCard components, props passing, unidirectional data flow, and local UI state with useState & useEffect."
        },
        {
          heading: "React Router SPA Navigation (L73-78)",
          detail: "Multi-page client-side routing with BrowserRouter, NavLink active tracking, URL dynamic route parameters (/services/:serviceId), and ProtectedRoute guards."
        }
      ]
    },
    {
      evalId: "CE2",
      badge: "Lectures 49 – 84 • CE2 Scope",
      title: "State Architecture, Redux / Context & Form Handling",
      icon: <Cpu size={24} />,
      accentClass: "ce2-accent",
      description: "Covers enterprise state architecture, global contexts & Redux Toolkit, rigorous form validation strategies, and browser audio APIs.",
      modules: [
        {
          heading: "Global State with Redux Toolkit & Context API (L79-84)",
          detail: "Redux Toolkit store with safetyKitSlice (cart quantity, price computations), and Context API for authentication lifecycle and theme switching."
        },
        {
          heading: "Controlled Form Handling & Validation Strategies (L37-48)",
          detail: "Reusable FormField components, real-time regex validation (email, password, phone), touched state tracking, and defensive error messaging."
        },
        {
          heading: "Browser Audio Synthesis - Web Audio API (L25-36)",
          detail: "Zero-dependency dual-frequency audio oscillator simulating emergency SOS distress siren directly through native browser APIs."
        },
        {
          heading: "Emergency Contact & Dispatch Simulation (L61-72)",
          detail: "Automated emergency dispatch messaging, WhatsApp one-tap broadcast formatting, and national women helpline directory (112, 1091, 181)."
        }
      ]
    },
    {
      evalId: "CE3",
      badge: "Lectures 85 – 90 • Advanced & Final Scope",
      title: "Async REST APIs, CRUD Workflows, Live GPS & UI Patterns",
      icon: <Activity size={24} />,
      accentClass: "ce3-accent",
      description: "Covers full asynchronous REST API mock architecture, community incident CRUD workflows, real-time GPS hardware tracking, and advanced UI patterns.",
      modules: [
        {
          heading: "Async REST API & Full CRUD Workflows (L85-90)",
          detail: "incidentService mock REST API layer with simulated network latency (Promise delays), localStorage persistence (watchover_incidents), and full Create, Read, Verify, and Delete workflows."
        },
        {
          heading: "Live Satellite GPS Tracking & Geodesic Algorithms (L61-72, L85-90)",
          detail: "Custom useGeolocation hook using navigator.geolocation.watchPosition, street-level OpenStreetMap embed, and Haversine formula calculating distances to nearest Police Stations."
        },
        {
          heading: "Advanced UI Patterns - Toast Notifications & Modals (L85-90)",
          detail: "Global ToastContext with auto-dismiss timers, animated countdown progress bars, interactive tabs UI filter pills, and controlled ReportIncidentModal."
        },
        {
          heading: "Multilingual Internationalization Engine (L61-72)",
          detail: "useLanguage custom hook supporting 4 regional languages (English, Hindi, Punjabi, and Kannada) with real-time UI synchronization."
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
            WatchOver is a comprehensive digital platform designed to provide practical safety guidelines, 
            commute awareness, emergency SOS alert simulation, live GPS tracking, and community incident reporting.
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
              and daily commuters. Developed as a progressive college project spanning Lectures 1 through 90, 
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
              in-depth academic demonstration of modern ReactJS architectures: from HTML5/CSS3 and multi-page routing 
              in CE1, Redux Toolkit and Context API in CE2, to Async REST CRUD workflows, Web APIs, and Live GPS in the final evaluation.
            </p>
          </div>
        </div>

        {/* 4. Complete Academic Syllabus Mapping (Lectures 1 to 90) */}
        <div className="about-section-box syllabus-section-box">
          <div className="section-box-header">
            <div className="feature-icon bg-purple">
              <GraduationCap size={24} />
            </div>
            <div>
              <span className="card-tag">Curriculum Alignment</span>
              <h3>Academic Syllabus Implementation (Lectures 1 – 90)</h3>
              <p>Every feature in WatchOver is mapped directly to our coursework competencies across all evaluation tiers:</p>
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

        {/* 5. Core Platform Capabilities */}
        <div className="why-section">
          <div className="text-center">
            <span className="hero-tag">Core Capabilities</span>
            <h2 className="section-title">Why Use WatchOver?</h2>
            <p className="section-subtitle">
              Designed with simplicity and practicality in mind to keep safety tips, live telemetry, and emergency tools at your fingertips.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon"><Navigation size={24} /></div>
              <h4>Live GPS Radar</h4>
              <p>Continuous satellite tracking with OpenStreetMap view, telemetry coordinates, and guardian WhatsApp sharing.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><ShieldAlert size={24} /></div>
              <h4>Nearest Police Dispatch</h4>
              <p>Haversine geodesic formula dynamically computing distance to nearest police station with 1-tap direct calling.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><BellRing size={24} /></div>
              <h4>Incident Vigilance Feed</h4>
              <p>Crowdsourced community hazard reporting for poor street lighting, harassment hotspots, and secluded paths.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><Volume2 size={24} /></div>
              <h4>Emergency SOS Siren</h4>
              <p>High-pitch dual tone browser audio alarm synthesized using Web Audio API for signaling immediate distress.</p>
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
              <h3>Technologies Used (Complete Course Stack)</h3>
              <p>Built using clean, modern front-end web standards fulfilling the entire 90-lecture syllabus:</p>
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
            Log in or create a free account to explore full safety services, view live GPS tracking, 
            report community incidents, and trigger emergency alerts when needed.
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
