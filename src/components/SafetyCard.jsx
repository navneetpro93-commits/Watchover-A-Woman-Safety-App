import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

/**
 * SafetyCard Component
 * Reusable component for displaying safety tips with Save/Unsave capability.
 * Demonstrates:
 * 1. Props receiving & usage
 * 2. Event handling (onClick callback)
 * 3. Conditional rendering for Save / Saved state
 * 
 * @param {Object} props
 * @param {number} props.id - Tip unique identifier
 * @param {string} props.title - Tip title
 * @param {string} props.description - Detailed description of the safety tip
 * @param {boolean} props.isSaved - Whether tip is currently saved
 * @param {Function} props.onToggleSave - Callback function when user clicks Save button
 */
function SafetyCard({ id, title, description, isSaved, onToggleSave }) {
  return (
    <div className={`safety-card ${isSaved ? 'saved' : ''}`}>
      <div>
        <div className="safety-card-header">
          {id && <span className="safety-card-number">{id}</span>}
          <h3 className="safety-card-title">{title}</h3>
        </div>
        <p className="safety-card-desc">{description}</p>
      </div>

      <div className="safety-card-footer">
        <button
          className={`save-tip-btn ${isSaved ? 'saved-btn' : ''}`}
          onClick={() => onToggleSave(id)}
          type="button"
        >
          {isSaved ? (
            <>
              <BookmarkCheck size={16} /> Saved
            </>
          ) : (
            <>
              <Bookmark size={16} /> Save Tip
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default SafetyCard;
