export type SynthType = 'warm' | 'bright' | 'retro' | 'strings' | 'horns' | 'bass' | 'pad' | 'pluck';
export type ScaleType = 'major' | 'minor' | 'pentatonic' | 'blues' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian';
export type EffectName = 'reverb' | 'delay' | 'chorus' | 'distortion';
export interface ChordResult { notes: string[]; chordName: string; }
export interface SynthConfig { type: SynthType; scale: ScaleType; rootNote: string; octave: number; volume: number; filterCutoff: number; effects: Record<EffectName, number>; }