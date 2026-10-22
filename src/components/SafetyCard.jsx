import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

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
