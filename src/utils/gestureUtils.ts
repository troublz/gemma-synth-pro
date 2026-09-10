import { type HandLandmark } from '../types/gesture';

export function distance(a: HandLandmark, b: HandLandmark): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

export function angle(a: HandLandmark, b: HandLandmark, c: HandLandmark): number {
  const ab = { x: b.x - a.x, y: b.y - a.y };
  const cb = { x: b.x - c.x, y: b.y - c.y };
  const dot = ab.x * cb.x + ab.y * cb.y;
  const mag = Math.sqrt(ab.x ** 2 + ab.y ** 2) * Math.sqrt(cb.x ** 2 + cb.y ** 2);
  return Math.acos(dot / mag) * (180 / Math.PI);
}

export function normalizeLandmarks(landmarks: HandLandmark[]): HandLandmark[] {
  const wrist = landmarks[0];
  return landmarks.map((lm) => ({ x: lm.x - wrist.x, y: lm.y - wrist.y, z: lm.z - wrist.z }));
}