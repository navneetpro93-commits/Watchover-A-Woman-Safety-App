import React, { useState } from 'react';
import { 
  Phone, 
  Shield, 
  HeartHandshake, 
  Search, 
  Copy, 
  Check, 
  AlertCircle, 
  Filter, 
  Clock, 
  PhoneCall,
  Flame,
  Ambulance,
  LifeBuoy
} from 'lucide-react';

/**
 * EmergencyNumbers Component (CE1 & CE2 Syllabus)
 * Comprehensive directory of critical emergency contacts across:
 * 1. Women Safety & National Helplines
 * 2. Police & Rapid Emergency Services
 * 3. Verified NGOs & Crisis Support Foundations
 * 
 * Features:
 * - Category filter tabs
 * - Real-time keyword search
 * - 1-Click direct dialer (tel: links)
 * - Clipboard copy with instant visual feedback
 */
function EmergencyNumbers() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Complete directory of emergency contact services
  const emergencyContacts = [
    // 1. Women Safety & National Helplines
    {
      id: 'ws-1',
      name: 'Women Helpline (Domestic Abuse & Distress)',
      number: '1091',
      displayNumber: '1091',
      category: 'Women Safety',
      description: '24/7 emergency toll-free response for women facing harassment, violence, or distress across all states.',
      timing: '24/7 Toll-Free',
      badge: 'National Helpline'
    },
    {
      id: 'ws-2',
      name: 'National Commission for Women (NCW)',
      number: '7827170170',
      displayNumber: '7827170170',
      category: 'Women Safety',
      description: 'Dedicated 24/7 NCW crisis helpline for women facing domestic violence, dowry harassment, or exploitation.',
      timing: '24/7 Active',
      badge: 'Statutory Body'
    },
    {
      id: 'ws-3',
      name: 'Universal Women Helpline (Ministry of WCD)',
      number: '181',
      displayNumber: '181',
      category: 'Women Safety',
      description: 'Single national toll-free emergency number providing immediate police referral, medical aid, and counseling.',
      timing: '24/7 Toll-Free',
      badge: 'Government WCD'
    },
    {
      id: 'ws-4',
      name: 'National Cyber Crime Reporting Helpline',
      number: '1930',
      displayNumber: '1930',
      category: 'Women Safety',
      description: 'Reporting financial fraud, non-consensual image abuse, online stalking, morphing, and social media bullying.',
      timing: '24/7 Rapid Response',
      badge: 'Cyber Security'
    },
    {
      id: 'ws-5',
      name: 'Childline / Minor Girl Protection Service',
      number: '1098',
      displayNumber: '1098',
      category: 'Women Safety',
      description: 'National 24-hour emergency outreach phone service for children and minors in distress or needing protection.',
      timing: '24/7 Toll-Free',
      badge: 'Child Welfare'
    },

    // 2. Police & Rapid Emergency Services
    {
      id: 'pr-1',
      name: 'Unified National Emergency (ERSS)',
      number: '112',
      displayNumber: '112',
      category: 'Police & Rapid Emergency',
      description: 'All-in-one unified emergency response system coordinating Police, Fire, Ambulance, and Disaster teams.',
      timing: '24/7 All-in-One',
      badge: 'Unified Dispatch'
    },
    {
      id: 'pr-2',
      name: 'Police Control Room (PCR Direct)',
      number: '100',
      displayNumber: '100',
      category: 'Police & Rapid Emergency',
      description: 'Direct citizen line to local and state police control room for immediate PCR mobile patrol dispatch.',
      timing: '24/7 Toll-Free',
      badge: 'Law Enforcement'
    },
    {
      id: 'pr-3',
      name: 'Railway Protection Force (RPF) Women Safety',
      number: '139',
      displayNumber: '139',
      category: 'Police & Rapid Emergency',
      description: 'Transit security assistance, train coach panic response, and specialized women safety squads across railways.',
      timing: '24/7 Railways Help',
      badge: 'Transit Police'
    },
    {
      id: 'pr-4',
      name: 'National Ambulance Emergency Service',
      number: '108',
      displayNumber: '108',
      category: 'Police & Rapid Emergency',
      description: 'Critical emergency medical transport, hospital casualty coordination, and maternal ambulance dispatch.',
      timing: '24/7 Toll-Free',
      badge: 'Emergency Medical'
    },
    {
      id: 'pr-5',
      name: 'Fire Emergency & Disaster Rescue',
      number: '101',
      displayNumber: '101',
      category: 'Police & Rapid Emergency',
      description: 'Emergency municipal fire brigade, gas leak management, and structural collapse search & rescue services.',
      timing: '24/7 Toll-Free',
      badge: 'Fire & Rescue'
    },
    {
      id: 'pr-6',
      name: 'National Highway Road Incident Helpline',
      number: '1073',
      displayNumber: '1073',
      category: 'Police & Rapid Emergency',
      description: 'Emergency highway patrol, highway vehicle breakdown towing, and inter-state highway safety assistance.',
      timing: '24/7 Highway Patrol',
      badge: 'Highway Police'
    },

    // 3. NGOs & Crisis Support Foundations
    {
      id: 'ngo-1',
      name: 'Shakti Shalini (Crisis Intervention & Shelter)',
      number: '+919654462721',
      displayNumber: '+91-9654462721',
      category: 'NGOs & Support Foundations',
      description: 'Dedicated NGO providing emergency crisis intervention, shelter homes, psychological care, and legal counsel.',
      timing: '24/7 Crisis Line',
      badge: 'Shelter & Legal NGO'
    },
    {
      id: 'ngo-2',
      name: 'Snehalaya (Women & Children Crisis Center)',
      number: '18002330222',
      displayNumber: '1800-233-0222',
      category: 'NGOs & Support Foundations',
      description: 'Grassroots protection network offering shelter, rescue missions, and rehabilitation for women facing abuse.',
      timing: '24/7 Toll-Free',
      badge: 'Rehabilitation NGO'
    },
    {
      id: 'ngo-3',
      name: 'Majlis Legal Centre (Legal Aid for Women)',
      number: '+919920264543',
      displayNumber: '+91-9920264543',
      category: 'NGOs & Support Foundations',
      description: 'All-women team of advocates and social workers offering free legal counsel, court representation, and protection.',
      timing: 'Mon - Sat (10 AM - 6 PM)',
      badge: 'Pro Bono Legal'
    },
    {
      id: 'ngo-4',
      name: 'Saheli Women Resource Centre',
      number: '01124616485',
      displayNumber: '011-24616485',
      category: 'NGOs & Support Foundations',
      description: 'Autonomous feminist collective assisting women in distress through mediation, safe space referrals, and advice.',
      timing: 'Weekdays (10 AM - 5 PM)',
      badge: 'Women Resource'
    },
    {
      id: 'ngo-5',
      name: 'Vandrevala Foundation (Mental Health & Distress)',
      number: '+919999666555',
      displayNumber: '+91-9999666555',
      category: 'NGOs & Support Foundations',
      description: 'Round-the-clock free confidential crisis intervention and mental health trauma support via phone and chat.',
      timing: '24/7 Free Helpline',
      badge: 'Trauma & Counseling'
    },
    {
      id: 'ngo-6',
      name: 'KIRAN (National Mental Health Helpline)',
      number: '18005990019',
      displayNumber: '1800-599-0019',
      category: 'NGOs & Support Foundations',
      description: 'Official national mental health helpline operating in 13 regional languages for anxiety, panic, and distress.',
      timing: '24/7 Multi-Lingual',
      badge: 'Govt Mental Health'
    }
  ];

  // Categories list for filter tabs
  const categories = [
    'All',
    'Women Safety',
    'Police & Rapid Emergency',
    'NGOs & Support Foundations'
  ];

  // Copy number to clipboard handler
  const handleCopyNumber = (id, number) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(number);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }
  };

  // Filter contacts by category and search keyword
  const filteredContacts = emergencyContacts.filter((contact) => {
    const matchesCategory = selectedCategory === 'All' || contact.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = query === '' || 
      contact.name.toLowerCase().includes(query) ||
      contact.number.includes(query) ||
      contact.description.toLowerCase().includes(query) ||
      contact.badge.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="emergency-numbers-page">
      {/* 1. Header Banner */}
      <section className="emergency-hero-section">
        <div className="container">
          <div className="emergency-hero-badge">
            <LifeBuoy size={16} /> Verified Emergency Directory
          </div>
          <h1 className="emergency-hero-title">Emergency & Safety Helplines</h1>
          <p className="emergency-hero-subtitle">
            Instant 24/7 access to national women safety helplines, rapid police response, 
            medical aid, and verified NGO crisis support centers across India.
          </p>

          {/* Emergency Alert Advice Bar */}
          <div className="emergency-notice-banner">
            <AlertCircle size={20} className="notice-icon" />
            <div className="notice-text">
              <strong>Immediate Life Threat?</strong> Call <strong>112</strong> (National Unified Emergency) 
              or <strong>1091</strong> (Women Helpline) immediately for on-ground police dispatch.
            </div>
          </div>
        </div>
      </section>

      {/* 2. Controls Section: Search & Category Filters */}
      <section className="emergency-controls-section">
        <div className="container">
          <div className="emergency-controls-card">
            {/* Search Input Bar */}
            <div className="emergency-search-bar">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search helpline name, authority, or number (e.g. 1091, Police, Cyber, NGO)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="emergency-search-input"
                aria-label="Search Emergency Numbers"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  title="Clear search query"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="emergency-filter-tabs">
              <span className="filter-label">
                <Filter size={15} /> Filter Category:
              </span>
              <div className="filter-buttons-group">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`emergency-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Count Indicator */}
            <div className="emergency-results-count">
              Showing <strong>{filteredContacts.length}</strong> of {emergencyContacts.length} verified safety services
            </div>
          </div>
        </div>
      </section>

      {/* 3. Emergency Contacts Directory Grid */}
      <section className="emergency-directory-section">
        <div className="container">
          {filteredContacts.length === 0 ? (
            <div className="emergency-empty-state">
              <AlertCircle size={40} className="empty-state-icon" />
              <h3>No helplines matched "{searchQuery}"</h3>
              <p>Try searching with another keyword or reset the category filter.</p>
              <button 
                type="button" 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="btn-secondary-outline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="emergency-contacts-grid">
              {filteredContacts.map((contact) => (
                <article key={contact.id} className="emergency-card">
                  {/* Card Top Category & Badges */}
                  <div className="emergency-card-top">
                    <span className="contact-badge">{contact.badge}</span>
                    <span className="timing-badge">
                      <Clock size={13} /> {contact.timing}
                    </span>
                  </div>

                  {/* Contact Name & Description */}
                  <h3 className="contact-name">{contact.name}</h3>
                  <p className="contact-desc">{contact.description}</p>

                  {/* Primary Dial Number Highlight */}
                  <div className="contact-number-display">
                    <span className="number-label">Dial Number:</span>
                    <span className="number-digits">{contact.displayNumber}</span>
                  </div>

                  {/* Action Buttons: 1-Click Call & Copy */}
                  <div className="emergency-card-actions">
                    <a 
                      href={`tel:${contact.number}`}
                      className="call-action-btn"
                      title={`Call ${contact.name} directly`}
                    >
                      <PhoneCall size={16} />
                      <span>Call Now ({contact.displayNumber})</span>
                    </a>

                    <button 
                      type="button"
                      onClick={() => handleCopyNumber(contact.id, contact.number)}
                      className={`copy-action-btn ${copiedId === contact.id ? 'copied' : ''}`}
                      title="Copy helpline number to clipboard"
                    >
                      {copiedId === contact.id ? (
                        <>
                          <Check size={16} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Practical Guidelines for Calling Emergency Services */}
      <section className="emergency-guidelines-section">
        <div className="container">
          <div className="guidelines-card">
            <h2 className="guidelines-title">What to State When Calling Emergency Services</h2>
            <div className="guidelines-list">
              <div className="guideline-step">
                <span className="step-num">1</span>
                <div>
                  <h4>State Your Exact Location</h4>
                  <p>Give specific street names, nearby landmarks, metro pillars, or shop names first.</p>
                </div>
              </div>
              <div className="guideline-step">
                <span className="step-num">2</span>
                <div>
                  <h4>Describe the Threat or Situation</h4>
                  <p>State clearly what is occurring (stalking, physical assault, accident, medical emergency).</p>
                </div>
              </div>
              <div className="guideline-step">
                <span className="step-num">3</span>
                <div>
                  <h4>Keep Your Line Open</h4>
                  <p>Do not disconnect until the dispatcher confirms PCR unit or emergency team dispatch.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EmergencyNumbers;
