import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  Sparkles,
  AlertTriangle,
  PackageCheck,
  Tag,
  Volume2,
  ShieldAlert,
  Zap,
  HeartPulse,
  BatteryCharging,
  Lock,
  CreditCard,
  Check,
  ChevronDown,
  ChevronUp,
  History,
  Clock,
  BookmarkPlus,
  X
} from 'lucide-react';
import {
  selectCatalog,
  selectKitItems,
  selectSavedKitsHistory,
  selectTotalQuantity,
  selectTotalCost,
  selectPackedCount,
  selectLanguage,
  addToKit,
  removeFromKit,
  incrementQuantity,
  decrementQuantity,
  togglePackedStatus,
  clearKit,
  saveCurrentKit,
  restoreSavedKit,
  deleteSavedKit
} from '../store/safetyKitSlice';

/**
 * UI Translations Dictionary
 * Supports English (en), Hindi (hi), and Punjabi (pa)
 */
const UI_TRANSLATIONS = {
  en: {
    heroBadge: "🛡️ 🎒 Verified Safety Essentials • 1-Click Emergency Kit Store ⚡ 🛒",
    titleMain: "Personal Safety Gear & ",
    titleHighlight: "Kit Builder",
    subtitle: "Equip yourself with essential personal defense and emergency gear. Add items to your kit, customize quantities, and stay prepared for safe daily commutes & solo travel! ✨",
    metricCatalog: "Catalog Items",
    metricInKit: "Items in Kit",
    metricEstimatedValue: "Estimated Value",
    metricReadiness: "Readiness Score",
    emergencyKitTitle: "My Emergency Safety Kit",
    itemsBadge: (count) => `${count} Items`,
    emptyKitSubtext: "Your kit is currently empty. Add essentials from the catalog below.",
    kitSummarySubtext: (packed, total, cost) => `${packed} of ${total} packed in travel bag • Total: ₹${cost}`,
    savedHistoryBtn: (count) => `Saved History (${count})`,
    readyBadge: (pct) => `${pct}% Ready`,
    hideKit: "Hide Kit",
    viewKit: "View Kit",
    emptyKitHeadline: "Your Emergency Kit is Currently Empty",
    emptyKitDesc: 'Browse the vetted safety products below and click "Add to Kit" to assemble your emergency gear.',
    checklistTitle: "Bag Packing Checklist:",
    checklistSubtitle: (packed, total) => `${packed} of ${total} items packed in bag`,
    markPacked: "Mark as packed in bag",
    markUnpacked: "Mark as unpacked",
    eachPrice: "each",
    totalLabel: "Total:",
    totalGear: "Total Gear:",
    estValue: "Estimated Kit Value:",
    clearKit: "Clear Kit",
    saveToHistory: "Save to History",
    confirmKit: "Confirm & Save Kit",
    catalogTitle: "Recommended Safety Gear (Catalog)",
    catalogSubtitle: "Select vetted personal defense and transit preparedness equipment to add to your kit above.",
    allCategory: "All",
    priorityLabel: (p) => `${p} Priority`,
    bestFor: "Best for:",
    addToKit: "Add to Kit",
    inKit: (qty) => `In Kit (${qty})`,
    historyModalTitle: "Emergency Safety Kits History",
    historyModalSubtitle: "View, restore, or manage your previously saved emergency kit configurations",
    noSavedKits: "No Saved Kits Found",
    noSavedKitsDesc: 'Assemble your emergency kit items and click "Save to History" or "Confirm & Save Kit" to create a saved snapshot.',
    restoreToActive: "Restore to Active Kit",
    delete: "Delete",
    savedConfigurations: (count) => `${count} saved configuration(s) recorded`,
    close: "Close",
    promptName: "Enter a label for this emergency kit:",
    alertEmptySave: "Add at least one safety item before saving to history!",
    alertSaved: (name) => `Saved "${name}" to history!`,
    alertLoaded: (name) => `Loaded "${name}" into your active Emergency Kit!`,
    alertRemoved: (name) => `Removed "${name}" from history.`,
    alertAdded: (name) => `Added "${name}" to your Emergency Kit at the top`
  },
  hi: {
    heroBadge: "🛡️ 🎒 सत्यापित सुरक्षा उपकरण • 1-क्लिक आपातकालीन किट स्टोर ⚡ 🛒",
    titleMain: "व्यक्तिगत सुरक्षा उपकरण एवं ",
    titleHighlight: "किट बिल्डर",
    subtitle: "आवश्यक व्यक्तिगत रक्षा और आपातकालीन उपकरणों से खुद को लैस करें। अपनी किट में सामान जोड़ें, मात्रा तय करें और सुरक्षित सफर के लिए तैयार रहें! ✨",
    metricCatalog: "कैटलॉग सामान",
    metricInKit: "किट में मौजूद",
    metricEstimatedValue: "अनुमानित मूल्य",
    metricReadiness: "तैयारी स्कोर",
    emergencyKitTitle: "मेरी आपातकालीन सुरक्षा किट",
    itemsBadge: (count) => `${count} सामान`,
    emptyKitSubtext: "आपकी किट अभी खाली है। नीचे कैटलॉग से जरूरी सामान जोड़ें।",
    kitSummarySubtext: (packed, total, cost) => `${packed}/${total} बैग में पैक • कुल: ₹${cost}`,
    savedHistoryBtn: (count) => `सहेजा गया इतिहास (${count})`,
    readyBadge: (pct) => `${pct}% तैयार`,
    hideKit: "किट छिपाएं",
    viewKit: "किट देखें",
    emptyKitHeadline: "आपकी आपातकालीन किट वर्तमान में खाली है",
    emptyKitDesc: 'नीचे दिए गए सुरक्षित उत्पादों को देखें और अपनी सुरक्षा किट तैयार करने के लिए "किट में जोड़ें" पर क्लिक करें।',
    checklistTitle: "बैग पैकिंग चेकलिस्ट:",
    checklistSubtitle: (packed, total) => `${packed}/${total} सामान बैग में पैक हैं`,
    markPacked: "बैग में पैक मार्क करें",
    markUnpacked: "अनपैक मार्क करें",
    eachPrice: "प्रति नग",
    totalLabel: "कुल:",
    totalGear: "कुल सामान:",
    estValue: "अनुमानित किट मूल्य:",
    clearKit: "किट खाली करें",
    saveToHistory: "इतिहास में सहेजें",
    confirmKit: "किट पुष्टि और सहेजें",
    catalogTitle: "अनुशंसित सुरक्षा उपकरण (कैटलॉग)",
    catalogSubtitle: "अपनी किट में जोड़ने के लिए प्रमाणित व्यक्तिगत सुरक्षा और यात्रा तैयारी उपकरण चुनें।",
    allCategory: "सभी",
    priorityLabel: (p) => {
      const map = { Critical: 'अति महत्वपूर्ण', High: 'उच्च', Medium: 'मध्यम' };
      return `${map[p] || p} प्राथमिकता`;
    },
    bestFor: "उपयुक्त:",
    addToKit: "किट में जोड़ें",
    inKit: (qty) => `किट में (${qty})`,
    historyModalTitle: "आपातकालीन सुरक्षा किट इतिहास",
    historyModalSubtitle: "अपने पहले से सहेजे गए आपातकालीन किट कॉन्फ़िगरेशन देखें, लोड करें या हटाएं",
    noSavedKits: "कोई सहेजी गई किट नहीं मिली",
    noSavedKitsDesc: 'सुरक्षा उपकरण जोड़ें और सहेजने के लिए "इतिहास में सहेजें" पर क्लिक करें।',
    restoreToActive: "सक्रिय किट में लोड करें",
    delete: "हटाएं",
    savedConfigurations: (count) => `${count} सहेजे गए किट रिकॉर्ड`,
    close: "बंद करें",
    promptName: "इस आपातकालीन किट के लिए एक नाम दर्ज करें:",
    alertEmptySave: "इतिहास में सहेजने से पहले कम से कम एक सामान जोड़ें!",
    alertSaved: (name) => `"${name}" को इतिहास में सहेज लिया गया!`,
    alertLoaded: (name) => `"${name}" को सक्रिय आपातकालीन किट में लोड किया गया!`,
    alertRemoved: (name) => `"${name}" को इतिहास से हटा दिया गया।`,
    alertAdded: (name) => `"${name}" को ऊपर आपातकालीन किट में जोड़ा गया`
  },
  pa: {
    heroBadge: "🛡️ 🎒 ਪ੍ਰਮਾਣਿਤ ਸੁਰੱਖਿਆ ਉਪਕਰਣ • 1-ਕਲਿੱਕ ਐਮਰਜੈਂਸੀ ਕਿੱਟ ਸਟੋਰ ⚡ 🛒",
    titleMain: "ਨਿੱਜੀ ਸੁਰੱਖਿਆ ਗੇਅਰ ਅਤੇ ",
    titleHighlight: "ਕਿੱਟ ਬਿਲਡਰ",
    subtitle: "ਜ਼ਰੂਰੀ ਨਿੱਜੀ ਸੁਰੱਖਿਆ ਅਤੇ ਐਮਰਜੈਂਸੀ ਗੇਅਰ ਨਾਲ ਤਿਆਰ ਰਹੋ। ਆਪਣੀ ਕਿੱਟ ਵਿੱਚ ਸਮਾਨ ਸ਼ਾਮਲ ਕਰੋ, ਮਾਤਰਾ ਚੁਣੋ ਅਤੇ ਸੁਰੱਖਿਅਤ ਰਹੋ! ✨",
    metricCatalog: "ਕੈਟਾਲਾਗ ਸਮੱਗਰੀ",
    metricInKit: "ਕਿੱਟ ਵਿੱਚ ਸਮਾਨ",
    metricEstimatedValue: "ਅੰਦਾਜ਼ਨ ਮੁੱਲ",
    metricReadiness: "ਤਿਆਰੀ ਸਕੋਰ",
    emergencyKitTitle: "ਮੇਰੀ ਐਮਰਜੈਂਸੀ ਸੁਰੱਖਿਆ ਕਿੱਟ",
    itemsBadge: (count) => `${count} ਸਮਾਨ`,
    emptyKitSubtext: "ਤੁਹਾਡੀ ਕਿੱਟ ਇਸ ਵੇਲੇ ਖਾਲੀ ਹੈ। ਹੇਠਾਂ ਦਿੱਤੀ ਸੂਚੀ ਵਿੱਚੋਂ ਸਮਾਨ ਸ਼ਾਮਲ ਕਰੋ।",
    kitSummarySubtext: (packed, total, cost) => `${packed}/${total} ਬੈਗ ਵਿੱਚ ਪੈਕ • ਕੁੱਲ: ₹${cost}`,
    savedHistoryBtn: (count) => `ਸੁਰੱਖਿਅਤ ਇਤਿਹਾਸ (${count})`,
    readyBadge: (pct) => `${pct}% ਤਿਆਰ`,
    hideKit: "ਕਿੱਟ ਛੁਪਾਓ",
    viewKit: "ਕਿੱਟ ਵੇਖੋ",
    emptyKitHeadline: "ਤੁਹਾਡੀ ਐਮਰਜੈਂਸੀ ਕਿੱਟ ਖਾਲੀ ਹੈ",
    emptyKitDesc: 'ਹੇਠਾਂ ਦਿੱਤੇ ਸੁਰੱਖਿਆ ਉਤਪਾਦਾਂ ਨੂੰ ਦੇਖੋ ਅਤੇ ਆਪਣੀ ਕਿੱਟ ਤਿਆਰ ਕਰਨ ਲਈ "ਕਿੱਟ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ" ਦਬਾਓ।',
    checklistTitle: "ਬੈਗ ਪੈਕਿੰਗ ਚੈੱਕਲਿਸਟ:",
    checklistSubtitle: (packed, total) => `${packed}/${total} ਸਮਾਨ ਬੈਗ ਵਿੱਚ ਪੈਕ ਕੀਤਾ ਗਿਆ ਹੈ`,
    markPacked: "ਬੈਗ ਵਿੱਚ ਪੈਕ ਵਜੋਂ ਚੁਣੋ",
    markUnpacked: "ਅਣਪੈਕ ਵਜੋਂ ਚੁਣੋ",
    eachPrice: "ਪ੍ਰਤੀ ਨਗ",
    totalLabel: "ਕੁੱਲ:",
    totalGear: "ਕੁੱਲ ਸਮਾਨ:",
    estValue: "ਅੰਦਾਜ਼ਨ ਕਿੱਟ ਮੁੱਲ:",
    clearKit: "ਕਿੱਟ ਖਾਲੀ ਕਰੋ",
    saveToHistory: "ਇਤਿਹਾਸ ਵਿੱਚ ਸੇਵ ਕਰੋ",
    confirmKit: "ਕਿੱਟ ਪੁਸ਼ਟੀ ਅਤੇ ਸੇਵ ਕਰੋ",
    catalogTitle: "ਸਿਫ਼ਾਰਸ਼ੀ ਸੁਰੱਖਿਆ ਉਪਕਰਣ (ਕੈਟਾਲਾਗ)",
    catalogSubtitle: "ਆਪਣੀ ਕਿੱਟ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰਨ ਲਈ ਪ੍ਰਮਾਣਿਤ ਨਿੱਜੀ ਸੁਰੱਖਿਆ ਉਪਕਰਣ ਚੁਣੋ।",
    allCategory: "ਸਾਰੇ",
    priorityLabel: (p) => {
      const map = { Critical: 'ਬਹੁਤ ਜ਼ਰੂਰੀ', High: 'ਉੱਚ', Medium: 'ਦਰਮਿਆਨਾ' };
      return `${map[p] || p} ਤਰਜੀਹ`;
    },
    bestFor: "ਲਈ ਵਧੀਆ:",
    addToKit: "ਕਿੱਟ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ",
    inKit: (qty) => `ਕਿੱਟ ਵਿੱਚ (${qty})`,
    historyModalTitle: "ਐਮਰਜੈਂਸੀ ਕਿੱਟ ਇਤਿਹਾਸ",
    historyModalSubtitle: "ਆਪਣੇ ਪਹਿਲਾਂ ਸੁਰੱਖਿਅਤ ਕੀਤੇ ਗਏ ਕਿੱਟ ਕੌਨਫਿਗਰੇਸ਼ਨ ਵੇਖੋ, ਲੋਡ ਕਰੋ ਜਾਂ ਮਿਟਾਓ",
    noSavedKits: "ਕੋਈ ਸੁਰੱਖਿਅਤ ਕਿੱਟ ਨਹੀਂ ਮਿਲੀ",
    noSavedKitsDesc: 'ਸੁਰੱਖਿਆ ਸਮਾਨ ਸ਼ਾਮਲ ਕਰੋ ਅਤੇ ਇਤਿਹਾਸ ਵਿੱਚ ਸੇਵ ਕਰਨ ਲਈ "ਇਤਿਹਾਸ ਵਿੱਚ ਸੇਵ ਕਰੋ" ਦਬਾਓ।',
    restoreToActive: "ਐਕਟਿਵ ਕਿੱਟ ਵਿੱਚ ਲੋਡ ਕਰੋ",
    delete: "ਮਿਟਾਓ",
    savedConfigurations: (count) => `${count} ਸੁਰੱਖਿਅਤ ਰਿਕਾਰਡ`,
    close: "ਬੰਦ ਕਰੋ",
    promptName: "ਇਸ ਐਮਰਜੈਂਸੀ ਕਿੱਟ ਲਈ ਇੱਕ ਨਾਮ ਦਰਜ ਕਰੋ:",
    alertEmptySave: "ਇਤਿਹਾਸ ਵਿੱਚ ਸੇਵ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਘੱਟੋ-ਘੱਟ ਇੱਕ ਸਮਾਨ ਸ਼ਾਮਲ ਕਰੋ!",
    alertSaved: (name) => `"${name}" ਨੂੰ ਇਤਿਹਾਸ ਵਿੱਚ ਸੇਵ ਕੀਤਾ ਗਿਆ!`,
    alertLoaded: (name) => `"${name}" ਨੂੰ ਐਕਟਿਵ ਕਿੱਟ ਵਿੱਚ ਲੋਡ ਕੀਤਾ ਗਿਆ!`,
    alertRemoved: (name) => `"${name}" ਨੂੰ ਇਤਿਹਾਸ ਵਿੱਚੋਂ ਮਿਟਾ ਦਿੱਤਾ ਗਿਆ।`,
    alertAdded: (name) => `"${name}" ਨੂੰ ਉੱਪਰ ਐਮਰਜੈਂਸੀ ਕਿੱਟ ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤਾ ਗਿਆ`
  }
};

