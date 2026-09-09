import { type ScaleType } from '../../stores/audioStore';
const SCALE_DEGREES: Record<ScaleType, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  pentatonic: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
};
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export function getChordNotes(
  scale: ScaleType, rootNote: string, degree: number, quality: number, octave: number, tilt: number
): { notes: string[]; chordName: string } {
  const intervals = SCALE_DEGREES[scale] || SCALE_DEGREES.major;
  const rootIdx = NOTE_NAMES.indexOf(rootNote);
  const deg = Math.max(0, Math.min(degree - 1, intervals.length - 1));
  const scaleNote = intervals[deg];
  const root = (rootIdx + scaleNote) % 12;
  const isMajor = tilt < 0;
  const chordIntervals = isMajor ? [0, 4, 7] : [0, 3, 7];
  let notes: number[] = [ root + chordIntervals[0], root + chordIntervals[1], root + chordIntervals[2] ];
  if (quality >= 3) notes.push(isMajor ? root + 10 : root + 10);
  if (quality >= 4) notes.push(isMajor ? root + 10 : root + 9);
  const baseOctave = octave + (quality >= 2 ? 1 : 0);
  const noteNames = notes.map((n) => NOTE_NAMES[n % 12] + String(Math.floor(n / 12) + baseOctave));
  const chordName = NOTE_NAMES[root % 12] + (isMajor ? '' : 'm') + (quality >= 3 ? '7' : '') + (quality >= 4 ? 'dim' : '');
  return { notes: noteNames, chordName };
}
CHORD
