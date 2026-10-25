import { createSlice } from '@reduxjs/toolkit';

/**
 * Safety Kit Slice (Redux Toolkit - CE2 Syllabus)
 * Manages the global Shopping Cart / Travel Safety Kit state:
 * - Gear Catalog (recommended protective equipment)
 * - User's active Safety Kit (items, quantity, packed checklist status)
 * - Actions: addToKit, removeFromKit, incrementQuantity, decrementQuantity, togglePackedStatus, clearKit
 */
const initialCatalog = [
  {
    id: 'gear-1',
    name: 'Personal Safety Siren Keychain (130dB)',
    category: 'Acoustic Defense',
    priority: 'Critical',
    price: 349,
    description: 'Ultra-loud emergency siren with integrated LED strobe light to startle attackers and summon help.',
    recommendedFor: 'Late Night Commuters'
  },
  {
    id: 'gear-2',
    name: 'Self-Defense Pepper Spray (35g Fogger)',
    category: 'Personal Protection',
    priority: 'Critical',
    price: 299,
    description: 'Long-range defensive spray with UV marking dye for immediate protection against physical assault.',
    recommendedFor: 'Solo Travelers'
  },
  {
    id: 'gear-3',
    name: 'High-Lumen Tactical LED Torch',
    category: 'Visibility & Illumination',
    priority: 'High',
    price: 499,
    description: 'High-intensity zoomable beam with defensive strobe mode for dark streets and power outages.',
    recommendedFor: 'Walking in Low-Lit Areas'
  },
  {
    id: 'gear-4',
    name: 'Compact Travel First Aid Medical Kit',
    category: 'Medical Emergency',
    priority: 'High',
    price: 249,
    description: 'Sterile bandages, antiseptic wipes, burn dressing, and medical tape in water-resistant pouch.',
    recommendedFor: 'Everyday Transit'
  },
  {
    id: 'gear-5',
    name: 'Fast-Charging Slim Power Bank (10,000mAh)',
    category: 'Device Reliability',
    priority: 'Critical',
    price: 899,
    description: 'Ensures smartphone never runs out of battery during transit, GPS tracking, or emergency calls.',
    recommendedFor: 'Daily Commute'
  },
  {
    id: 'gear-6',
    name: 'Stainless Steel Dual-Tone Survival Whistle',
    category: 'Acoustic Defense',
    priority: 'Medium',
    price: 149,
    description: 'Weatherproof high-pitch whistle audible up to 1km without requiring batteries or power.',
    recommendedFor: 'Outdoor & Crowded Areas'
  },
  {
    id: 'gear-7',
    name: 'Portable Hotel Door Jammer & Alarm',
    category: 'Accommodation Safety',
    priority: 'High',
    price: 599,
    description: 'Reinforced metal barrier wedge with vibration alarm for dormitories, hotels, and rentals.',
    recommendedFor: 'Hostel & Hotel Stays'
  },
  {
    id: 'gear-8',
    name: 'RFID Blocking Privacy Card Sleeve',
    category: 'Digital Security',
    priority: 'Medium',
    price: 99,
    description: 'Blocks unauthorized contactless scanning and digital skimming of debit, credit, and ID cards.',
    recommendedFor: 'Metro & Public Transit'
  }
];

const initialSavedHistory = [
  {
    id: 'kit-hist-1',
    name: 'Late-Night Metro & Commute Kit',
    savedAt: '24 Oct 2026, 08:30 PM',
    items: [
      { id: 'gear-1', name: 'Personal Safety Siren Keychain (130dB)', price: 349, quantity: 1, isPacked: true },
      { id: 'gear-2', name: 'Self-Defense Pepper Spray (35g Fogger)', price: 299, quantity: 1, isPacked: true },
      { id: 'gear-5', name: 'Fast-Charging Slim Power Bank (10,000mAh)', price: 899, quantity: 1, isPacked: true }
    ],
    totalQuantity: 3,
    totalCost: 1547,
    packedCount: 3
  },
  {
    id: 'kit-hist-2',
    name: 'Solo Travel & Hostel Security Pack',
    savedAt: '21 Oct 2026, 11:15 AM',
    items: [
      { id: 'gear-1', name: 'Personal Safety Siren Keychain (130dB)', price: 349, quantity: 1, isPacked: true },
      { id: 'gear-4', name: 'Compact Travel First Aid Medical Kit', price: 249, quantity: 1, isPacked: true },
      { id: 'gear-7', name: 'Portable Hotel Door Jammer & Alarm', price: 599, quantity: 1, isPacked: false }
    ],
    totalQuantity: 3,
    totalCost: 1197,
    packedCount: 2
  }
];

const initialState = {
  catalog: initialCatalog,
  // User's active safety kit starts empty until user selects items
  items: [],
  // Saved history records of previous emergency kits
  savedKitsHistory: initialSavedHistory,
  filterCategory: 'All'
};

export const safetyKitSlice = createSlice({
  name: 'safetyKit',
  initialState,
  reducers: {
    addToKit: (state, action) => {
      const itemToAdd = action.payload;
      const existingItem = state.items.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...itemToAdd,
          quantity: 1,
          isPacked: false
        });
      }
    },
    removeFromKit: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((i) => i.id === itemId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== itemId);
        }
      }
    },
    togglePackedStatus: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((i) => i.id === itemId);
      if (item) {
        item.isPacked = !item.isPacked;
      }
    },
    clearKit: (state) => {
      state.items = [];
    },
    saveCurrentKit: (state, action) => {
      if (state.items.length === 0) return;
      const customName = action.payload?.name || `Emergency Kit #${state.savedKitsHistory.length + 1}`;
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      const newHistoryEntry = {
        id: `kit-hist-${Date.now()}`,
        name: customName,
        savedAt: `${dateStr}, ${timeStr}`,
        items: JSON.parse(JSON.stringify(state.items)),
        totalQuantity: state.items.reduce((total, item) => total + item.quantity, 0),
        totalCost: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
        packedCount: state.items.filter((item) => item.isPacked).length
      };

      state.savedKitsHistory.unshift(newHistoryEntry);
    },
    restoreSavedKit: (state, action) => {
      const historyId = action.payload;
      const targetHistory = state.savedKitsHistory.find((entry) => entry.id === historyId);
      if (targetHistory && targetHistory.items) {
        state.items = JSON.parse(JSON.stringify(targetHistory.items));
      }
    },
    deleteSavedKit: (state, action) => {
      const historyId = action.payload;
      state.savedKitsHistory = state.savedKitsHistory.filter((entry) => entry.id !== historyId);
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    }
  }
});

// Export Action Creators
export const {
  addToKit,
  removeFromKit,
  incrementQuantity,
  decrementQuantity,
  togglePackedStatus,
  clearKit,
  saveCurrentKit,
  restoreSavedKit,
  deleteSavedKit,
  setFilterCategory
} = safetyKitSlice.actions;

// Export Selectors for useSelector consumption
export const selectCatalog = (state) => state.safetyKit.catalog;
export const selectKitItems = (state) => state.safetyKit.items;
export const selectSavedKitsHistory = (state) => state.safetyKit.savedKitsHistory;
export const selectFilterCategory = (state) => state.safetyKit.filterCategory;
export const selectTotalQuantity = (state) =>
  state.safetyKit.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalCost = (state) =>
  state.safetyKit.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectPackedCount = (state) =>
  state.safetyKit.items.filter((item) => item.isPacked).length;

export default safetyKitSlice.reducer;
