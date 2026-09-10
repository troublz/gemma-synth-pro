import { useGestureStore } from '../../stores/gestureStore';

export default function GestureDebug() {
  const { leftFingers, rightFingers, leftTilt, rightTilt, rightHeight, isTracking } = useGestureStore();
  if (!isTracking) return null;
  return (
    <div className="absolute top-2 left-2 glass rounded-lg px-3 py-2 text-xs font-mono text-neutral-300 z-20">
      <div>L: {leftFingers}f {leftTilt.toFixed(0)}°</div>
      <div>R: {rightFingers}f {rightTilt.toFixed(0)}° h:{rightHeight.toFixed(2)}</div>
    </div>
  );
}