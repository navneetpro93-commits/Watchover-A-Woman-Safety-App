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
  Layers, 
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
  Check
} from 'lucide-react';
import {
  selectCatalog,
  selectKitItems,
  selectTotalQuantity,
  selectTotalCost,
  selectPackedCount,
  addToKit,
  removeFromKit,
  incrementQuantity,
  decrementQuantity,
  togglePackedStatus,
  clearKit
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
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalCost = useSelector(selectTotalCost);
  const packedCount = useSelector(selectPackedCount);

  const [activeCategory, setActiveCategory] = useState('All');
  const [notification, setNotification] = useState('');

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

  // Flash feedback notification on dispatch
  const handleAddItem = (item) => {
    dispatch(addToKit(item));
    setNotification(`Added "${item.name}" to your Safety Kit`);
    setTimeout(() => {
      setNotification('');
    }, 2500);
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

      {/* 2. Main Two-Column Layout: Catalog (Left) + Cart Summary (Right) */}
      <div className="container safety-kit-container">
        
        {/* Left Column: Gear Catalog */}
        <section className="kit-catalog-section">
          <div className="catalog-header-row">
            <div>
              <h2 className="section-title">Recommended Safety Gear</h2>
              <p className="section-subtitle">
                Select vetted personal defense and transit preparedness equipment.
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

          {/* Catalog Cards Grid */}
          <div className="catalog-grid">
            {filteredCatalog.map((item) => {
              // Check if item already exists in Redux kit
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
                      title="Dispatch addToKit action to Redux store"
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

        {/* Right Column: Redux Shopping Cart / Safety Kit Summary */}
        <aside className="kit-cart-sidebar">
          <div className="kit-cart-card">
            
            <div className="kit-cart-header">
              <div className="cart-title-row">
                <ShoppingBag size={20} className="cart-icon" />
                <h3>My Emergency Kit</h3>
              </div>
              <span className="cart-count-badge">{totalQuantity} Items</span>
            </div>

            {/* Progress / Packed Checklist Tracker */}
            {kitItems.length > 0 && (
              <div className="kit-packed-meter">
                <div className="meter-header">
                  <span><PackageCheck size={14} /> Readiness Checklist:</span>
                  <strong>{packedCount} of {kitItems.length} packed</strong>
                </div>
                <div className="meter-track">
                  <div 
                    className="meter-fill" 
                    style={{ width: `${kitItems.length > 0 ? (packedCount / kitItems.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            {kitItems.length === 0 ? (
              <div className="cart-empty-state">
                <AlertTriangle size={32} className="empty-icon" />
                <h4>Your kit is empty</h4>
                <p>Add recommended safety items from the catalog on the left.</p>
              </div>
            ) : (
              <div className="cart-items-list">
                {kitItems.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <div className="cart-item-info">
                      <div className="cart-item-name-row">
                        <button
                          type="button"
                          className="packed-toggle-btn"
                          onClick={() => dispatch(togglePackedStatus(item.id))}
                          title={item.isPacked ? "Mark as unpacked" : "Mark as packed in bag"}
                        >
                          {item.isPacked ? (
                            <CheckCircle2 size={16} className="packed-check active" />
                          ) : (
                            <Circle size={16} className="packed-check" />
                          )}
                        </button>
                        <span className={`cart-item-title ${item.isPacked ? 'packed' : ''}`}>
                          {item.name}
                        </span>
                      </div>
                      <div className="cart-item-meta">
                        ₹{item.price} each &bull; <strong>₹{item.price * item.quantity}</strong>
                      </div>
                    </div>

                    {/* Quantity Modifier Buttons */}
                    <div className="cart-item-actions">
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

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => dispatch(removeFromKit(item.id))}
                        className="btn-remove-item"
                        title="Remove from safety kit"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Cart Financial Summary & Actions */}
            {kitItems.length > 0 && (
              <div className="cart-summary-footer">
                <div className="summary-line">
                  <span>Total Gear Quantity:</span>
                  <strong>{totalQuantity} units</strong>
                </div>
                <div className="summary-line total-price-line">
                  <span>Estimated Kit Cost:</span>
                  <span className="total-price-val">₹{totalCost}</span>
                </div>

                <div className="cart-buttons-group">
                  <button
                    type="button"
                    onClick={() => dispatch(clearKit())}
                    className="btn-clear-kit"
                  >
                    <RotateCcw size={15} /> Clear Kit
                  </button>
                  <button
                    type="button"
                    onClick={() => alert(`Safety Kit confirmed! ${totalQuantity} items ready. Total estimated cost: ₹${totalCost}.`)}
                    className="btn-confirm-kit"
                  >
                    <ShieldCheck size={17} /> Confirm Kit
                  </button>
                </div>
              </div>
            )}

          </div>
        </aside>

      </div>

      {/* 3. Academic Syllabus Architectural Explanation */}
      <section className="container kit-architecture-section">
        <div className="about-section-box">
          <div className="section-box-header">
            <div className="feature-icon bg-purple">
              <Layers size={24} />
            </div>
            <div>
              <h3>How Redux Toolkit Powers This Webpage</h3>
              <p>Key syllabus concepts demonstrated in this feature:</p>
            </div>
          </div>

          <div className="tech-cards-grid">
            <div className="tech-badge-card">
              <div className="tech-name">createSlice()</div>
              <div className="tech-desc">
                Defines reducer logic & automatically generates action creators in <code>safetyKitSlice.jsx</code>.
              </div>
            </div>
            <div className="tech-badge-card">
              <div className="tech-name">configureStore()</div>
              <div className="tech-desc">
                Configures the central Redux store with default middleware and devtools integration.
              </div>
            </div>
            <div className="tech-badge-card">
              <div className="tech-name">useSelector()</div>
              <div className="tech-desc">
                Subscribes to specific state pieces (total quantity, cost, items) with optimized re-renders.
              </div>
            </div>
            <div className="tech-badge-card">
              <div className="tech-name">useDispatch()</div>
              <div className="tech-desc">
                Dispatches immutable actions (<code>addToKit</code>, <code>decrementQuantity</code>) to update state.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SafetyKit;
