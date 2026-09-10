export function noteToFrequency(note: string): number {
  return 440 * Math.pow(2, (noteIndex(note) - 69) / 12);
}

export function noteIndex(note: string): number {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const name = note.replace(/\d+/, '');
  const octave = parseInt(note.match(/\d+/)?.toString() || '4');
  return notes.indexOf(name) + (octave + 1) * 12;
}

export function dbToGain(db: number): number {
  return Math.pow(10, db / 20);
}

export function gainToDb(gain: number): number {
  return 20 * Math.log10(gain);
}