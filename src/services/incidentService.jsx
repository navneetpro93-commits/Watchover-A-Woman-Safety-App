/**
 * Incident Service Layer (Mock REST API Engine)
 * Demonstrates Syllabus Topics:
 * - Lectures 25-36: JavaScript ES6+ Async/Await, Promises, and REST API Simulation
 * - Lectures 37-48: Browser Storage (localStorage persistence under 'watchover_incidents')
 * - Lectures 85-90: Async State, Loading/Error Handlers, and Full CRUD Workflows (Create, Read, Update, Delete)
 */

const STORAGE_KEY = 'watchover_incidents';

// Initial verified safety incident seeds
const INITIAL_INCIDENTS_SEED = [
  {
    id: 'inc-101',
    title: 'Non-Functional Streetlights on Metro Walkway',
    category: 'Poor Street Lighting',
    severity: 'Medium',
    location: 'Metro Station Exit 3 to Commercial Hub',
    latitude: 28.6328,
    longitude: 77.2195,
    description: 'Over 6 streetlights have been burnt out for the past 3 days. Commuters walking after 8:30 PM are forced into pitch darkness.',
    reportedBy: 'Ananya S.',
    reportedAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
    verifiedCount: 14,
    status: 'ACTIVE'
  },
  {
    id: 'inc-102',
    title: 'Persistent Stalking & Harassment near Auto Stand',
    category: 'Harassment Hotspot',
    severity: 'Critical',
    location: 'Outer Ring Road Bus Terminal',
    latitude: 28.5489,
    longitude: 77.2023,
    description: 'Group of unidentified men loitering near unlit tea stall catcalling commuters. Police PCR van requested during peak evening hours.',
    reportedBy: 'Pooja V.',
    reportedAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
    verifiedCount: 29,
    status: 'ACTIVE'
  },
  {
    id: 'inc-103',
    title: 'Secluded Pedestrian Subway Underpass',
    category: 'Secluded Area',
    severity: 'High',
    location: 'Subway Link 2, Sector 14 Underpass',
    latitude: 28.6415,
    longitude: 77.1235,
    description: 'CCTV camera appears non-functional and broken glass is scattered. Avoid passing alone after dusk; use ground zebra crossing instead.',
    reportedBy: 'Kavita M.',
    reportedAt: new Date(Date.now() - 3600000 * 28).toISOString(), // 28 hours ago
    verifiedCount: 19,
    status: 'ACTIVE'
  },
  {
    id: 'inc-104',
    title: 'Suspicious Vehicle Parked at Unlit Alleyway',
    category: 'Suspicious Activity',
    severity: 'High',
    location: 'Behind Central Library Street',
    latitude: 28.6821,
    longitude: 77.2210,
    description: 'Tinted white van stationed for over 4 hours with engine idling. Nearby women hostel students alerted warden.',
    reportedBy: 'Ritu K.',
    reportedAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    verifiedCount: 22,
    status: 'ACTIVE'
  }
];

// Helper to load incidents with localStorage hydration
function getLocalStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_INCIDENTS_SEED));
      return INITIAL_INCIDENTS_SEED;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse incidents from localStorage:', err);
    return INITIAL_INCIDENTS_SEED;
  }
}

// Helper to save incidents to localStorage
function saveLocalStore(incidents) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
  } catch (err) {
    console.error('Failed to save incidents to localStorage:', err);
  }
}

// Simulated network latency helper (Promises + Async)
function simulateNetworkDelay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Incident API Service Methods
 */
export const incidentService = {
  /**
   * READ: Fetch all reported incidents with optional category & keyword filtering
   * @param {Object} filters
   * @param {string} filters.category - Filter by specific category or 'All'
   * @param {string} filters.searchQuery - Keyword search in title/location/description
   * @param {string} filters.severity - Filter by severity level
   */
  async getIncidents(filters = {}) {
    await simulateNetworkDelay(450); // Simulate asynchronous server trip

    let list = getLocalStore();

    if (filters.category && filters.category !== 'All') {
      list = list.filter((inc) => inc.category === filters.category);
    }

    if (filters.severity && filters.severity !== 'All') {
      list = list.filter((inc) => inc.severity === filters.severity);
    }

    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      list = list.filter(
        (inc) =>
          inc.title.toLowerCase().includes(q) ||
          inc.location.toLowerCase().includes(q) ||
          inc.description.toLowerCase().includes(q)
      );
    }

    // Sort newest reports first
    return list.sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt));
  },

  /**
   * READ: Fetch single incident details by ID
   * @param {string} id
   */
  async getIncidentById(id) {
    await simulateNetworkDelay(250);
    const list = getLocalStore();
    const found = list.find((inc) => inc.id === id);
    if (!found) {
      throw new Error(`Incident #${id} not found.`);
    }
    return found;
  },

  /**
   * CREATE: Post a new community safety report
   * @param {Object} data - Incident payload
   */
  async createIncident(data) {
    await simulateNetworkDelay(500);

    // Defensive validation
    if (!data.title || !data.title.trim()) {
      throw new Error('Incident title is required.');
    }
    if (!data.location || !data.location.trim()) {
      throw new Error('Location is required.');
    }
    if (!data.description || !data.description.trim()) {
      throw new Error('Description is required.');
    }

    const newIncident = {
      id: `inc-${Date.now()}`,
      title: data.title.trim(),
      category: data.category || 'Suspicious Activity',
      severity: data.severity || 'Medium',
      location: data.location.trim(),
      latitude: data.latitude ? parseFloat(data.latitude) : 28.6139,
      longitude: data.longitude ? parseFloat(data.longitude) : 77.2090,
      description: data.description.trim(),
      reportedBy: data.reportedBy || 'WatchOver Member',
      reportedAt: new Date().toISOString(),
      verifiedCount: 1,
      status: 'ACTIVE'
    };

    const currentList = getLocalStore();
    const updatedList = [newIncident, ...currentList];
    saveLocalStore(updatedList);

    return newIncident;
  },

  /**
   * UPDATE: Increment verification count ("I also noticed this")
   * @param {string} id
   */
  async verifyIncident(id) {
    await simulateNetworkDelay(300);
    const list = getLocalStore();
    let updated = null;

    const newList = list.map((inc) => {
      if (inc.id === id) {
        updated = { ...inc, verifiedCount: (inc.verifiedCount || 1) + 1 };
        return updated;
      }
      return inc;
    });

    if (!updated) {
      throw new Error(`Cannot verify incident #${id}: Not found.`);
    }

    saveLocalStore(newList);
    return updated;
  },

  /**
   * DELETE: Remove an incident report
   * @param {string} id
   */
  async deleteIncident(id) {
    await simulateNetworkDelay(400);
    const list = getLocalStore();
    const exists = list.some((inc) => inc.id === id);

    if (!exists) {
      throw new Error(`Cannot delete incident #${id}: Record does not exist.`);
    }

    const filtered = list.filter((inc) => inc.id !== id);
    saveLocalStore(filtered);
    return { success: true, id };
  }
};

export default incidentService;
