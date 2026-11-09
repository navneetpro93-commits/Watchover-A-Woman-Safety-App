/**
 * Fake Call Audio & Speech Synthesis Engine
 * Provides native Web Audio API ringtone generator and bulletproof Web Speech API dialogue simulator.
 * Solves Chromium / Safari voice loading, garbage collection, and pause bugs.
 */

// Ringtone oscillator controller
let audioCtx = null;
let ringInterval = null;
let activeOscillators = [];

// Speech synthesis references (persisted globally to prevent Chromium GC bug)
let activeUtterance = null;
let availableVoices = [];

// Pre-load available system voices asynchronously
function populateVoices() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    availableVoices = window.speechSynthesis.getVoices() || [];
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  populateVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }
}

/**
 * Start simulated smartphone ringing sound using Web Audio API
 */
export function startRingtone() {
  stopRingtone();

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    audioCtx = new AudioContext();

    const playRingCycle = () => {
      if (!audioCtx || audioCtx.state === 'closed') return;

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Dual-tone standard telephone ring (440Hz + 480Hz)
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(480, audioCtx.currentTime);

      // Volume envelope: smooth fade-in and burst
      gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime + 1.6);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start(audioCtx.currentTime);
      osc2.start(audioCtx.currentTime);
      osc1.stop(audioCtx.currentTime + 1.85);
      osc2.stop(audioCtx.currentTime + 1.85);

      activeOscillators = [osc1, osc2];
    };

    // First ring immediately
    playRingCycle();

    // Repeat ring cycle every 3.5 seconds
    ringInterval = setInterval(() => {
      playRingCycle();
    }, 3500);
  } catch (error) {
    console.warn("Unable to initialize ringtone audio context:", error);
  }
}

/**
 * Stop any ongoing ringing sound and clean up audio context
 */
export function stopRingtone() {
  if (ringInterval) {
    clearInterval(ringInterval);
    ringInterval = null;
  }

  activeOscillators.forEach((osc) => {
    try {
      osc.stop();
      osc.disconnect();
    } catch (_) {}
  });
  activeOscillators = [];

  if (audioCtx) {
    try {
      audioCtx.close();
    } catch (_) {}
    audioCtx = null;
  }
}

/**
 * Scripted dialogues and acoustic profiles for caller personas
 */
export const CALLER_SCRIPTS = {
  dad: {
    name: "Dad",
    number: "+91 98112 34567",
    avatarBg: "#1e3a8a",
    gender: "male",
    pitch: 0.85,
    rate: 0.92,
    script: "Beta, where are you right now? I am parked right outside on the main road waiting with the car. Share your live location and come out quickly, I am watching the road."
  },
  police: {
    name: "Inspector Sharma (Dispatch)",
    number: "112 Emergency Patrol",
    avatarBg: "#831843",
    gender: "male",
    pitch: 0.78,
    rate: 0.88,
    script: "Hello, this is Inspector Sharma from the local police patrol unit. We are monitoring your GPS route coordinates. Stay on the line and head towards the well-lit junction, patrol vehicle is nearby."
  },
  mom: {
    name: "Mom",
    number: "+91 98765 43210",
    avatarBg: "#701a75",
    gender: "female",
    pitch: 1.15,
    rate: 0.95,
    script: "Hello beta, where have you reached? Your brother and I are already at the gate waiting. Keep talking to me while you walk, we can see you coming."
  },
  friend: {
    name: "Sneha (Friend)",
    number: "+91 97110 98765",
    avatarBg: "#065f46",
    gender: "female",
    pitch: 1.25,
    rate: 1.0,
    script: "Hey! I am standing right next to the metro station exit. Just keep walking straight toward the light, I am waving at you right now!"
  }
};

/**
 * Find the most suitable voice for caller persona
 * @param {string} gender - 'male' | 'female'
 */
function findBestVoice(gender) {
  if (!availableVoices.length && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    availableVoices = window.speechSynthesis.getVoices() || [];
  }

  if (!availableVoices.length) return null;

  // 1. Check for Indian English voices first if matching persona
  const indianVoices = availableVoices.filter(v => v.lang.includes('IN') || v.lang.includes('en-IN') || v.lang.includes('hi'));
  
  if (gender === 'female') {
    const femaleMatch = availableVoices.find(v => 
      /female|zira|samantha|karen|victoria|moira|veena/i.test(v.name)
    );
    if (femaleMatch) return femaleMatch;
    if (indianVoices.length) return indianVoices[0];
  } else {
    const maleMatch = availableVoices.find(v => 
      /male|david|george|rishi|alex|daniel/i.test(v.name)
    );
    if (maleMatch) return maleMatch;
    if (indianVoices.length) return indianVoices[0];
  }

  // Fallback to any english voice
  const englishVoice = availableVoices.find(v => v.lang.startsWith('en'));
  return englishVoice || availableVoices[0] || null;
}

/**
 * Speak simulated caller dialogue using browser native SpeechSynthesis
 * Resilient against Chrome cancellation drops and voice unready states.
 * 
 * @param {Object|string} callerOrText - Caller profile object or text
 * @param {Function} onStart - Callback when audio actually starts playing
 * @param {Function} onEnd - Callback when speech finishes
 */
export function speakCallerDialogue(callerOrText, onStart, onEnd) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onStart) onStart();
    if (onEnd) onEnd();
    return;
  }

  // Normalize parameters
  let text = '';
  let pitch = 1.0;
  let rate = 0.92;
  let gender = 'male';

  if (typeof callerOrText === 'string') {
    text = callerOrText;
  } else if (callerOrText && typeof callerOrText === 'object') {
    text = callerOrText.script || '';
    pitch = callerOrText.pitch || 1.0;
    rate = callerOrText.rate || 0.92;
    gender = callerOrText.gender || 'male';
  }

  if (!text) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel prior speech & unpause synthesis engine
  try {
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch (_) {}

  // A slight delay prevents Chrome from aborting immediately after cancel()
  setTimeout(() => {
    try {
      // Resume in case browser suspended audio
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.text = text;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 1.0; // Full volume

      // Assign matching voice
      const bestVoice = findBestVoice(gender);
      if (bestVoice) {
        utterance.voice = bestVoice;
        utterance.lang = bestVoice.lang || 'en-US';
      } else {
        utterance.lang = 'en-US';
      }

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        activeUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn("SpeechSynthesis error:", e);
        activeUtterance = null;
        if (onEnd) onEnd();
      };

      // Keep reference on module scope to prevent Chromium garbage collection bug
      activeUtterance = utterance;

      window.speechSynthesis.speak(utterance);

      // Chrome bug workaround: if paused or stuck, force resume after 150ms
      setTimeout(() => {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }, 150);
    } catch (err) {
      console.error("Speech synthesis invocation failed:", err);
      if (onEnd) onEnd();
    }
  }, 80);
}

/**
 * Stop any active caller dialogue
 */
export function stopCallerDialogue() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (_) {}
  }
  activeUtterance = null;
}
