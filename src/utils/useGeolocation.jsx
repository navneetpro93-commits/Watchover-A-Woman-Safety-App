import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useGeolocation Custom Hook
 * Demonstrates Syllabus Topics:
 * - Lectures 25-36: Web APIs (HTML5 Geolocation API, Async events)
 * - Lectures 49-60: React useState, useEffect, useRef lifecycle patterns
 * - Lectures 61-72: Custom Hook Architecture, Reusable Logic, Error states
 * - Lectures 85-90: Async state management (loading, tracking, error recovery)
 * 
 * @param {Object} options
 * @param {boolean} options.enableHighAccuracy - Request GPS hardware rather than IP/WiFi
 * @param {number} options.timeout - Timeout in milliseconds before error trigger
 * @param {number} options.maximumAge - Maximum cached age of coordinates
 */
export function useGeolocation(options = {}) {
  const {
    enableHighAccuracy = true,
    timeout = 15000,
    maximumAge = 10000
  } = options;

  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
    altitude: null,
    speed: null,
    heading: null,
    timestamp: null
  });

  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('prompt'); // 'prompt' | 'granted' | 'denied'

  const watchIdRef = useRef(null);

  // Check browser permission status if supported
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' })
        .then((status) => {
          setPermissionStatus(status.state);
          status.onchange = () => {
            setPermissionStatus(status.state);
          };
        })
        .catch(() => {
          // Permissions API might not support 'geolocation' in some browsers
        });
    }
  }, []);

  // Handle successful position read
  const handleSuccess = useCallback((position) => {
    const { coords, timestamp } = position;
    setCoordinates({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      altitude: coords.altitude,
      speed: coords.speed,
      heading: coords.heading,
      timestamp: timestamp ? new Date(timestamp).toLocaleTimeString() : new Date().toLocaleTimeString()
    });
    setIsLoading(false);
    setError(null);
    setPermissionStatus('granted');
  }, []);

  // Handle geolocation errors (defensive messaging)
  const handleError = useCallback((err) => {
    setIsLoading(false);
    let userMessage = 'Failed to retrieve location.';

    switch (err.code) {
      case 1: // PERMISSION_DENIED
        userMessage = 'Location access was denied. Please allow GPS permissions in your browser.';
        setPermissionStatus('denied');
        break;
      case 2: // POSITION_UNAVAILABLE
        userMessage = 'GPS position unavailable. Ensure your device has location/network active.';
        break;
      case 3: // TIMEOUT
        userMessage = 'Location request timed out while waiting for satellite fix.';
        break;
      default:
        userMessage = err.message || userMessage;
    }

    setError({ code: err.code, message: userMessage });
  }, []);

  // One-time instant location fetch
  const getImmediateLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError({ code: 0, message: 'Geolocation is not supported by your browser.' });
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      { enableHighAccuracy, timeout, maximumAge }
    );
  }, [enableHighAccuracy, timeout, maximumAge, handleSuccess, handleError]);

  // Start continuous watch tracking
  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError({ code: 0, message: 'Geolocation is not supported by your browser.' });
      return;
    }

    setIsLoading(true);
    setIsTracking(true);
    setError(null);

    // Clear any previous active watcher
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      { enableHighAccuracy, timeout, maximumAge }
    );
  }, [enableHighAccuracy, timeout, maximumAge, handleSuccess, handleError]);

  // Stop continuous watch tracking
  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
    setIsLoading(false);
  }, []);

  // Cleanup watcher when component unmounts
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Generate Google Maps & OpenStreetMap links for sharing
  const shareableLinks = {
    googleMaps: coordinates.latitude && coordinates.longitude 
      ? `https://maps.google.com/?q=${coordinates.latitude},${coordinates.longitude}` 
      : '',
    openStreetMap: coordinates.latitude && coordinates.longitude
      ? `https://www.openstreetmap.org/?mlat=${coordinates.latitude}&mlon=${coordinates.longitude}#map=16/${coordinates.latitude}/${coordinates.longitude}`
      : ''
  };

  return {
    coordinates,
    isTracking,
    isLoading,
    error,
    permissionStatus,
    shareableLinks,
    getImmediateLocation,
    startTracking,
    stopTracking
  };
}

export default useGeolocation;