/**
 * SafetyKit Component (CE2 Syllabus: Redux Toolkit Mini-Project)
 * Demonstrates:
 * 1. Multilingual localized UI with Redux Toolkit language persistence
 * 2. useSelector hook for state subscriptions
 * 3. useDispatch hook for action dispatching
 * 4. Immutable cart state modifications
 */
function SafetyKit() {
  const dispatch = useDispatch();
  const catalog = useSelector(selectCatalog);
  const kitItems = useSelector(selectKitItems);
  const savedKitsHistory = useSelector(selectSavedKitsHistory);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalCost = useSelector(selectTotalCost);
  const packedCount = useSelector(selectPackedCount);
  const currentLanguage = useSelector(selectLanguage);

  const [activeCategory, setActiveCategory] = useState('All');
  const [notification, setNotification] = useState('');
  const [isKitExpanded, setIsKitExpanded] = useState(true);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Active translation dictionary with English fallback
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;

  // Helper to extract localized properties of an item
  const getLocalizedItem = (item) => {
    if (item.translations && item.translations[currentLanguage]) {
      return {
        ...item,
        ...item.translations[currentLanguage]
      };
    }
    return item;
  };

  // Extract unique categories for filter tabs
  const categories = ['All', ...new Set(catalog.map((item) => item.category))];

  // Filter catalog based on active category
  const filteredCatalog = activeCategory === 'All' 
    ? catalog 
    : catalog.filter((item) => item.category === activeCategory);

  // Icon selector per category
  const getItemIcon = (category) => {
    switch (category) {
      case 'Acoustic Defense':
        return <Volume2 size={20} />;
      case 'Personal Protection':
        return <ShieldAlert size={20} />;
      case 'Visibility & Illumination':
        return <Zap size={20} />;
      case 'Medical Emergency':
        return <HeartPulse size={20} />;
      case 'Device Reliability':
        return <BatteryCharging size={20} />;
      case 'Accommodation Safety':
        return <Lock size={20} />;
      case 'Digital Security':
        return <CreditCard size={20} />;
      default:
        return <ShieldCheck size={20} />;
    }
  };

  // Flash feedback notification on dispatch & auto-expand kit at top
  const handleAddItem = (item) => {
    const localized = getLocalizedItem(item);
    dispatch(addToKit(item));
    setIsKitExpanded(true);
    setNotification(t.alertAdded(localized.name));
    setTimeout(() => {
      setNotification('');
    }, 2500);
  };

  // Save current kit to history
  const handleSaveCurrentKit = () => {
    if (kitItems.length === 0) {
      setNotification(t.alertEmptySave);
      setTimeout(() => setNotification(''), 2500);
      return;
    }
    const defaultName = prompt(t.promptName, `Emergency Kit #${savedKitsHistory.length + 1}`);
    if (defaultName !== null) {
      const trimmed = defaultName.trim() || `Emergency Kit #${savedKitsHistory.length + 1}`;
      dispatch(saveCurrentKit({ name: trimmed }));
      setNotification(t.alertSaved(trimmed));
      setTimeout(() => setNotification(''), 2500);
    }
  };

  // Restore saved kit from history
  const handleRestoreKit = (entry) => {
    dispatch(restoreSavedKit(entry.id));
    setIsHistoryModalOpen(false);
    setIsKitExpanded(true);
    setNotification(t.alertLoaded(entry.name));
    setTimeout(() => setNotification(''), 2500);
  };

  // Delete saved kit from history
  const handleDeleteSavedKit = (id, name) => {
    dispatch(deleteSavedKit(id));
    setNotification(t.alertRemoved(name));
    setTimeout(() => setNotification(''), 2500);
  };

  return (
    <div className="safety-kit-page">
      {/* 1. Header Banner */}
      <section className="safety-kit-hero">
        <div className="container">
          
          {/* Store Badge */}
          <div className="hero-badge hero-store-badge">
            {t.heroBadge}
          </div>

          <h1 className="safety-kit-title">
            {t.titleMain}<span className="highlight-text">{t.titleHighlight}</span>
          </h1>
          <p className="safety-kit-subtitle">
            {t.subtitle}
          </p>

          {/* Quick Stats Metrics Bar */}
          <div className="kit-hero-metrics">
            <div className="metric-pill">
              <span className="metric-val">{catalog.length}</span>
              <span className="metric-label">{t.metricCatalog}</span>
            </div>
            <div className="metric-pill active-pill">
              <span className="metric-val">{totalQuantity}</span>
              <span className="metric-label">{t.metricInKit}</span>
            </div>
            <div className="metric-pill">
              <span className="metric-val">₹{totalCost}</span>
              <span className="metric-label">{t.metricEstimatedValue}</span>
            </div>
            <div className="metric-pill">
              <span className="metric-val">{kitItems.length > 0 ? Math.round((packedCount / kitItems.length) * 100) : 0}%</span>
              <span className="metric-label">{t.metricReadiness}</span>
            </div>
          </div>

          {/* Flash Notification Toast */}
          {notification && (
            <div className="kit-notification-toast">
              <Sparkles size={16} /> {notification}
            </div>
          )}
        </div>
      </section>

      {/* Main Container */}
      <div className="container safety-kit-container">
        
        {/* 1. TOP SECTION: Expandable My Emergency Kit Panel */}
        <section className={`top-emergency-kit-panel ${isKitExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="top-kit-header" onClick={() => setIsKitExpanded(!isKitExpanded)}>
            <div className="top-kit-title-group">
              <div className="top-kit-icon-badge">
                <ShoppingBag size={22} />
              </div>
              <div>
                <div className="top-kit-headline">
                  <h3>{t.emergencyKitTitle}</h3>
                  <span className="cart-count-badge">{t.itemsBadge(totalQuantity)}</span>
                </div>
                <p className="top-kit-subtext">
                  {kitItems.length === 0 
                    ? t.emptyKitSubtext
                    : t.kitSummarySubtext(packedCount, kitItems.length, totalCost)}
                </p>
              </div>
            </div>

            <div className="top-kit-header-actions">
              {/* Button to view all saved kits history */}
              <button 
                type="button" 
                className="top-kit-history-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHistoryModalOpen(true);
                }}
                title="View all saved emergency kit history"
              >
                <History size={16} />
                <span>{t.savedHistoryBtn(savedKitsHistory.length)}</span>
              </button>

              {kitItems.length > 0 && (
                <div className="top-kit-quick-metrics">
                  <span className="quick-metric-val">₹{totalCost}</span>
                  <span className="quick-readiness-badge">
                    {t.readyBadge(Math.round((packedCount / kitItems.length) * 100))}
                  </span>
                </div>
              )}
              <button 
                type="button" 
                className="top-kit-toggle-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsKitExpanded(!isKitExpanded);
                }}
                aria-label={isKitExpanded ? t.hideKit : t.viewKit}
              >
                {isKitExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                <span>{isKitExpanded ? t.hideKit : t.viewKit}</span>
              </button>
            </div>
          </div>

          {/* Expandable Body */}
          {isKitExpanded && (
            <div className="top-kit-body">
              {kitItems.length === 0 ? (
                <div className="top-kit-empty">
                  <AlertTriangle size={28} className="empty-icon" />
                  <div>
                    <h4>{t.emptyKitHeadline}</h4>
                    <p>{t.emptyKitDesc}</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Readiness Progress Bar */}
                  <div className="kit-packed-meter top-packed-meter">
                    <div className="meter-header">
                      <span><PackageCheck size={16} /> {t.checklistTitle}</span>
                      <strong>{t.checklistSubtitle(packedCount, kitItems.length)}</strong>
                    </div>
                    <div className="meter-track">
                      <div 
                        className="meter-fill" 
                        style={{ width: `${(packedCount / kitItems.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Active Kit Items in a Responsive Grid */}
                  <div className="top-kit-items-grid">
                    {kitItems.map((item) => {
                      const localized = getLocalizedItem(item);
                      return (
                        <div key={item.id} className="top-kit-item-card">
                          <div className="top-kit-item-main">
                            <button
                              type="button"
                              className="packed-toggle-btn"
                              onClick={() => dispatch(togglePackedStatus(item.id))}
                              title={item.isPacked ? t.markUnpacked : t.markPacked}
                            >
                              {item.isPacked ? (
                                <CheckCircle2 size={20} className="packed-check active" />
                              ) : (
                                <Circle size={20} className="packed-check" />
                              )}
                            </button>
                            
                            <div className="top-kit-item-details">
                              <span className={`top-item-title ${item.isPacked ? 'packed' : ''}`}>
                                {localized.name}
                              </span>
                              <span className="top-item-price-tag">
                                ₹{item.price} {t.eachPrice} &bull; {t.totalLabel} <strong>₹{item.price * item.quantity}</strong>
                              </span>
                            </div>
                          </div>

                          {/* Quantity and Remove */}
                          <div className="top-kit-item-controls">
                            <div className="quantity-controller">
                              <button
                                type="button"
                                onClick={() => dispatch(decrementQuantity(item.id))}
                                className="qty-btn"
                                title="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="qty-value">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => dispatch(incrementQuantity(item.id))}
                                className="qty-btn"
                                title="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => dispatch(removeFromKit(item.id))}
                              className="btn-remove-item"
                              title="Remove from safety kit"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Actions Row */}
                  <div className="top-kit-footer">
                    <div className="top-kit-footer-stats">
                      <span>{t.totalGear} <strong>{totalQuantity}</strong></span>
                      <span className="divider-dot">•</span>
                      <span>{t.estValue} <strong className="highlight-price">₹{totalCost}</strong></span>
                    </div>

                    <div className="top-kit-footer-actions">
                      <button
                        type="button"
                        onClick={() => dispatch(clearKit())}
                        className="btn-clear-kit"
                      >
                        <RotateCcw size={15} /> {t.clearKit}
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveCurrentKit}
                        className="btn-save-kit-history"
                        title="Save current emergency kit snapshot to history"
                      >
                        <BookmarkPlus size={16} /> {t.saveToHistory}
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveCurrentKit}
                        className="btn-confirm-kit"
                      >
                        <ShieldCheck size={17} /> {t.confirmKit}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* 2. BELOW: Recommended Safety Gear Catalog (Full Width) */}
        <section className="kit-catalog-section full-width-catalog">
          <div className="catalog-header-row">
            <div>
              <h2 className="section-title">{t.catalogTitle}</h2>
              <p className="section-subtitle">
                {t.catalogSubtitle}
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="catalog-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`catalog-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'All' ? t.allCategory : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Full-Width Catalog Cards Grid */}
          <div className="catalog-grid catalog-grid-full">
            {filteredCatalog.map((item) => {
              const inKitItem = kitItems.find((k) => k.id === item.id);
              const localized = getLocalizedItem(item);

              return (
                <article key={item.id} className={`catalog-card ${inKitItem ? 'card-in-kit' : ''}`}>
                  <div className="catalog-card-top">
                    <div className="catalog-icon-badge">
                      {getItemIcon(item.category)}
                    </div>
                    <span className={`priority-tag priority-${item.priority.toLowerCase()}`}>
                      {t.priorityLabel(localized.priority || item.priority)}
                    </span>
                  </div>

                  <span className="catalog-category-tag">{localized.category || item.category}</span>
                  <h3 className="catalog-item-name">{localized.name}</h3>
                  <p className="catalog-item-desc">{localized.description}</p>

                  <div className="catalog-recommended-note">
                    <Tag size={13} />
                    <span>{t.bestFor} <strong>{localized.recommendedFor}</strong></span>
                  </div>

                  <div className="catalog-card-footer">
                    <div className="catalog-price">
                      ₹{item.price}
                    </div>

                    <button
                      type="button"
                      className={`btn-add-to-kit ${inKitItem ? 'already-in-kit' : ''}`}
                      onClick={() => handleAddItem(item)}
                      title="Add to Emergency Kit at top"
                    >
                      {inKitItem ? <Check size={16} /> : <Plus size={16} />}
                      <span>{inKitItem ? t.inKit(inKitItem.quantity) : t.addToKit}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

      </div>

      {/* 3. Saved Kits History Modal */}
      {isHistoryModalOpen && (
        <div className="kit-history-modal-backdrop" onClick={() => setIsHistoryModalOpen(false)}>
          <div className="kit-history-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="history-modal-header">
              <div className="history-modal-title">
                <History size={22} className="history-icon" />
                <div>
                  <h3>{t.historyModalTitle}</h3>
                  <p>{t.historyModalSubtitle}</p>
                </div>
              </div>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setIsHistoryModalOpen(false)}
                title="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="history-modal-body">
              {savedKitsHistory.length === 0 ? (
                <div className="history-empty-state">
                  <Clock size={40} className="empty-clock" />
                  <h4>{t.noSavedKits}</h4>
                  <p>{t.noSavedKitsDesc}</p>
                </div>
              ) : (
                <div className="history-cards-list">
                  {savedKitsHistory.map((kit) => (
                    <div key={kit.id} className="history-card-item">
                      <div className="history-card-header">
                        <div>
                          <h4 className="history-kit-title">{kit.name}</h4>
                          <span className="history-kit-date">
                            <Clock size={13} /> {kit.savedAt}
                          </span>
                        </div>
                        <div className="history-kit-meta">
                          <span className="history-badge-items">{t.itemsBadge(kit.totalQuantity)}</span>
                          <span className="history-badge-cost">₹{kit.totalCost}</span>
                        </div>
                      </div>

                      <div className="history-items-chips">
                        {kit.items.map((item) => {
                          const localized = getLocalizedItem(item);
                          return (
                            <span key={item.id} className="history-item-chip">
                              {localized.name} &times; {item.quantity}
                            </span>
                          );
                        })}
                      </div>

                      <div className="history-card-actions">
                        <button
                          type="button"
                          className="btn-restore-history"
                          onClick={() => handleRestoreKit(kit)}
                          title="Load this kit into active Emergency Kit"
                        >
                          <RotateCcw size={14} /> {t.restoreToActive}
                        </button>
                        <button
                          type="button"
                          className="btn-delete-history"
                          onClick={() => handleDeleteSavedKit(kit.id, kit.name)}
                          title="Delete from history"
                        >
                          <Trash2 size={14} /> {t.delete}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="history-modal-footer">
              <span>{t.savedConfigurations(savedKitsHistory.length)}</span>
              <button
                type="button"
                className="btn-modal-done"
                onClick={() => setIsHistoryModalOpen(false)}
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SafetyKit;
