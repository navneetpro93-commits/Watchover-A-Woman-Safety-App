import React, { useState } from 'react';
import { Search, Bookmark } from 'lucide-react';
import SafetyCard from '../components/SafetyCard';
import { useLanguage } from '../utils/useLanguage';

/**
 * SafetyTips Page Component
 * Multilingual supported via useLanguage hook
 */
function SafetyTips() {
  const { language, t } = useLanguage();

  const tipsData = {
    en: [
      { id: 1, title: "Stay Aware of Surroundings", description: "Avoid distractions such as keeping headphones on high volume or staring continuously at your phone when walking in unfamiliar or quiet areas." },
      { id: 2, title: "Keep Your Phone Charged", description: "Always ensure your mobile phone has sufficient battery charge and carry a portable power bank when going outside for extended periods." },
      { id: 3, title: "Share Trip Details", description: "When taking a cab or public transit late at night, share your live location or vehicle details with a trusted family member or friend." },
      { id: 4, title: "Trust Your Instincts", description: "If a location, person, or situation feels uncomfortable or unsafe, leave immediately and head toward a well-lit, populated public space." },
      { id: 5, title: "Secure Personal Data Online", description: "Avoid posting your real-time location or daily routine schedules publicly on social media platforms to maintain digital privacy." },
      { id: 6, title: "Keep Emergency Contacts Accessible", description: "Save emergency helpline numbers on speed dial and familiarize yourself with basic quick-access safety features on your smartphone." },
      { id: 7, title: "Plan Routes in Advance", description: "Before traveling to new locations, research safe commute options, well-lit pathways, and nearby public transit points beforehand." },
      { id: 8, title: "Stay Confident & Assertive", description: "Walk with a confident posture and maintain clear body language. Assertiveness often deters unwanted attention in public settings." }
    ],
    hi: [
      { id: 1, title: "आस-पास के माहौल के प्रति सजग रहें", description: "अनजान या शांत इलाकों में चलते समय हेडफ़ोन की तेज़ आवाज़ या लगातार फ़ोन देखने जैसे विकर्षणों से बचें।" },
      { id: 2, title: "अपना फोन हमेशा चार्ज रखें", description: "सुनिश्चित करें कि आपके मोबाइल फोन में पर्याप्त चार्ज है और लंबी यात्राओं में पोर्टेबल पावर बैंक साथ रखें।" },
      { id: 3, title: "यात्रा का विवरण साझा करें", description: "देर रात कैब या सार्वजनिक वाहन लेते समय किसी विश्वसनीय परिजन के साथ अपनी लाइव लोकेशन साझा करें।" },
      { id: 4, title: "अपनी अंतरात्मा पर भरोसा रखें", description: "यदि कोई स्थान या व्यक्ति असहज या असुरक्षित लगे, तो तुरंत वहां से हटकर भीड़भाड़ वाली जगह पर जाएं।" },
      { id: 5, title: "व्यक्तिगत डेटा ऑनलाइन सुरक्षित रखें", description: "डिजिटल गोपनीयता बनाए रखने के लिए सोशल मीडिया पर अपनी रीयल-टाइम लोकेशन सार्वजनिक रूप से पोस्ट न करें।" },
      { id: 6, title: "आपातकालीन संपर्क तुरंत सुलभ रखें", description: "आपातकालीन हेल्पलाइन नंबरों को स्पीड डायल पर रखें और स्मार्टफोन के सुरक्षा फीचर्स से परिचित हों।" },
      { id: 7, title: "रास्तों की पहले से योजना बनाएं", description: "नए स्थानों पर जाने से पहले सुरक्षित आवागमन विकल्पों, अच्छी रोशनी वाले रास्तों और पारगमन बिंदुओं की जांच करें।" },
      { id: 8, title: "आत्मविश्वासी और स्पष्ट रहें", description: "आत्मविश्वास के साथ चलें और स्पष्ट बॉडी लैंग्वेज रखें। दृढ़ता अक्सर अवांछित ध्यान को रोकती है।" }
    ],
    pa: [
      { id: 1, title: "ਆਪਣੇ ਆਲੇ-ਦੁਆਲੇ ਪ੍ਰਤੀ ਸੁਚੇਤ ਰਹੋ", description: "ਅਣਜਾਣ ਜਾਂ ਸ਼ਾਂਤ ਥਾਵਾਂ 'ਤੇ ਚੱਲਦੇ ਸਮੇਂ ਹੈੱਡਫ਼ੋਨ ਦੀ ਉੱਚੀ ਆਵਾਜ਼ ਜਾਂ ਫ਼ੋਨ 'ਤੇ ਲਗਾਤਾਰ ਧਿਆਨ ਦੇਣ ਤੋਂ ਬਚੋ।" },
      { id: 2, title: "ਆਪਣਾ ਫ਼ੋਨ ਚਾਰਜ ਰੱਖੋ", description: "ਹਮੇਸ਼ਾ ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਹਾਡੇ ਮੋਬਾਈਲ ਫ਼ੋਨ ਵਿੱਚ ਲੋੜੀਂਦੀ ਬੈਟਰੀ ਹੈ ਅਤੇ ਪਾਵਰ ਬੈਂਕ ਨਾਲ ਰੱਖੋ।" },
      { id: 3, title: "ਸਫ਼ਰ ਦੇ ਵੇਰਵੇ ਸਾਂਝੇ ਕਰੋ", description: "ਦੇਰ ਰਾਤ ਕੈਬ ਜਾਂ ਜਨਤਕ ਆਵਾਜਾਈ ਲੈਂਦੇ ਸਮੇਂ ਆਪਣੇ ਪਰਿਵਾਰ ਨਾਲ ਲਾਈਵ ਲੋਕੇਸ਼ਨ ਸਾਂਝੀ ਕਰੋ।" },
      { id: 4, title: "ਆਪਣੀ ਅੰਦਰੂਨੀ ਆਵਾਜ਼ 'ਤੇ ਭਰੋਸਾ ਕਰੋ", description: "ਜੇਕਰ ਕੋਈ ਥਾਂ ਜਾਂ ਵਿਅਕਤੀ ਅਸੁਰੱਖਿਅਤ ਜਾਪੇ, ਤਾਂ ਤੁਰੰਤ ਰੌਸ਼ਨੀ ਅਤੇ ਭੀੜ ਵਾਲੀ ਥਾਂ ਵੱਲ ਜਾਓ।" },
      { id: 5, title: "ਆਨਲਾਈਨ ਨਿੱਜੀ ਡੇਟਾ ਸੁਰੱਖਿਅਤ ਰੱਖੋ", description: "ਸੋਸ਼ਲ ਮੀਡੀਆ 'ਤੇ ਆਪਣੀ ਲਾਈਵ ਲੋਕੇਸ਼ਨ ਜਾਂ ਰੋਜ਼ਾਨਾ ਰੁਟੀਨ ਸਾਂਝੀ ਕਰਨ ਤੋਂ ਬਚੋ।" },
      { id: 6, title: "ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ ਤੁਰੰਤ ਉਪਲਬਧ ਰੱਖੋ", description: "ਐਮਰਜੈਂਸੀ ਨੰਬਰ ਸਪੀਡ ਡਾਇਲ 'ਤੇ ਰੱਖੋ ਅਤੇ ਫ਼ੋਨ ਦੇ ਸੁਰੱਖਿਆ ਫੀਚਰਾਂ ਦੀ ਵਰਤੋਂ ਸਿੱਖੋ।" },
      { id: 7, title: "ਪਹਿਲਾਂ ਤੋਂ ਰੂਟਾਂ ਦੀ ਯੋਜਨਾ ਬਣਾਓ", description: "ਨਵੀਆਂ ਥਾਵਾਂ 'ਤੇ ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਸੁਰੱਖਿਅਤ ਰਸਤਿਆਂ ਅਤੇ ਰੌਸ਼ਨੀ ਵਾਲੇ ਮਾਰਗਾਂ ਬਾਰੇ ਪਤਾ ਕਰੋ।" },
      { id: 8, title: "ਆਤਮਵਿਸ਼ਵਾਸ ਅਤੇ ਦ੍ਰਿੜ੍ਹ ਰਹੋ", description: "ਆਤਮਵਿਸ਼ਵਾਸ ਨਾਲ ਚੱਲੋ ਅਤੇ ਸਪਸ਼ਟ ਸਰੀਰਕ ਭਾਸ਼ਾ ਰੱਖੋ। ਦ੍ਰਿੜ੍ਹਤਾ ਅਣਚਾਹੇ ਧਿਆਨ ਨੂੰ ਰੋਕਦੀ ਹੈ।" }
    ]
  };

  const initialTips = tipsData[language] || tipsData.en;

  // State for search query
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

  // Filter tips based on search query
  const filteredTips = initialTips.filter((tip) =>
    tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get list of saved tip objects
  const savedTipsList = initialTips.filter((tip) => savedTipIds.includes(tip.id));

  return (
    <div className="safety-tips-page">
      {/* Header Banner */}
      <div className="tips-header text-center">
        <div className="container">
          <h1 className="section-title">{t.safetyTips.title}</h1>
          <p className="section-subtitle">
            {t.safetyTips.subtitle}
          </p>

          {/* Search Box */}
          <div className="search-box-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder={t.safetyTips.searchPlaceholder}
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
            {t.safetyTips.allTips} ({filteredTips.length})
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
              <p>{t.safetyTips.noTips}</p>
            </div>
          )}
        </div>

        {/* My Saved Tips Section */}
        <div className="saved-tips-section page-section" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Bookmark size={24} style={{ color: 'var(--primary)' }} />
            <h2 className="section-title" style={{ fontSize: '1.6rem', margin: 0 }}>
              {t.safetyTips.savedTips} ({savedTipsList.length})
            </h2>
          </div>

          {savedTipsList.length > 0 ? (
            <div className="tips-grid">
              {savedTipsList.map((tip) => (
                <SafetyCard
                  key={tip.id}
                  id={tip.id}
                  title={tip.title}
                  description={tip.description}
                  isSaved={true}
                  onToggleSave={toggleSaveTip}
                />
              ))}
            </div>
          ) : (
            <div className="no-results-card text-center" style={{ padding: '30px' }}>
              <p>No saved tips yet. Click "Save Tip" on any card to bookmark it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SafetyTips;
