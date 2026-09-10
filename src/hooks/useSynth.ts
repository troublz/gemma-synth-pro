import { useEffect, useRef } from 'react';
import { SynthEngine } from '../engine/audio/SynthEngine';

export function useSynth() {
  const synthRef = useRef<SynthEngine | null>(null);

  useEffect(() => {
    const synth = new SynthEngine();
    synthRef.current = synth;
    synth.init();
    return () => { synth.releaseAll(); };
  }, []);

  return synthRef;
}