/**
 * Fake Call Audio & Speech Synthesis Engine
 * Provides native Web Audio API ringtone generator and Web Speech API dialogue simulator.
 * Requires 0 external audio assets and works completely offline.
 */

// Ringtone oscillator controller
let audioCtx = null;
let ringInterval = null;
let activeOscillators = [];

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
      gainNode.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.25, audioCtx.currentTime + 1.6);
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

    // Repeat ring cycle every 3.5 seconds (standard telecom ring cadence)
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
 * Scripted dialogues for different fake caller profiles
 */
export const CALLER_SCRIPTS = {
  dad: {
    name: "Dad",
    number: "+91 98112 34567",
    avatarBg: "#1e3a8a",
    script: "Beta, where are you right now? I am parked right outside on the main road waiting with the car. Share your live location and come out quickly, I'm watching the road."
  },
  police: {
    name: "Inspector Sharma (Dispatch)",
    number: "112 Emergency Patrol",
    avatarBg: "#831843",
    script: "Hello, this is Inspector Sharma from the local patrol unit. We are monitoring your GPS route coordinates. Stay on the line and head towards the well-lit junction, patrol vehicle is nearby."
  },
  mom: {
    name: "Mom",
    number: "+91 98765 43210",
    avatarBg: "#701a75",
    script: "Hello beta, where have you reached? Your brother and I are already at the gate waiting. Keep talking to me while you walk, we can see you coming."
  },
  friend: {
    name: "Sneha (Friend)",
    number: "+91 97110 98765",
    avatarBg: "#065f46",
    script: "Hey! I am standing right next to the metro station exit. Just keep walking straight toward the light, I'm waving at you right now!"
  }
};

/**
 * Speak simulated caller dialogue using browser native SpeechSynthesis
 * @param {string} text - Dialogue to vocalize
 * @param {Function} onEnd - Callback when speech finishes
 */
export function speakCallerDialogue(text, onEnd) {
  stopCallerDialogue();

  if (!('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95; // Natural spoken pace
  utterance.pitch = 1.0;
  utterance.lang = 'en-IN'; // Indian English cadence if supported, fallback to default

  // Prefer a natural voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.lang.includes('IN') || v.lang.includes('en'));
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn("Speech synthesis error:", e);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

/**
 * Stop any active caller dialogue
 */
export function stopCallerDialogue() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
