import { create } from 'zustand';
export interface HandLandmark { x: number; y: number; z: number; }
export interface GestureState {
  leftHand: HandLandmark[] | null;
  rightHand: HandLandmark[] | null;
  leftFingers: number;
  rightFingers: number;
  leftTilt: number;
  rightTilt: number;
  rightHeight: number;
  isTracking: boolean;
  setLeftHand: (landmarks: HandLandmark[] | null) => void;
  setRightHand: (landmarks: HandLandmark[] | null) => void;
  setGestureParams: (params: { leftFingers: number; rightFingers: number; leftTilt: number; rightTilt: number; rightHeight: number }) => void;
  setTracking: (tracking: boolean) => void;
}
export const useGestureStore = create<GestureState>((set) => ({
  leftHand: null, rightHand: null,
  leftFingers: 0, rightFingers: 0,
  leftTilt: 0, rightTilt: 0, rightHeight: 0.5,
  isTracking: false,
  setLeftHand: (landmarks) => set({ leftHand: landmarks }),
  setRightHand: (landmarks) => set({ rightHand: landmarks }),
  setGestureParams: (params) => set(params),
  setTracking: (tracking) => set({ isTracking: tracking }),
}));
