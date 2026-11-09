/**
 * Audio Evidence Recorder & Storage Service
 * Uses HTML5 MediaRecorder API, Web Audio AnalyserNode, and browser IndexedDB.
 * Completely offline, secure, and stores evidence directly on device.
 */

const DB_NAME = 'watchover_audio_vault';
const DB_VERSION = 1;
const STORE_NAME = 'recordings';

/**
 * Open or initialize browser IndexedDB for persistent audio storage
 * @returns {Promise<IDBDatabase>}
 */
function openDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB is not supported on this device.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

/**
 * Save an audio recording record into IndexedDB
 * @param {Object} recording
 * @returns {Promise<void>}
 */
export async function saveRecordingToVault(recording) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(recording);

    request.onsuccess = () => resolve();
    request.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Retrieve all saved audio recordings sorted by newest first
 * @returns {Promise<Array>}
 */
export async function getVaultRecordings() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const list = request.result || [];
      // Sort newest first
      list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      resolve(list);
    };
    request.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Delete a recording from the vault by ID
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteVaultRecording(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = (e) => reject(e.target.error);
  });
}

// Active session variables
let mediaStream = null;
let mediaRecorder = null;
let audioChunks = [];
let audioContext = null;
let analyserNode = null;
let animFrameId = null;

/**
 * Detect the optimal supported audio MIME type
 * @returns {string}
 */
export function getSupportedMimeType() {
  if (typeof MediaRecorder === 'undefined') return '';
  const types = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/mp4',
    'audio/aac'
  ];
  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return '';
}

/**
 * Start capturing microphone audio with live waveform analysis
 * @param {Object} options
 * @param {Function} options.onWaveformData - Callback receiving frequency data array (0-255)
 * @param {Function} options.onError - Error handler
 * @returns {Promise<boolean>}
 */
export async function startAudioCapture({ onWaveformData, onError }) {
  stopAudioCapture();
  audioChunks = [];

  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Microphone audio capture is not supported in this browser.');
    }

    // 1. Request microphone permission
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });

    // 2. Setup Web Audio API AnalyserNode for live sound waves
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      audioContext = new AudioCtx();
      const source = audioContext.createMediaStreamSource(mediaStream);
      analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 64; // Generates 32 frequency bins for visual waveform bars
      source.connect(analyserNode);

      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const pollWaveform = () => {
        if (!analyserNode) return;
        analyserNode.getByteFrequencyData(dataArray);
        if (onWaveformData) {
          onWaveformData(Array.from(dataArray));
        }
        animFrameId = requestAnimationFrame(pollWaveform);
      };
      pollWaveform();
    }

    // 3. Setup MediaRecorder
    const mimeType = getSupportedMimeType();
    const options = mimeType ? { mimeType } : undefined;
    mediaRecorder = new MediaRecorder(mediaStream, options);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    // Request data in 1-second timeslices for reliability
    mediaRecorder.start(1000);
    return true;
  } catch (err) {
    console.error('Audio capture failed:', err);
    if (onError) onError(err);
    stopAudioCapture();
    return false;
  }
}

/**
 * Stop active audio capture, release mic hardware, and return finalized Blob
 * @returns {Promise<{ blob: Blob, mimeType: string, size: number } | null>}
 */
export function stopAudioCapture() {
  return new Promise((resolve) => {
    // Stop waveform animation loop
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }

    // Close AudioContext
    if (audioContext) {
      try {
        audioContext.close();
      } catch (_) {}
      audioContext = null;
      analyserNode = null;
    }

    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
      // Clean up tracks
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
        mediaStream = null;
      }
      resolve(null);
      return;
    }

    mediaRecorder.onstop = () => {
      const mimeType = mediaRecorder.mimeType || 'audio/webm';
      const blob = new Blob(audioChunks, { type: mimeType });
      const size = blob.size;

      // Release hardware microphone
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
        mediaStream = null;
      }

      mediaRecorder = null;
      audioChunks = [];

      resolve({ blob, mimeType, size });
    };

    try {
      mediaRecorder.stop();
    } catch (_) {
      resolve(null);
    }
  });
}
