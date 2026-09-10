export interface HandLandmark { x: number; y: number; z: number; }
export interface GestureParams {
  leftFingers: number;
  rightFingers: number;
  leftTilt: number;
  rightTilt: number;
  rightHeight: number;
}
export type GestureMode = 'rule' | 'custom';
export type Handedness = 'Left' | 'Right';