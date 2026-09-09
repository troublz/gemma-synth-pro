import { Hands, type Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { useGestureStore, type HandLandmark } from '../../stores/gestureStore';
import { interpretGesture } from './GestureInterpreter';
const HANDS_CONFIG = {
  locateFile: (file: string) => "https://cdn.jsdelivr.net/npm/@mediapipe/hands/" + file,
};
export class HandTracker {
  private hands: Hands;
  private camera: Camera | null = null;
  private videoEl: HTMLVideoElement;
  private animationFrameId: number = 0;
  private running = false;
  constructor(videoEl: HTMLVideoElement) {
    this.videoEl = videoEl;
    this.hands = new Hands(HANDS_CONFIG);
    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.5,
    });
    this.hands.onResults(this.onResults.bind(this));
  }
  async start(): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: 'user' } });
    this.videoEl.srcObject = stream;
    this.videoEl.play();
    this.camera = new Camera(this.videoEl, {
      onFrame: async () => { if (this.running) await this.hands.send({ image: this.videoEl }); },
      width: 640, height: 480,
    });
    this.running = true;
    this.camera.start();
  }
  stop(): void {
    this.running = false;
    this.camera?.stop();
    const stream = this.videoEl.srcObject as MediaStream;
    stream?.getTracks().forEach((t) => t.stop());
    this.videoEl.srcObject = null;
    useGestureStore.getState().setTracking(false);
  }
  private onResults(results: Results): void {
    const store = useGestureStore.getState();
    let leftHand: HandLandmark[] | null = null;
    let rightHand: HandLandmark[] | null = null;
    if (results.multiHandLandmarks && results.multiHandedness) {
      for (let i = 0; i < results.multiHandLandmarks.length; i++) {
        const landmarks = results.multiHandLandmarks[i].map((lm) => ({ x: lm.x, y: lm.y, z: lm.z }));
        const handedness = results.multiHandedness[i].label;
        if (handedness === 'Left') leftHand = landmarks;
        else rightHand = landmarks;
      }
    }
    store.setLeftHand(leftHand);
    store.setRightHand(rightHand);
    store.setTracking(results.multiHandLandmarks.length > 0);
    if (leftHand || rightHand) {
      interpretGesture(leftHand, rightHand);
    }
  }
}
