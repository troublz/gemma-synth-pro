import { create } from 'zustand';
export interface SettingsState {
  language: string;
  cameraResolution: '720p' | '1080p';
  mirrorCamera: boolean;
  showLandmarks: boolean;
  lowLightBoost: boolean;
  chordNotation: 'CDEFGAB' | 'DoReMi';
  showNoteNames: boolean;
  gestureSensitivity: number;
  tiltThreshold: number;
  setLanguage: (l: string) => void;
  setSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
}
export const useSettingsStore = create<SettingsState>((set) => ({
  language: 'en', cameraResolution: '720p', mirrorCamera: true,
  showLandmarks: true, lowLightBoost: true, chordNotation: 'CDEFGAB',
  showNoteNames: true, gestureSensitivity: 0.5, tiltThreshold: 30,
  setLanguage: (l) => set({ language: l }),
  setSetting: (key, value) => set({ [key]: value }),
}));
