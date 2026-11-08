import React, { useState } from 'react';
import IncidentFeed from '../components/IncidentFeed';
import ReportIncidentModal from '../components/ReportIncidentModal';
import { ShieldAlert, AlertTriangle, Users, MapPin, Plus } from 'lucide-react';
import { useLanguage } from '../utils/useLanguage';

/**
 * Incidents Page Component (Step 4 Integration)
 * Demonstrates:
 * 1. Dedicated Multi-page SPA Routing (/incidents)
 * 2. Composing IncidentFeed and ReportIncidentModal with reactive refresh triggers
 * 3. Consuming user prop for community reporting attribution
 * 
 * @param {Object} props
 * @param {Object} props.user - Current authenticated user
 */
function Incidents({ user }) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());
  const { t } = useLanguage();

  const handleIncidentCreated = () => {
    setRefreshTrigger(Date.now());
  };

  return (
    <div className="incidents-page">
      {/* 1. Hero Header Banner */}
      <div className="tips-header text-center">
        <div className="container">
          <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <ShieldAlert size={16} /> Community Safety Network
          </div>
          <h1 className="section-title">Incident Reporting & Vigilance Feed</h1>
          <p className="section-subtitle">
            Stay informed about real-time commute hazards, unlit walkways, and reported harassment hotspots across your city.
          </p>
        </div>
      </div>

      {/* 2. Main Page Content */}
      <div className="container page-section" style={{ paddingTop: 0 }}>
        {/* Incident Feed with Filter Bar & Actions */}
        <IncidentFeed 
          onOpenReportModal={() => setIsReportModalOpen(true)}
          refreshTrigger={refreshTrigger}
        />

        {/* Controlled Reporting Modal Dialog */}
        <ReportIncidentModal 
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onIncidentCreated={handleIncidentCreated}
          user={user}
        />
      </div>
    </div>
  );
}

export default Incidents;
