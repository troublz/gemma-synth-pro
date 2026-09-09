import { create } from 'zustand';
export interface Recording {
  id: string;
  title: string;
  duration: number;
  blob?: Blob;
  url?: string;
  createdAt: number;
}
export interface RecordingState {
  isRecording: boolean;
  recordings: Recording[];
  setIsRecording: (r: boolean) => void;
  addRecording: (rec: Recording) => void;
  removeRecording: (id: string) => void;
}
export const useRecordingStore = create<RecordingState>((set) => ({
  isRecording: false,
  recordings: [],
  setIsRecording: (r) => set({ isRecording: r }),
  addRecording: (rec) => set((s) => ({ recordings: [rec, ...s.recordings] })),
  removeRecording: (id) => set((s) => ({ recordings: s.recordings.filter((r) => r.id !== id) })),
}));
