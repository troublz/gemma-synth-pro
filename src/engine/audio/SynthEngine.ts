import * as Tone from 'tone';
import { type SynthType } from '../../stores/audioStore';
import { getChordNotes } from './ChordMapper';
import { EffectsChain } from './EffectsChain';
import { useAudioStore } from '../../stores/audioStore';
export class SynthEngine {
  private synth: Tone.PolySynth | null = null;
  private filter: Tone.Filter;
  private volume: Tone.Volume;
  private effects: EffectsChain;
  private currentNotes: string[] = [];
  private initialized = false;
  constructor() {
    this.filter = new Tone.Filter(2000, 'lowpass');
    this.volume = new Tone.Volume(-10);
    this.effects = new EffectsChain();
    this.filter.connect(this.volume);
    this.volume.connect(this.effects.getOutput());
  }
  async init(): Promise<void> {
    await Tone.start();
    this.initialized = true;
    this.createSynth('warm');
  }
  private createSynth(type: SynthType): void {
    this.currentNotes = [];
    if (this.synth) { this.synth.disconnect(); this.synth.dispose(); }
    const configs: Record<SynthType, any> = {
      warm: { oscillator: { type: 'triangle' }, envelope: { attack: 0.05, decay: 0.3, sustain: 0.6, release: 0.8 } },
      bright: { oscillator: { type: 'sawtooth' }, envelope: { attack: 0.02, decay: 0.2, sustain: 0.5, release: 0.5 } },
      retro: { oscillator: { type: 'square' }, envelope: { attack: 0.01, decay: 0.4, sustain: 0.4, release: 0.6 } },
      strings: { oscillator: { type: 'fatsawtooth' }, envelope: { attack: 0.3, decay: 0.5, sustain: 0.7, release: 1.2 } },
      horns: { oscillator: { type: 'brass' }, envelope: { attack: 0.1, decay: 0.3, sustain: 0.6, release: 0.7 } },
      bass: { oscillator: { type: 'triangle' }, envelope: { attack: 0.02, decay: 0.3, sustain: 0.7, release: 0.3 } },
      pad: { oscillator: { type: 'sine' }, envelope: { attack: 0.5, decay: 0.8, sustain: 0.8, release: 1.5 } },
      pluck: { oscillator: { type: 'triangle' }, envelope: { attack: 0.001, decay: 0.4, sustain: 0, release: 0.01 } },
    };
    this.synth = new Tone.PolySynth(Tone.Synth, { ...configs[type], maxPolyphony: 8 }).connect(this.filter);
  }
  playChord(): void {
    const store = useAudioStore.getState();
    if (!store.activeNotes.length) return;
    this.currentNotes = store.activeNotes;
    this.synth?.triggerAttack(this.currentNotes);
  }
  releaseAll(): void { this.synth?.releaseAll(); this.currentNotes = []; }
  setSynthType(type: SynthType): void { this.createSynth(type); }
  setFilterCutoff(freq: number): void { this.filter.frequency.rampTo(freq, 0.05); }
  setVolume(vol: number): void { this.volume.volume.rampTo(Tone.gainToDb(vol), 0.05); }
  setEffect(name: string, value: number): void { this.effects.setEffect(name, value); }
  isReady(): boolean { return this.initialized; }
}
