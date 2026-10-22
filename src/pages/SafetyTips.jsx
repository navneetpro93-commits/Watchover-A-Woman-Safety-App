import React, { useState } from 'react';
import { Search, Bookmark, Sparkles } from 'lucide-react';
import SafetyCard from '../components/SafetyCard';

/**
 * SafetyTips Page Component
 * Demonstrates:
 * 1. Rendering arrays of objects using .map()
 * 2. Real-time filtering using .filter() based on search input state
 * 3. State management for saving and unsaving tips (Save Tip feature)
 * 4. Props passing to reusable SafetyCard component
 */
function SafetyTips() {
  // Array of 8 Safety Tips
  const initialTips = [
    {
      id: 1,
      title: "Stay Aware of Surroundings",
      description: "Avoid distractions such as keeping headphones on high volume or staring continuously at your phone when walking in unfamiliar or quiet areas."
    },
    {
      id: 2,
      title: "Keep Your Phone Charged",
      description: "Always ensure your mobile phone has sufficient battery charge and carry a portable power bank when going outside for extended periods."
    },
    {
      id: 3,
      title: "Share Trip Details",
      description: "When taking a cab or public transit late at night, share your live location or vehicle details with a trusted family member or friend."
    },
    {
      id: 4,
      title: "Trust Your Instincts",
      description: "If a location, person, or situation feels uncomfortable or unsafe, leave immediately and head toward a well-lit, populated public space."
    },
    {
      id: 5,
      title: "Secure Personal Data Online",
      description: "Avoid posting your real-time location or daily routine schedules publicly on social media platforms to maintain digital privacy."
    },
    {
      id: 6,
      title: "Keep Emergency Contacts Accessible",
      description: "Save emergency helpline numbers on speed dial and familiarize yourself with basic quick-access safety features on your smartphone."
    },
    {
      id: 7,
      title: "Plan Routes in Advance",
      description: "Before traveling to new locations, research safe commute options, well-lit pathways, and nearby public transit points beforehand."
    },
    {
      id: 8,
      title: "Stay Confident & Assertive",
      description: "Walk with a confident posture and maintain clear body language. Assertiveness often deters unwanted attention in public settings."
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');

  // State for saved tip IDs
  const [savedTipIds, setSavedTipIds] = useState([]);

  // Handler to toggle save/unsave state of a tip
  const toggleSaveTip = (tipId) => {
    if (savedTipIds.includes(tipId)) {
      setSavedTipIds(savedTipIds.filter(id => id !== tipId));
    } else {
      setSavedTipIds([...savedTipIds, tipId]);
    }
  };


  const filteredTips = initialTips.filter((tip) =>
    tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const savedTipsList = initialTips.filter((tip) => savedTipIds.includes(tip.id));

  return (
    <div className="safety-tips-page">
    
      <div className="tips-header text-center">
        <div className="container">
          <h1 className="section-title">Safety Tips & Guidelines</h1>
          <p className="section-subtitle">
            Search, explore, and save practical safety advice for daily situations.
          </p>

         
          <div className="search-box-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search safety tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="clear-search-btn" 
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Main Tips Section */}
        <div style={{ marginBottom: '50px' }}>
          <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '20px' }}>
            All Safety Tips ({filteredTips.length})
          </h2>

          {filteredTips.length > 0 ? (
            <div className="tips-grid">
              {filteredTips.map((tip) => (
                <SafetyCard
                  key={tip.id}
                  id={tip.id}
                  title={tip.title}
                  description={tip.description}
                  isSaved={savedTipIds.includes(tip.id)}
                  onToggleSave={toggleSaveTip}
                />
              ))}
            </div>
          ) : (
            <div className="no-results-card text-center">
              <p>No safety tips matching "{searchQuery}". Try searching for another term like "travel" or "phone".</p>
            </div>
          )}
        </div>

      
        <div className="saved-tips-section page-section" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Bookmark size={24} style={{ color: 'var(--primary)' }} />
            <h2 className="section-title" style={{ fontSize: '1.6rem', margin: 0 }}>
              My Saved Tips ({savedTipsList.length})
            </h2>
          </div>

          {savedTipsList.length > 0 ? (
            <div className="tips-grid">
              {savedTipsList.map((tip) => (
                <SafetyCard
                  key={`saved-${tip.id}`}
                  id={tip.id}
                  title={tip.title}
                  description={tip.description}
                  isSaved={true}
                  onToggleSave={toggleSaveTip}
                />
              ))}
            </div>
          ) : (
            <div className="empty-saved-card">
              <Sparkles size={24} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
              <p>No saved tips yet. Click <strong>"Save Tip"</strong> on any tip card above to save it here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SafetyTips;
