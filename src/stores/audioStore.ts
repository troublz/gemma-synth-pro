import { create } from 'zustand';
export type SynthType = 'warm' | 'bright' | 'retro' | 'strings' | 'horns' | 'bass' | 'pad' | 'pluck';
export type ScaleType = 'major' | 'minor' | 'pentatonic' | 'blues' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian';
export interface AudioState {
  synthType: SynthType;
  scale: ScaleType;
  rootNote: string;
  octave: number;
  volume: number;
  filterCutoff: number;
  activeChord: string | null;
  activeNotes: string[];
  isPlaying: boolean;
  effects: { reverb: number; delay: number; chorus: number; distortion: number };
  setSynthType: (t: SynthType) => void;
  setScale: (s: ScaleType) => void;
  setRootNote: (n: string) => void;
  setOctave: (o: number) => void;
  setVolume: (v: number) => void;
  setFilterCutoff: (f: number) => void;
  setActiveChord: (c: string | null, notes: string[]) => void;
  setPlaying: (p: boolean) => void;
  setEffect: (name: keyof AudioState['effects'], value: number) => void;
}
export const useAudioStore = create<AudioState>((set) => ({
  synthType: 'warm', scale: 'major', rootNote: 'C', octave: 4,
  volume: 0.8, filterCutoff: 2000, activeChord: null, activeNotes: [],
  isPlaying: false, effects: { reverb: 0.2, delay: 0, chorus: 0, distortion: 0 },
  setSynthType: (t) => set({ synthType: t }),
  setScale: (s) => set({ scale: s }),
  setRootNote: (n) => set({ rootNote: n }),
  setOctave: (o) => set({ octave: o }),
  setVolume: (v) => set({ volume: v }),
  setFilterCutoff: (f) => set({ filterCutoff: f }),
  setActiveChord: (c, notes) => set({ activeChord: c, activeNotes: notes }),
  setPlaying: (p) => set({ isPlaying: p }),
  setEffect: (name, value) => set((s) => ({ effects: { ...s.effects, [name]: value } })),
}));
