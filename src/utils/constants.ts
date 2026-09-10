export const APP_NAME = 'Gesture Synth Pro';
export const APP_VERSION = '1.0.0';
export const MAX_ROOM_PLAYERS = 4;
export const ROOM_CODE_LENGTH = 6;
export const CAMERA_WIDTH = 640;
export const CAMERA_HEIGHT = 480;
export const FINGER_TIPS = [4, 8, 12, 16, 20];
export const FINGER_DIPS = [3, 6, 10, 14, 18];
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const SCALE_DEGREES: Record<string, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  pentatonic: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
};