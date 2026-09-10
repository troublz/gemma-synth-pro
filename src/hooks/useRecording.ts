import { useRef, useCallback } from 'react';
import { AudioRecorder } from '../engine/audio/AudioRecorder';
import { useRecordingStore } from '../stores/recordingStore';

export function useRecording() {
  const recorderRef = useRef<AudioRecorder | null>(null);
  const { isRecording, setIsRecording, addRecording } = useRecordingStore();

  const start = useCallback(async () => {
    const recorder = new AudioRecorder();
    recorderRef.current = recorder;
    await recorder.start();
    setIsRecording(true);
  }, [setIsRecording]);

  const stop = useCallback(async (title?: string) => {
    if (!recorderRef.current) return;
    const blob = await recorderRef.current.stop();
    setIsRecording(false);
    addRecording({
      id: Date.now().toString(),
      title: title || 'Untitled',
      duration: 0,
      blob,
      createdAt: Date.now(),
    });
  }, [setIsRecording, addRecording]);

  return { isRecording, start, stop };
}