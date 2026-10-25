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
 * SafetyKit Component (CE2 Syllabus: Intro to Redux Toolkit & Shopping Cart Mini-Project)
 * Demonstrates:
 * 1. useSelector hook for state subscriptions
 * 2. useDispatch hook for action dispatching
 * 3. Redux Toolkit slice architecture with createSlice
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

  const [activeCategory, setActiveCategory] = useState('All');
  const [notification, setNotification] = useState('');
  const [isKitExpanded, setIsKitExpanded] = useState(true);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

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
    dispatch(addToKit(item));
    setIsKitExpanded(true);
    setNotification(`Added "${item.name}" to your Emergency Kit at the top`);
    setTimeout(() => {
      setNotification('');
    }, 2500);
  };

  // Save current kit to history
  const handleSaveCurrentKit = () => {
    if (kitItems.length === 0) {
      setNotification('Add at least one safety item before saving to history!');
      setTimeout(() => setNotification(''), 2500);
      return;
    }
    const defaultName = prompt('Enter a label for this emergency kit:', `Emergency Kit #${savedKitsHistory.length + 1}`);
    if (defaultName !== null) {
      const trimmed = defaultName.trim() || `Emergency Kit #${savedKitsHistory.length + 1}`;
      dispatch(saveCurrentKit({ name: trimmed }));
      setNotification(`Saved "${trimmed}" to history!`);
      setTimeout(() => setNotification(''), 2500);
    }
  };

  // Restore saved kit from history
  const handleRestoreKit = (entry) => {
    dispatch(restoreSavedKit(entry.id));
    setIsHistoryModalOpen(false);
    setIsKitExpanded(true);
    setNotification(`Loaded "${entry.name}" into your active Emergency Kit!`);
    setTimeout(() => setNotification(''), 2500);
  };

  // Delete saved kit from history
  const handleDeleteSavedKit = (id, name) => {
    dispatch(deleteSavedKit(id));
    setNotification(`Removed "${name}" from history.`);
    setTimeout(() => setNotification(''), 2500);
  };

  return (
    <div className="safety-kit-page">
      {/* 1. Header Banner */}
      <section className="safety-kit-hero">
        <div className="container">
          <div className="hero-badge hero-store-badge">
            🛡️ 🎒 Verified Safety Essentials • 1-Click Emergency Kit Store ⚡ 🛒
          </div>
          <h1 className="safety-kit-title">
            Personal Safety Gear & <span className="highlight-text">Kit Builder</span>
          </h1>
          <p className="safety-kit-subtitle">
            Equip yourself with essential personal defense and emergency gear. Add items to your kit, customize quantities, and stay prepared for safe daily commutes & solo travel! ✨
          </p>

          {/* Quick Stats Metrics Bar */}
          <div className="kit-hero-metrics">
            <div className="metric-pill">
              <span className="metric-val">{catalog.length}</span>
              <span className="metric-label">Catalog Items</span>
            </div>
            <div className="metric-pill active-pill">
              <span className="metric-val">{totalQuantity}</span>
              <span className="metric-label">Items in Kit</span>
            </div>
            <div className="metric-pill">
              <span className="metric-val">₹{totalCost}</span>
              <span className="metric-label">Estimated Value</span>
            </div>
            <div className="metric-pill">
              <span className="metric-val">{kitItems.length > 0 ? Math.round((packedCount / kitItems.length) * 100) : 0}%</span>
              <span className="metric-label">Readiness Score</span>
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
                  <h3>My Emergency Safety Kit</h3>
                  <span className="cart-count-badge">{totalQuantity} Items</span>
                </div>
                <p className="top-kit-subtext">
                  {kitItems.length === 0 
                    ? "Your kit is currently empty. Add essentials from the catalog below."
                    : `${packedCount} of ${kitItems.length} packed in travel bag • Total: ₹${totalCost}`}
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
                <span>Saved History ({savedKitsHistory.length})</span>
              </button>

              {kitItems.length > 0 && (
                <div className="top-kit-quick-metrics">
                  <span className="quick-metric-val">₹{totalCost}</span>
                  <span className="quick-readiness-badge">
                    {Math.round((packedCount / kitItems.length) * 100)}% Ready
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
                aria-label={isKitExpanded ? "Collapse Emergency Kit" : "Expand Emergency Kit"}
              >
                {isKitExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                <span>{isKitExpanded ? "Hide Kit" : "View Kit"}</span>
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
                    <h4>Your Emergency Kit is Currently Empty</h4>
                    <p>Browse the vetted safety products below and click <strong>"Add to Kit"</strong> to assemble your emergency gear.</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Readiness Progress Bar */}
                  <div className="kit-packed-meter top-packed-meter">
                    <div className="meter-header">
                      <span><PackageCheck size={16} /> Bag Packing Checklist:</span>
                      <strong>{packedCount} of {kitItems.length} items packed in bag</strong>
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
                    {kitItems.map((item) => (
                      <div key={item.id} className="top-kit-item-card">
                        <div className="top-kit-item-main">
                          <button
                            type="button"
                            className="packed-toggle-btn"
                            onClick={() => dispatch(togglePackedStatus(item.id))}
                            title={item.isPacked ? "Mark as unpacked" : "Mark as packed in bag"}
                          >
                            {item.isPacked ? (
                              <CheckCircle2 size={20} className="packed-check active" />
                            ) : (
                              <Circle size={20} className="packed-check" />
                            )}
                          </button>
                          
                          <div className="top-kit-item-details">
                            <span className={`top-item-title ${item.isPacked ? 'packed' : ''}`}>
                              {item.name}
                            </span>
                            <span className="top-item-price-tag">
                              ₹{item.price} each &bull; Total: <strong>₹{item.price * item.quantity}</strong>
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
                    ))}
                  </div>

                  {/* Bottom Actions Row */}
                  <div className="top-kit-footer">
                    <div className="top-kit-footer-stats">
                      <span>Total Gear: <strong>{totalQuantity} items</strong></span>
                      <span className="divider-dot">•</span>
                      <span>Estimated Kit Value: <strong className="highlight-price">₹{totalCost}</strong></span>
                    </div>

                    <div className="top-kit-footer-actions">
                      <button
                        type="button"
                        onClick={() => dispatch(clearKit())}
                        className="btn-clear-kit"
                      >
                        <RotateCcw size={15} /> Clear Kit
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveCurrentKit}
                        className="btn-save-kit-history"
                        title="Save current emergency kit snapshot to history"
                      >
                        <BookmarkPlus size={16} /> Save to History
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveCurrentKit}
                        className="btn-confirm-kit"
                      >
                        <ShieldCheck size={17} /> Confirm & Save Kit
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
              <h2 className="section-title">Recommended Safety Gear (Catalog)</h2>
              <p className="section-subtitle">
                Select vetted personal defense and transit preparedness equipment to add to your kit above.
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
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Full-Width Catalog Cards Grid */}
          <div className="catalog-grid catalog-grid-full">
            {filteredCatalog.map((item) => {
              const inKitItem = kitItems.find((k) => k.id === item.id);

              return (
                <article key={item.id} className={`catalog-card ${inKitItem ? 'card-in-kit' : ''}`}>
                  <div className="catalog-card-top">
                    <div className="catalog-icon-badge">
                      {getItemIcon(item.category)}
                    </div>
                    <span className={`priority-tag priority-${item.priority.toLowerCase()}`}>
                      {item.priority} Priority
                    </span>
                  </div>

                  <span className="catalog-category-tag">{item.category}</span>
                  <h3 className="catalog-item-name">{item.name}</h3>
                  <p className="catalog-item-desc">{item.description}</p>

                  <div className="catalog-recommended-note">
                    <Tag size={13} />
                    <span>Best for: <strong>{item.recommendedFor}</strong></span>
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
                      <span>{inKitItem ? `In Kit (${inKitItem.quantity})` : 'Add to Kit'}</span>
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
                  <h3>Emergency Safety Kits History</h3>
                  <p>View, restore, or manage your previously saved emergency kit configurations</p>
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
                  <h4>No Saved Kits Found</h4>
                  <p>Assemble your emergency kit items and click "Save to History" or "Confirm & Save Kit" to create a saved snapshot.</p>
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
                          <span className="history-badge-items">{kit.totalQuantity} Items</span>
                          <span className="history-badge-cost">₹{kit.totalCost}</span>
                        </div>
                      </div>

                      <div className="history-items-chips">
                        {kit.items.map((item) => (
                          <span key={item.id} className="history-item-chip">
                            {item.name} &times; {item.quantity}
                          </span>
                        ))}
                      </div>

                      <div className="history-card-actions">
                        <button
                          type="button"
                          className="btn-restore-history"
                          onClick={() => handleRestoreKit(kit)}
                          title="Load this kit into active Emergency Kit"
                        >
                          <RotateCcw size={14} /> Restore to Active Kit
                        </button>
                        <button
                          type="button"
                          className="btn-delete-history"
                          onClick={() => handleDeleteSavedKit(kit.id, kit.name)}
                          title="Delete from history"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="history-modal-footer">
              <span>{savedKitsHistory.length} saved configuration(s) recorded</span>
              <button
                type="button"
                className="btn-modal-done"
                onClick={() => setIsHistoryModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SafetyKit;
