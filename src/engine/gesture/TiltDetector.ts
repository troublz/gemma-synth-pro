import { type HandLandmark } from '../../stores/gestureStore';
export function detectTilt(landmarks: HandLandmark[]): number {
  const wrist = landmarks[0];
  const middle = landmarks[12];
  return Math.atan2(middle.x - wrist.x, middle.y - wrist.y) * (180 / Math.PI);
}
