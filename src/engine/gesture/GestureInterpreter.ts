import { type HandLandmark } from '../../stores/gestureStore';
import { countFingers } from './FingerCounter';
import { detectTilt } from './TiltDetector';
import { detectHeight } from './HeightDetector';
import { useGestureStore } from '../../stores/gestureStore';
export function interpretGesture(leftHand: HandLandmark[] | null, rightHand: HandLandmark[] | null): void {
  const store = useGestureStore.getState();
  const leftFingers = leftHand ? countFingers(leftHand) : 0;
  const rightFingers = rightHand ? countFingers(rightHand) : 0;
  const leftTilt = leftHand ? detectTilt(leftHand) : 0;
  const rightTilt = rightHand ? detectTilt(rightHand) : 0;
  const rightHeight = rightHand ? detectHeight(rightHand) : 0.5;
  store.setGestureParams({ leftFingers, rightFingers, leftTilt, rightTilt, rightHeight });
}
