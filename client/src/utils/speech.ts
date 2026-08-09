import type { Language } from '../types';

export function speakText(text: string, lang: Language) {
  if (!('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language voice code
  if (lang === 'si') {
    utterance.lang = 'si-LK';
  } else if (lang === 'ta') {
    utterance.lang = 'ta-LK';
  } else {
    utterance.lang = 'en-US';
  }

  utterance.rate = 0.9; // Slightly slower speed for senior readability
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
