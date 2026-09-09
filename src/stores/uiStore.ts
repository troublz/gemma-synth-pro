import { create } from 'zustand';
export interface UIState {
  isPerformanceMode: boolean;
  isEffectsOpen: boolean;
  isSettingsOpen: boolean;
  tutorialStep: number;
  toasts: { id: string; message: string; type: 'success' | 'error' | 'warning' | 'info' }[];
  togglePerformanceMode: () => void;
  toggleEffects: () => void;
  toggleSettings: () => void;
  setTutorialStep: (s: number) => void;
  addToast: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;
}
export const useUIStore = create<UIState>((set) => ({
  isPerformanceMode: false, isEffectsOpen: false, isSettingsOpen: false,
  tutorialStep: 0, toasts: [],
  togglePerformanceMode: () => set((s) => ({ isPerformanceMode: !s.isPerformanceMode })),
  toggleEffects: () => set((s) => ({ isEffectsOpen: !s.isEffectsOpen })),
  toggleSettings: () => set((s) => ({ isSettingsOpen: !s.isSettingsOpen })),
  setTutorialStep: (step) => set({ tutorialStep: step }),
  addToast: (message, type) => set((s) => ({ toasts: [...s.toasts, { id: Date.now().toString(), message, type }] })),
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
