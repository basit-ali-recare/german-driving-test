import { useState, useCallback, useEffect, useRef } from 'react';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const getGermanVoice = useCallback(() => {
    // Prefer German voices, especially from Google
    const germanVoice = voices.find(
      (voice) => 
        voice.lang.startsWith('de') && 
        (voice.name.includes('Google') || voice.name.includes('Anna') || voice.name.includes('Petra'))
    );
    return germanVoice || voices.find((voice) => voice.lang.startsWith('de')) || null;
  }, [voices]);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    const germanVoice = getGermanVoice();
    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    utterance.lang = 'de-DE';
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  }, [getGermanVoice]);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, voices };
}

