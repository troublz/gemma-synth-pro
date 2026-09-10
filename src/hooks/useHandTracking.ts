import { useEffect, useRef } from 'react';
import { HandTracker } from '../engine/gesture/HandTracker';

export function useHandTracking(videoEl: HTMLVideoElement | null) {
  const trackerRef = useRef<HandTracker | null>(null);

  useEffect(() => {
    if (!videoEl) return;
    const tracker = new HandTracker(videoEl);
    trackerRef.current = tracker;
    tracker.start();
    return () => { tracker.stop(); };
  }, [videoEl]);

  return trackerRef;
}