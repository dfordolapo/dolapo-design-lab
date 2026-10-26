import { useCallback, useRef } from 'react'

// Web Audio API Context (Singleton so we don't hit limits)
let audioCtx = null;
const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export default function useSoundEffects() {
  const humOscillatorRef = useRef(null);
  const humGainRef = useRef(null);

  // Soft UI Tick (Hover)
  const playHover = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn('Audio playHover failed', e);
    }
  }, []);

  // Confirmation Chime (Click)
  const playClick = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      console.warn('Audio playClick failed', e);
    }
  }, []);

  // Power On Sweep (Loading Complete)
  const playPowerOn = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(50, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.8);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.4);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
      
      // Lowpass filter to muffle the sawtooth into a deep bass sweep
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(2000, ctx.currentTime + 0.8);
      
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.0);
    } catch (e) {
      console.warn('Audio playPowerOn failed', e);
    }
  }, []);

  // Mechanical Swoosh (Doors Open)
  const playDoors = useCallback(() => {
    try {
      const ctx = getAudioContext();
      
      // White noise generator
      const bufferSize = ctx.sampleRate * 2.0; // 2 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.2); // swell
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5); // fade
      
      // Bandpass filter to make the noise sound like compressed air/hydraulics
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 1.0);
      
      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      noise.start();
    } catch (e) {
      console.warn('Audio playDoors failed', e);
    }
  }, []);

  // Elevator Ascending Hum
  const startHum = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (humOscillatorRef.current) return; // already humming
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(60, ctx.currentTime);
      // slowly rise pitch
      osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + 4.0);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 1.0); // fade in hum
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      
      humOscillatorRef.current = osc;
      humGainRef.current = gainNode;
    } catch (e) {
      console.warn('Audio startHum failed', e);
    }
  }, []);

  const stopHum = useCallback(() => {
    try {
      if (!humOscillatorRef.current || !humGainRef.current) return;
      const ctx = getAudioContext();
      
      // fade out hum
      humGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      humGainRef.current.gain.setValueAtTime(humGainRef.current.gain.value, ctx.currentTime);
      humGainRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      
      humOscillatorRef.current.stop(ctx.currentTime + 0.5);
      
      humOscillatorRef.current = null;
      humGainRef.current = null;
    } catch (e) {
      console.warn('Audio stopHum failed', e);
    }
  }, []);

  // Elevator Arrival Ding
  const playDing = useCallback(() => {
    try {
      const ctx = getAudioContext();
      
      // First Tone (C6)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1046.50, ctx.currentTime);
      gain1.gain.setValueAtTime(0.2, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.5);
      
      // Second Tone (E6) delayed slightly
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.15);
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.8);
      
    } catch (e) {
      console.warn('Audio playDing failed', e);
    }
  }, []);

  return {
    playHover,
    playClick,
    playPowerOn,
    playDoors,
    startHum,
    stopHum,
    playDing
  };
}
