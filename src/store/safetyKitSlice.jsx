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
    recommendedFor: 'Late Night Commuters',
    translations: {
      en: {
        name: 'Personal Safety Siren Keychain (130dB)',
        category: 'Acoustic Defense',
        priority: 'Critical',
        description: 'Ultra-loud emergency siren with integrated LED strobe light to startle attackers and summon help.',
        recommendedFor: 'Late Night Commuters'
      },
      hi: {
        name: 'पर्सनल सेफ्टी सायरन कीचेन (130dB)',
        category: 'ध्वनि सुरक्षा',
        priority: 'अति महत्वपूर्ण',
        description: 'हमलावरों को चौंकाने और तुरंत मदद बुलाने के लिए एलईडी लाइट युक्त 130dB का तेज़ आपातकालीन सायरन।',
        recommendedFor: 'देर रात यात्री'
      },
      pa: {
        name: 'ਨਿੱਜੀ ਸੁਰੱਖਿਆ ਸਾਇਰਨ ਕੀਚੇਨ (130dB)',
        category: 'ਆਵਾਜ਼ ਸੁਰੱਖਿਆ',
        priority: 'ਬਹੁਤ ਜ਼ਰੂਰੀ',
        description: 'ਹਮਲਾਵਰਾਂ ਨੂੰ ਡਰਾਉਣ ਅਤੇ ਤੁਰੰਤ ਮਦਦ ਬੁਲਾਉਣ ਲਈ LED ਲਾਈਟ ਵਾਲਾ 130dB ਦਾ ਤੇਜ਼ ਐਮਰਜੈਂਸੀ ਸਾਇਰਨ।',
        recommendedFor: 'ਦੇਰ ਰਾਤ ਯਾਤਰੀ'
      }
    }
  },
  {
    id: 'gear-2',
    name: 'Self-Defense Pepper Spray (35g Fogger)',
    category: 'Personal Protection',
    priority: 'Critical',
    price: 299,
    description: 'Long-range defensive spray with UV marking dye for immediate protection against physical assault.',
    recommendedFor: 'Solo Travelers',
    translations: {
      en: {
        name: 'Self-Defense Pepper Spray (35g Fogger)',
        category: 'Personal Protection',
        priority: 'Critical',
        description: 'Long-range defensive spray with UV marking dye for immediate protection against physical assault.',
        recommendedFor: 'Solo Travelers'
      },
      hi: {
        name: 'सेल्फ-डिफेंस पेपर स्प्रे (35g फॉगर)',
        category: 'व्यक्तिगत सुरक्षा',
        priority: 'अति महत्वपूर्ण',
        description: 'शारीरिक हमले से तत्काल सुरक्षा और हमलावर की पहचान के लिए यूवी डाई युक्त शक्तिशाली स्प्रे।',
        recommendedFor: 'अकेले यात्रा करने वाले'
      },
      pa: {
        name: 'ਸਵੈ-ਰੱਖਿਆ ਪੇਪਰ ਸਪਰੇਅ (35g ਫੌਗਰ)',
        category: 'ਨਿੱਜੀ ਸੁਰੱਖਿਆ',
        priority: 'ਬਹੁਤ ਜ਼ਰੂਰੀ',
        description: 'ਸਰੀਰਕ ਹਮਲੇ ਤੋਂ ਤੁਰੰਤ ਬਚਾਅ ਅਤੇ ਹਮਲਾਵਰ ਦੀ ਪਛਾਣ ਲਈ ਲੰਬੀ ਦੂਰੀ ਵਾਲਾ ਸੁਰੱਖਿਆ ਸਪਰੇਅ।',
        recommendedFor: 'ਇਕੱਲੇ ਯਾਤਰੀ'
      }
    }
  },
  {
    id: 'gear-3',
    name: 'High-Lumen Tactical LED Torch',
    category: 'Visibility & Illumination',
    priority: 'High',
    price: 499,
    description: 'High-intensity zoomable beam with defensive strobe mode for dark streets and power outages.',
    recommendedFor: 'Walking in Low-Lit Areas',
    translations: {
      en: {
        name: 'High-Lumen Tactical LED Torch',
        category: 'Visibility & Illumination',
        priority: 'High',
        description: 'High-intensity zoomable beam with defensive strobe mode for dark streets and power outages.',
        recommendedFor: 'Walking in Low-Lit Areas'
      },
      hi: {
        name: 'हाई-ल्यूमेन टैक्टिकल एलईडी टॉर्च',
        category: 'दृश्यता एवं रोशनी',
        priority: 'उच्च',
        description: 'अंधेरी गलियों और आपात स्थितियों में रक्षात्मक स्ट्रोब मोड वाली शक्तिशाली ज़ूम टॉर्च।',
        recommendedFor: 'कम रोशनी वाले इलाके'
      },
      pa: {
        name: 'ਹਾਈ-ਲਿਊਮੇਨ ਟੈਕਟੀਕਲ LED ਟਾਰਚ',
        category: 'ਰੌਸ਼ਨੀ ਅਤੇ ਦਿੱਖ',
        priority: 'ਉੱਚ',
        description: 'ਹਨੇਰੀਆਂ ਗਲੀਆਂ ਅਤੇ ਐਮਰਜੈਂਸੀ ਵਿੱਚ ਰੱਖਿਆਤਮਕ ਸਟ੍ਰੋਬ ਮੋਡ ਵਾਲੀ ਸ਼ਕਤੀਸ਼ਾਲੀ ਜ਼ੂਮ ਟਾਰਚ।',
        recommendedFor: 'ਘੱਟ ਰੌਸ਼ਨੀ ਵਾਲੀਆਂ ਥਾਵਾਂ'
      }
    }
  },
  {
    id: 'gear-4',
    name: 'Compact Travel First Aid Medical Kit',
    category: 'Medical Emergency',
    priority: 'High',
    price: 249,
    description: 'Sterile bandages, antiseptic wipes, burn dressing, and medical tape in water-resistant pouch.',
    recommendedFor: 'Everyday Transit',
    translations: {
      en: {
        name: 'Compact Travel First Aid Medical Kit',
        category: 'Medical Emergency',
        priority: 'High',
        description: 'Sterile bandages, antiseptic wipes, burn dressing, and medical tape in water-resistant pouch.',
        recommendedFor: 'Everyday Transit'
      },
      hi: {
        name: 'कॉम्पैक्ट ट्रैवल प्राथमिक चिकित्सा किट',
        category: 'चिकित्सा आपातकाल',
        priority: 'उच्च',
        description: 'वाटर-रेसिस्टेंट पाउच में रोगाणुरहित पट्टियाँ, एंटीसेप्टिक वाइप्स, बर्न ड्रेसिंग और मेडिकल टेप।',
        recommendedFor: 'दैनिक आवागमन'
      },
      pa: {
        name: 'ਕੰਪੈਕਟ ਟਰੈਵਲ ਮੁੱਢਲੀ ਸਹਾਇਤਾ ਕਿੱਟ',
        category: 'ਮੈਡੀਕਲ ਐਮਰਜੈਂਸੀ',
        priority: 'ਉੱਚ',
        description: 'ਵਾਟਰ-ਰੋਧਕ ਪਾਊਚ ਵਿੱਚ ਸਾਫ਼ ਪੱਟੀਆਂ, ਐਂਟੀਸੈਪਟਿਕ ਵਾਈਪਸ, ਅਤੇ ਮੈਡੀਕਲ ਟੇਪ।',
        recommendedFor: 'ਰੋਜ਼ਾਨਾ ਆਵਾਜਾਈ'
      }
    }
  },
  {
    id: 'gear-5',
    name: 'Fast-Charging Slim Power Bank (10,000mAh)',
    category: 'Device Reliability',
    priority: 'Critical',
    price: 899,
    description: 'Ensures smartphone never runs out of battery during transit, GPS tracking, or emergency calls.',
    recommendedFor: 'Daily Commute',
    translations: {
      en: {
        name: 'Fast-Charging Slim Power Bank (10,000mAh)',
        category: 'Device Reliability',
        priority: 'Critical',
        description: 'Ensures smartphone never runs out of battery during transit, GPS tracking, or emergency calls.',
        recommendedFor: 'Daily Commute'
      },
      hi: {
        name: 'फास्ट-चार्जिंग स्लिम पावर बैंक (10,000mAh)',
        category: 'डिवाइस विश्वसनीयता',
        priority: 'अति महत्वपूर्ण',
        description: 'जीपीएस ट्रैकिंग या आपातकालीन कॉल के दौरान स्मार्टफोन की बैटरी खत्म होने से बचाता है।',
        recommendedFor: 'दैनिक सफर'
      },
      pa: {
        name: 'ਫਾਸਟ-ਚਾਰਜਿੰਗ ਸਲਿਮ ਪਾਵਰ ਬੈਂਕ (10,000mAh)',
        category: 'ਡਿਵਾਈਸ ਭਰੋਸੇਯੋਗਤਾ',
        priority: 'ਬਹੁਤ ਜ਼ਰੂਰੀ',
        description: 'GPS ਟਰੈਕਿੰਗ ਜਾਂ ਐਮਰਜੈਂਸੀ ਕਾਲਾਂ ਦੌਰਾਨ ਫ਼ੋਨ ਦੀ ਬੈਟਰੀ ਚਾਲੂ ਰੱਖਦਾ ਹੈ।',
        recommendedFor: 'ਰੋਜ਼ਾਨਾ ਸਫ਼ਰ'
      }
    }
  },
  {
    id: 'gear-6',
    name: 'Stainless Steel Dual-Tone Survival Whistle',
    category: 'Acoustic Defense',
    priority: 'Medium',
    price: 149,
    description: 'Weatherproof high-pitch whistle audible up to 1km without requiring batteries or power.',
    recommendedFor: 'Outdoor & Crowded Areas',
    translations: {
      en: {
        name: 'Stainless Steel Dual-Tone Survival Whistle',
        category: 'Acoustic Defense',
        priority: 'Medium',
        description: 'Weatherproof high-pitch whistle audible up to 1km without requiring batteries or power.',
        recommendedFor: 'Outdoor & Crowded Areas'
      },
      hi: {
        name: 'स्टेनलेस स्टील ड्यूल-टोन सर्वाइवल सीटी',
        category: 'ध्वनि सुरक्षा',
        priority: 'मध्यम',
        description: 'बिना बैटरी के 1 किमी तक सुनाई देने वाली मौसम-रोधी तेज़ आवाज़ वाली सुरक्षा सीटी।',
        recommendedFor: 'बाहरी एवं भीड़भाड़ वाले इलाके'
      },
      pa: {
        name: 'ਸਟੇਨਲੈਸ ਸਟੀਲ ਡਿਊਲ-ਟੋਨ ਸਰਵਾਈਵਲ ਸੀਟੀ',
        category: 'ਆਵਾਜ਼ ਸੁਰੱਖਿਆ',
        priority: 'ਦਰਮਿਆਨਾ',
        description: 'ਬਿਨਾਂ ਬੈਟਰੀ ਦੇ 1 ਕਿਲੋਮੀਟਰ ਤੱਕ ਸੁਣਾਈ ਦੇਣ ਵਾਲੀ ਉੱਚੀ ਆਵਾਜ਼ ਵਾਲੀ ਸੀਟੀ।',
        recommendedFor: 'ਬਾਹਰੀ ਅਤੇ ਭੀੜ ਵਾਲੇ ਖੇਤਰ'
      }
    }
  },
  {
    id: 'gear-7',
    name: 'Portable Hotel Door Jammer & Alarm',
    category: 'Accommodation Safety',
    priority: 'High',
    price: 599,
    description: 'Reinforced metal barrier wedge with vibration alarm for dormitories, hotels, and rentals.',
    recommendedFor: 'Hostel & Hotel Stays',
    translations: {
      en: {
        name: 'Portable Hotel Door Jammer & Alarm',
        category: 'Accommodation Safety',
        priority: 'High',
        description: 'Reinforced metal barrier wedge with vibration alarm for dormitories, hotels, and rentals.',
        recommendedFor: 'Hostel & Hotel Stays'
      },
      hi: {
        name: 'पोर्टेबल होटल डोर जैमर एवं अलार्म',
        category: 'आवास सुरक्षा',
        priority: 'उच्च',
        description: 'हॉस्टल, होटल और किराए के कमरों के लिए कंपन अलार्म युक्त मजबूत मेटल डोर बैरियर।',
        recommendedFor: 'हॉस्टल और होटल प्रवास'
      },
      pa: {
        name: 'ਪੋਰਟੇਬਲ ਹੋਟਲ ਡੋਰ ਜੈਮਰ ਅਤੇ ਅਲਾਰਮ',
        category: 'ਰਿਹਾਇਸ਼ ਸੁਰੱਖਿਆ',
        priority: 'ਉੱਚ',
        description: 'ਹੋਸਟਲਾਂ ਅਤੇ ਹੋਟਲਾਂ ਲਈ ਵਾਈਬ੍ਰੇਸ਼ਨ ਅਲਾਰਮ ਵਾਲਾ ਮਜ਼ਬੂਤ ਮੈਟਲ ਡੋਰ ਲਾਕ।',
        recommendedFor: 'ਹੋਸਟਲ ਅਤੇ ਹੋਟਲ ਠਹਿਰਾਅ'
      }
    }
  },
  {
    id: 'gear-8',
    name: 'RFID Blocking Privacy Card Sleeve',
    category: 'Digital Security',
    priority: 'Medium',
    price: 99,
    description: 'Blocks unauthorized contactless scanning and digital skimming of debit, credit, and ID cards.',
    recommendedFor: 'Metro & Public Transit',
    translations: {
      en: {
        name: 'RFID Blocking Privacy Card Sleeve',
        category: 'Digital Security',
        priority: 'Medium',
        description: 'Blocks unauthorized contactless scanning and digital skimming of debit, credit, and ID cards.',
        recommendedFor: 'Metro & Public Transit'
      },
      hi: {
        name: 'आरएफआईडी ब्लॉकिंग प्राइवेसी कार्ड स्लीव',
        category: 'डिजिटल सुरक्षा',
        priority: 'मध्यम',
        description: 'डेबिट, क्रेडिट और पहचान पत्रों की अनधिकृत वायरलेस स्कैनिंग और डिजिटल चोरी को रोकता है।',
        recommendedFor: 'मेट्रो एवं सार्वजनिक परिवहन'
      },
      pa: {
        name: 'RFID ਬਲਾਕਿੰਗ ਪ੍ਰਾਈਵੇਸੀ ਕਾਰਡ ਸਲੀਵ',
        category: 'ਡਿਜੀਟਲ ਸੁਰੱਖਿਆ',
        priority: 'ਦਰਮਿਆਨਾ',
        description: 'ਡੈਬਿਟ, ਕ੍ਰੈਡਿਟ ਅਤੇ ਸ਼ਨਾਖਤੀ ਕਾਰਡਾਂ ਦੀ ਗੈਰ-ਕਾਨੂੰਨੀ ਸਕੈਨਿੰਗ ਤੋਂ ਬਚਾਉਂਦਾ ਹੈ।',
        recommendedFor: 'ਮੈਟਰੋ ਅਤੇ ਜਨਤਕ ਆਵਾਜਾਈ'
      }
    }
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

const savedLanguage = typeof window !== 'undefined' && window.localStorage 
  ? (localStorage.getItem('watchover_lang') || 'en') 
  : 'en';

const initialState = {
  catalog: initialCatalog,
  // User's active safety kit starts empty until user selects items
  items: [],
  // Saved history records of previous emergency kits
  savedKitsHistory: initialSavedHistory,
  filterCategory: 'All',
  // Active UI & Catalog language ('en', 'hi', 'pa')
  language: savedLanguage
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
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('watchover_lang', action.payload);
      }
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
  setFilterCategory,
  setLanguage
} = safetyKitSlice.actions;

// Export Selectors for useSelector consumption
export const selectCatalog = (state) => state.safetyKit.catalog;
export const selectKitItems = (state) => state.safetyKit.items;
export const selectSavedKitsHistory = (state) => state.safetyKit.savedKitsHistory;
export const selectFilterCategory = (state) => state.safetyKit.filterCategory;
export const selectLanguage = (state) => state.safetyKit.language || 'en';
export const selectTotalQuantity = (state) =>
  state.safetyKit.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalCost = (state) =>
  state.safetyKit.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectPackedCount = (state) =>
  state.safetyKit.items.filter((item) => item.isPacked).length;

export default safetyKitSlice.reducer;
