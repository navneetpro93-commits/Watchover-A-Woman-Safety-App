import React, { useState, useEffect, useCallback } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  ThumbsUp, 
  Trash2, 
  Plus, 
  RefreshCw, 
  ShieldAlert, 
  ShieldCheck,
  Zap,
  Eye,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { incidentService } from '../services/incidentService';
import { useToast } from '../context/ToastContext';

/**
 * IncidentFeed Component (Step 2 of Community Safety Incident Reporter)
 * Demonstrates Syllabus Topics:
 * - Lectures 49-60: React Component State, Rendering Lists (map), Conditional Rendering
 * - Lectures 61-72: Component Composition & useCallback optimization
 * - Lectures 85-90: Async State Management (Loading skeletons, Error Boundaries, CRUD operations: Read, Verify, Delete)
 * 
 * @param {Object} props
 * @param {Function} props.onOpenReportModal - Trigger to open Create Report Modal
 * @param {number} props.refreshTrigger - Timestamp/counter to force-refresh list
 */
function IncidentFeed({ onOpenReportModal, refreshTrigger }) {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toast = useToast();

  const categories = [
    'All',
    'Poor Street Lighting',
    'Harassment Hotspot',
    'Secluded Area',
    'Suspicious Activity'
  ];

  const severities = ['All', 'Critical', 'High', 'Medium'];

  // Async fetch incidents from Service Layer
  const fetchIncidents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await incidentService.getIncidents({
        category: selectedCategory,
        severity: selectedSeverity,
        searchQuery: searchQuery
      });
      setIncidents(data);
    } catch (err) {
      setError(err.message || 'Failed to load community incident feed.');
      toast.error('Could not fetch incidents. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, selectedSeverity, searchQuery, toast]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents, refreshTrigger]);

  // Handle Verify / Upvote ("I also noticed this")
  const handleVerify = async (id, title) => {
    try {
      const updated = await incidentService.verifyIncident(id);
      setIncidents((prev) =>
        prev.map((inc) => (inc.id === id ? updated : inc))
      );
      toast.success(`Verification noted for "${title}"!`, { title: 'Community Feedback' });
    } catch (err) {
      toast.error(err.message || 'Failed to verify incident.');
    }
  };

  // Handle Delete Incident Report
  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(`Are you sure you want to delete the report: "${title}"?`);
    if (!confirmed) return;

    try {
      await incidentService.deleteIncident(id);
      setIncidents((prev) => prev.filter((inc) => inc.id !== id));
      toast.info(`Report "${title}" removed from community feed.`, { title: 'Incident Deleted' });
    } catch (err) {
      toast.error(err.message || 'Failed to delete report.');
    }
  };

  // Severity pill color classifier
  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'severity-critical';
      case 'High':
        return 'severity-high';
      case 'Medium':
        return 'severity-medium';
      default:
        return 'severity-low';
    }
  };

  // Format relative time or standard date
  const formatTimeAgo = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="incident-feed-section">
      {/* 1. Header Toolbar with Report Trigger */}
      <div className="feed-header-toolbar">
        <div>
          <h2 className="feed-section-title">Community Safety Incidents</h2>
          <p className="feed-section-subtitle">
            Crowdsourced alerts to keep commuters and women vigilant of potential hazards.
          </p>
        </div>

        <div className="feed-header-actions">
          <button 
            type="button" 
            className="btn-secondary-outline feed-refresh-btn"
            onClick={fetchIncidents}
            disabled={isLoading}
            title="Refresh feed"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <button 
            type="button" 
            className="btn-primary feed-report-btn"
            onClick={onOpenReportModal}
          >
            <Plus size={18} />
            <span>Report Incident</span>
          </button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="feed-filter-bar">
        {/* Search input */}
        <div className="feed-search-wrap">
          <Search size={18} className="feed-search-icon" />
          <input 
            type="text" 
            placeholder="Search by location, keyword, or street name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="feed-search-input"
          />
          {searchQuery && (
            <button 
              type="button" 
              className="feed-search-clear" 
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Severity filter dropdown */}
        <div className="feed-severity-select-wrap">
          <Filter size={16} className="feed-filter-icon" />
          <select 
            value={selectedSeverity} 
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="feed-severity-select"
          >
            {severities.map((sev) => (
              <option key={sev} value={sev}>Severity: {sev}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Filter Pills (Tabs UI Pattern) */}
      <div className="feed-category-pills">
        {categories.map((cat) => (
          <button 
            key={cat}
            type="button"
            className={`feed-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Error Banner */}
      {error && (
        <div className="feed-error-banner" role="alert">
          <AlertTriangle size={18} />
          <span>{error}</span>
          <button type="button" onClick={fetchIncidents} className="feed-error-retry-btn">
            Retry
          </button>
        </div>
      )}

      {/* 4. Incident Cards Feed */}
      {isLoading ? (
        <div className="feed-loading-container">
          <div className="feed-skeleton-card" />
          <div className="feed-skeleton-card" />
          <div className="feed-skeleton-card" />
        </div>
      ) : incidents.length > 0 ? (
        <div className="feed-grid">
          {incidents.map((incident) => {
            const mapUrl = `https://maps.google.com/?q=${incident.latitude},${incident.longitude}`;

            return (
              <div key={incident.id} className="incident-card">
                <div className="incident-card-top">
                  <div className="incident-badges-row">
                    <span className="incident-category-badge">{incident.category}</span>
                    <span className={`incident-severity-badge ${getSeverityBadgeClass(incident.severity)}`}>
                      {incident.severity} Priority
                    </span>
                  </div>

                  {/* Delete Trigger */}
                  <button 
                    type="button"
                    className="incident-delete-btn"
                    onClick={() => handleDelete(incident.id, incident.title)}
                    title="Delete report"
                    aria-label={`Delete report ${incident.title}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <h3 className="incident-title">{incident.title}</h3>

                <div className="incident-location-row">
                  <MapPin size={15} className="incident-loc-icon" />
                  <span>{incident.location}</span>
                  <a 
                    href={mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="incident-loc-link"
                    title="View coordinates on Google Maps"
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>

                <p className="incident-description">{incident.description}</p>

                {/* Footer Meta: Reporter, Time, and Verification Upvote */}
                <div className="incident-card-footer">
                  <div className="incident-meta-group">
                    <span className="incident-reporter">By: {incident.reportedBy}</span>
                    <span className="incident-time">
                      <Clock size={12} /> {formatTimeAgo(incident.reportedAt)}
                    </span>
                  </div>

                  <button 
                    type="button" 
                    className="incident-verify-btn"
                    onClick={() => handleVerify(incident.id, incident.title)}
                    title="Confirm you have also observed this issue"
                  >
                    <ThumbsUp size={14} />
                    <span>Confirm ({incident.verifiedCount || 1})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty Search / Filter State */
        <div className="feed-empty-state">
          <div className="feed-empty-icon">
            <ShieldCheck size={36} />
          </div>
          <h3>No Incident Reports Match Your Filters</h3>
          <p>
            {searchQuery || selectedCategory !== 'All' || selectedSeverity !== 'All'
              ? 'Try resetting your search query or filter tags to see all community records.'
              : 'No safety hazards reported in this area yet. You can be the first to alert the community!'}
          </p>
          {(searchQuery || selectedCategory !== 'All' || selectedSeverity !== 'All') ? (
            <button 
              type="button" 
              className="btn-secondary-outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSeverity('All');
              }}
            >
              Reset Filters
            </button>
          ) : (
            <button 
              type="button" 
              className="btn-primary"
              onClick={onOpenReportModal}
            >
              <Plus size={16} /> Report an Incident
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default IncidentFeed;
