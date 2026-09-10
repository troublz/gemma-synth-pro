export const CHORD_QUALITIES = {
  major: { name: 'Major', intervals: [0, 4, 7] },
  minor: { name: 'Minor', intervals: [0, 3, 7] },
  dim: { name: 'Diminished', intervals: [0, 3, 6] },
  aug: { name: 'Augmented', intervals: [0, 4, 8] },
  maj7: { name: 'Major 7th', intervals: [0, 4, 7, 11] },
  min7: { name: 'Minor 7th', intervals: [0, 3, 7, 10] },
  dom7: { name: 'Dominant 7th', intervals: [0, 4, 7, 10] },
  dim7: { name: 'Diminished 7th', intervals: [0, 3, 6, 9] },
};

export const CHORD_TYPES = [
  { v: 'major', l: 'Major' },
  { v: 'minor', l: 'Minor' },
  { v: 'dim', l: 'Dim' },
  { v: 'aug', l: 'Aug' },
  { v: 'maj7', l: 'Maj7' },
  { v: 'min7', l: 'Min7' },
  { v: 'dom7', l: '7' },
  { v: 'dim7', l: 'Dim7' },
];