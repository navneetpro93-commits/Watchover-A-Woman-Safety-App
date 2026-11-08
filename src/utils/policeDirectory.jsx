/**
 * Police Stations Directory & Geodesic Distance Calculation Engine
 * Demonstrates Syllabus Topics:
 * - Lectures 25-36: Mathematical Algorithms, ES6+ Array transformations & Computations
 * - Lectures 61-72: Reusable utility modules and data structures
 * - Lectures 85-90: Third-Party Geolocation Integration & Emergency Dispatch Algorithms
 */

/**
 * Haversine Formula: Calculates the great-circle distance between two GPS coordinates in kilometers.
 * d = 2 * R * asin(sqrt(sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlon/2)))
 * 
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in kilometers (rounded to 2 decimal places)
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;

  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's mean radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const rLat1 = toRad(lat1);
  const rLat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

/**
 * Regional Police Stations & 24x7 Women Safety Help Desks Registry
 * Each facility contains GPS coordinates, contact phone numbers, jurisdiction, and address.
 */
export const POLICE_STATIONS_DIRECTORY = [
  {
    id: 'ps-central',
    name: 'Central District Police Headquarters & Women Cell',
    type: 'District Headquarters',
    phone: '011-23261377',
    altPhone: '112',
    latitude: 28.6431,
    longitude: 77.2197,
    address: 'Daryaganj, Central Zone, New Delhi',
    hasWomenHelpDesk: true,
    avgResponseMinutes: 6
  },
  {
    id: 'ps-connaught',
    name: 'Connaught Place Police Station',
    type: 'Special Response Unit',
    phone: '011-23745100',
    altPhone: '112',
    latitude: 28.6315,
    longitude: 77.2167,
    address: 'Outer Circle, Connaught Place, New Delhi',
    hasWomenHelpDesk: true,
    avgResponseMinutes: 5
  },
  {
    id: 'ps-south',
    name: 'Hauz Khas Police Station & Special Women Squad',
    type: 'Rapid Action Station',
    phone: '011-26568100',
    altPhone: '112',
    latitude: 28.5494,
    longitude: 77.2001,
    address: 'Aurobindo Marg, Hauz Khas, New Delhi',
    hasWomenHelpDesk: true,
    avgResponseMinutes: 7
  },
  {
    id: 'ps-north',
    name: 'Civil Lines Police Station',
    type: 'Sub-Divisional Station',
    phone: '011-23812100',
    altPhone: '112',
    latitude: 28.6814,
    longitude: 77.2227,
    address: 'Rajpur Road, Civil Lines, North Zone',
    hasWomenHelpDesk: true,
    avgResponseMinutes: 8
  },
  {
    id: 'ps-cyber',
    name: 'Women & Cyber Crime Specialized Police Station',
    type: 'Cyber & Women Specialized',
    phone: '1930',
    altPhone: '011-20892600',
    latitude: 28.5708,
    longitude: 77.2285,
    address: 'Police Complex, Sector 7, South Central Zone',
    hasWomenHelpDesk: true,
    avgResponseMinutes: 5
  },
  {
    id: 'ps-west',
    name: 'Rajouri Garden Police Station',
    type: 'Sub-Divisional Station',
    phone: '011-25442100',
    altPhone: '112',
    latitude: 28.6415,
    longitude: 77.1218,
    address: 'Major Sudesh Kumar Marg, Rajouri Garden',
    hasWomenHelpDesk: true,
    avgResponseMinutes: 8
  },
  {
    id: 'ps-east',
    name: 'Preet Vihar Police Station & Women Desk',
    type: 'Sub-Divisional Station',
    phone: '011-22522100',
    altPhone: '112',
    latitude: 28.6418,
    longitude: 77.2946,
    address: 'Vikas Marg, Preet Vihar, East Zone',
    hasWomenHelpDesk: true,
    avgResponseMinutes: 7
  }
];

/**
 * Finds and ranks nearest police stations based on user's live coordinates.
 * If user coordinates are outside coverage or not yet locked, computes relative to active or fallback station.
 * 
 * @param {number} userLat - User current latitude
 * @param {number} userLon - User current longitude
 * @param {number} limit - Number of nearest stations to return (default: 3)
 * @returns {Array} List of stations sorted by ascending distance (km)
 */
export function getRankedPoliceStations(userLat, userLon, limit = 3) {
  if (!userLat || !userLon) {
    // Fallback when GPS fix is still acquiring
    return POLICE_STATIONS_DIRECTORY.slice(0, limit).map((station) => ({
      ...station,
      distanceKm: null,
      distanceFormatted: 'Location pending'
    }));
  }

  // Calculate geodesic distance to every registered station and sort ascending
  const ranked = POLICE_STATIONS_DIRECTORY.map((station) => {
    const dist = calculateDistanceKm(userLat, userLon, station.latitude, station.longitude);
    return {
      ...station,
      distanceKm: dist,
      distanceFormatted: dist !== null ? `${dist} km away` : 'Estimating...'
    };
  }).sort((a, b) => (a.distanceKm || 999999) - (b.distanceKm || 999999));

  return ranked.slice(0, limit);
}

/**
 * Returns the single nearest police station.
 * 
 * @param {number} userLat - User current latitude
 * @param {number} userLon - User current longitude
 * @returns {Object} Nearest police station object with distanceKm
 */
export function getNearestPoliceStation(userLat, userLon) {
  const ranked = getRankedPoliceStations(userLat, userLon, 1);
  return ranked[0] || POLICE_STATIONS_DIRECTORY[0];
}
