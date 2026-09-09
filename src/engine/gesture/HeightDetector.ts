import { type HandLandmark } from '../../stores/gestureStore';
export function detectHeight(landmarks: HandLandmark[]): number {
  return 1 - landmarks[0].y;
}
