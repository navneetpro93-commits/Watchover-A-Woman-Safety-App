import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Download, 
  Trash2, 
  Clock, 
  HardDrive, 
  ShieldCheck, 
  FileAudio, 
  AlertTriangle,
  RefreshCw,
  FolderLock
} from 'lucide-react';
import { getVaultRecordings, deleteVaultRecording } from '../utils/audioRecorderService';
import { useToast } from '../context/ToastContext';

/**
 * AudioVaultList Component
 * Displays locally saved audio evidence files stored in IndexedDB.
 * Supports in-browser audio playback, scrub progress, file downloads (.webm), and deletion.
 * 
 * @param {Object} props
 * @param {number} props.refreshTrigger - Counter to force reload when a new recording is saved
 */
function AudioVaultList({ refreshTrigger }) {
  const { showToast } = useToast();

  const [recordings, setRecordings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playingId, setPlayingId] = useState(null);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [clipToDelete, setClipToDelete] = useState(null);

  const audioRef = useRef(new Audio());
  const activeBlobUrlRef = useRef(null);

  // Load recordings from IndexedDB
  const fetchRecordings = async () => {
    setIsLoading(true);
    try {
      const list = await getVaultRecordings();
      setRecordings(list);
    } catch (err) {
      console.error("Failed to load recordings from IndexedDB:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecordings();
  }, [refreshTrigger]);

  // Audio player event listeners
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setPlaybackTime(audio.currentTime);
    };

    const handleEnded = () => {
      setPlayingId(null);
      setPlaybackTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      if (activeBlobUrlRef.current) {
        URL.revokeObjectURL(activeBlobUrlRef.current);
      }
    };
  }, []);

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    const s = Math.floor(secs || 0);
    const mins = Math.floor(s / 60);
    const rem = s % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  // Format bytes into KB or MB
  const formatBytes = (bytes) => {
    if (!bytes) return '0 KB';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  // Format ISO timestamp
  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Unknown date';
    }
  };

  // Play / Pause handler
  const handleTogglePlay = (rec) => {
    const audio = audioRef.current;

    if (playingId === rec.id) {
      // Pause
      audio.pause();
      setPlayingId(null);
      return;
    }

    // Play new clip
    if (activeBlobUrlRef.current) {
      URL.revokeObjectURL(activeBlobUrlRef.current);
    }

    const blobUrl = URL.createObjectURL(rec.blob);
    activeBlobUrlRef.current = blobUrl;
    audio.src = blobUrl;
    audio.play()
      .then(() => {
        setPlayingId(rec.id);
      })
      .catch((err) => {
        console.error("Audio playback error:", err);
        showToast({
          title: "Playback Error",
          message: "Unable to play audio format on this device.",
          type: "danger",
          duration: 3000
        });
      });
  };

  // Download evidence clip
  const handleDownload = (rec) => {
    const url = URL.createObjectURL(rec.blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    
    const extension = rec.mimeType?.includes('mp4') ? 'mp4' : (rec.mimeType?.includes('ogg') ? 'ogg' : 'webm');
    const cleanDate = rec.timestamp.slice(0, 10);
    a.download = `watchover-evidence-${cleanDate}-${rec.id.slice(-6)}.${extension}`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast({
      title: "Evidence Downloaded",
      message: `Saved ${a.download} to your downloads folder.`,
      type: "success",
      duration: 3500
    });
  };

  // Delete recording confirmation
  const handleConfirmDelete = async () => {
    if (!clipToDelete) return;

    if (playingId === clipToDelete.id) {
      audioRef.current.pause();
      setPlayingId(null);
    }

    try {
      await deleteVaultRecording(clipToDelete.id);
      setRecordings((prev) => prev.filter((r) => r.id !== clipToDelete.id));
      showToast({
        title: "Evidence Deleted",
        message: "The audio recording was removed from local IndexedDB storage.",
        type: "info",
        duration: 3000
      });
    } catch (err) {
      console.error("Delete failed:", err);
      showToast({
        title: "Delete Failed",
        message: "Could not remove recording from vault.",
        type: "danger",
        duration: 3000
      });
    } finally {
      setClipToDelete(null);
    }
  };

  return (
    <div className="audio-vault-container">
      <div className="vault-header">
        <div className="vault-title-group">
          <div className="vault-icon-badge">
            <FolderLock size={22} />
          </div>
          <div>
            <h3 className="vault-title">Saved Evidence Vault</h3>
            <p className="vault-sub">
              Encrypted on-device audio recordings. Playable offline and ready for legal / police export.
            </p>
          </div>
        </div>

        <button 
          type="button" 
          className="btn-vault-refresh"
          onClick={fetchRecordings}
          title="Refresh vault storage"
        >
          <RefreshCw size={14} className={isLoading ? 'spinning-icon' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="vault-loading-state">
          <div className="vault-spinner"></div>
          <p>Decrypting local IndexedDB storage...</p>
        </div>
      ) : recordings.length === 0 ? (
        /* Empty State */
        <div className="vault-empty-state">
          <div className="empty-state-icon">
            <FileAudio size={42} />
          </div>
          <h4>No Audio Evidence Recorded Yet</h4>
          <p>
            When you capture stealth audio above, your timestamped clips will appear securely in this vault with instant playback and export options.
          </p>
        </div>
      ) : (
        /* Recordings List */
        <div className="recordings-list">
          {recordings.map((rec) => {
            const isPlaying = playingId === rec.id;
            const progressPercent = isPlaying && rec.duration > 0
              ? Math.min((playbackTime / rec.duration) * 100, 100)
              : 0;

            return (
              <div 
                key={rec.id} 
                className={`recording-item-card ${isPlaying ? 'card-playing' : ''}`}
              >
                <div className="recording-item-left">
                  <button 
                    type="button"
                    className={`play-btn-circle ${isPlaying ? 'btn-is-playing' : ''}`}
                    onClick={() => handleTogglePlay(rec)}
                    title={isPlaying ? "Pause Audio" : "Play Audio"}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                  </button>

                  <div className="recording-details">
                    <div className="recording-name-row">
                      <h4 className="recording-title-text">{rec.title}</h4>
                      <span className="recording-duration-pill">
                        <Clock size={12} />
                        {isPlaying ? `${formatTime(playbackTime)} / ${formatTime(rec.duration)}` : formatTime(rec.duration)}
                      </span>
                    </div>

                    <div className="recording-meta-row">
                      <span className="recording-date">{formatDate(rec.timestamp)}</span>
                      <span className="meta-separator">•</span>
                      <span className="recording-size">
                        <HardDrive size={11} /> {formatBytes(rec.size)}
                      </span>
                      <span className="meta-separator">•</span>
                      <span className="recording-badge-local">IndexedDB Stored</span>
                    </div>

                    {/* Playback Scrub / Progress Bar */}
                    {isPlaying && (
                      <div className="in-card-scrub-bar">
                        <div 
                          className="in-card-scrub-fill"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="recording-actions-col">
                  <button 
                    type="button"
                    className="vault-action-btn download-btn"
                    onClick={() => handleDownload(rec)}
                    title="Export & Download Audio Evidence (.webm)"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </button>

                  <button 
                    type="button"
                    className="vault-action-btn delete-btn"
                    onClick={() => setClipToDelete(rec)}
                    title="Delete Evidence Clip"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {clipToDelete && (
        <div className="vault-modal-overlay">
          <div className="vault-modal-card">
            <div className="vault-modal-icon-wrap">
              <AlertTriangle size={28} />
            </div>
            <h3>Delete Audio Evidence?</h3>
            <p>
              Are you sure you want to permanently erase <strong>"{clipToDelete.title}"</strong> from this device? This action cannot be undone.
            </p>
            <div className="vault-modal-actions">
              <button 
                type="button" 
                className="btn-secondary-outline"
                onClick={() => setClipToDelete(null)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn-danger"
                onClick={handleConfirmDelete}
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AudioVaultList;
