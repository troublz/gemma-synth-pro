import { type HandLandmark } from '../../stores/gestureStore';
export function countFingers(landmarks: HandLandmark[]): number {
  const tips = [4, 8, 12, 16, 20];
  const dips = [3, 6, 10, 14, 18];
  let count = 0;
  for (let i = 0; i < tips.length; i++) {
    if (i === 0) {
      count += landmarks[tips[i]].x < landmarks[dips[i]].x ? 1 : 0;
    } else {
      count += landmarks[tips[i]].y < landmarks[dips[i]].y ? 1 : 0;
    }
  }
  return count;
}
