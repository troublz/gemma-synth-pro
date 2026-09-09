import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGestureStore } from '../stores/gestureStore';
import { useAudioStore, type SynthType, type ScaleType } from '../stores/audioStore';
import { useUIStore } from '../stores/uiStore';
import { HandTracker } from '../engine/gesture/HandTracker';
import { SynthEngine } from '../engine/audio/SynthEngine';
import { AudioRecorder } from '../engine/audio/AudioRecorder';
import { getChordNotes } from '../engine/audio/ChordMapper';
import Select from '../components/ui/Select';
import Slider from '../components/ui/Slider';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
const SYNTH_TYPES: { value: SynthType; label: string }[] = [
  { value: 'warm', label: 'Warm Synth' }, { value: 'bright', label: 'Bright Synth' },
  { value: 'retro', label: 'Retro Synth' }, { value: 'strings', label: 'Strings' },
  { value: 'horns', label: 'Horns' }, { value: 'bass', label: 'Bass' },
  { value: 'pad', label: 'Pad' }, { value: 'pluck', label: 'Pluck' },
];
const SCALES: { value: ScaleType; label: string }[] = [
  { value: 'major', label: 'Major' }, { value: 'minor', label: 'Minor' },
  { value: 'pentatonic', label: 'Pentatonic' }, { value: 'blues', label: 'Blues' },
  { value: 'dorian', label: 'Dorian' }, { value: 'phrygian', label: 'Phrygian' },
  { value: 'lydian', label: 'Lydian' }, { value: 'mixolydian', label: 'Mixolydian' },
];
export default function PlayPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackerRef = useRef<HandTracker | null>(null);
  const synthRef = useRef<SynthEngine | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const { leftHand, rightHand, leftFingers, rightFingers, leftTilt, rightTilt, rightHeight, isTracking } = useGestureStore();
  const { synthType, scale, rootNote, octave, volume, filterCutoff, activeChord, setSynthType, setScale, setOctave, setVolume, setFilterCutoff, setActiveChord } = useAudioStore();
  const { isPerformanceMode, togglePerformanceMode } = useUIStore();
  const initEngine = useCallback(async () => {
    if (!videoRef.current) return;
    const synth = new SynthEngine();
    const tracker = new HandTracker(videoRef.current);
    const recorder = new AudioRecorder();
    synthRef.current = synth;
    trackerRef.current = tracker;
    recorderRef.current = recorder;
    await synth.init();
    await tracker.start();
  }, []);
  useEffect(() => { initEngine(); return () => { trackerRef.current?.stop(); }; }, [initEngine]);
  useEffect(() => {
    const synth = synthRef.current;
    if (!synth) return;
    const result = getChordNotes(scale, rootNote, leftFingers, rightFingers, leftTilt, rightTilt, octave);
    setActiveChord(result.chordName, result.notes);
    synth.setFilterCutoff(filterCutoff);
    synth.setVolume(volume);
    if (result.notes.length > 0) synth.playChord();
    else synth.releaseAll();
  }, [leftFingers, rightFingers, leftTilt, rightTilt, rightHeight, filterCutoff, volume, scale, rootNote, octave, setActiveChord]);
  useEffect(() => { synthRef.current?.setSynthType(synthType); }, [synthType]);
  const handleRecord = async () => {
    const recorder = recorderRef.current;
    if (!recorder) return;
    await recorder.start();
    setTimeout(async () => {
      const blob = await recorder.stop();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = "recording.webm"; a.click();
    }, 5000);
  };
  return (
    <div className="relative min-h-dvh bg-neutral-950 overflow-hidden">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-90" playsInline muted />
      {isPerformanceMode ? null : (
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between p-3 bg-neutral-900/80 backdrop-blur-sm">
            <button onClick={() => navigate('/')} className="text-neutral-400 hover:text-neutral-200 text-sm flex items-center gap-1">
              <img src="icons/arrow-left.svg" alt="" className="w-4 h-4" /> Back
            </button>
            <div className="flex items-center gap-2">
              <Select options={SYNTH_TYPES} value={synthType} onChange={(e) => setSynthType(e.target.value as SynthType)} />
              <Select options={SCALES} value={scale} onChange={(e) => setScale(e.target.value as ScaleType)} />
              <Button size="sm" variant="ghost" onClick={togglePerformanceMode}>
                <img src="icons/fullscreen.svg" alt="" className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1" />
          <div className="bg-neutral-900/80 backdrop-blur-sm p-3 space-y-2">
            <div className="text-center">
              {activeChord ? (
                <p className="text-2xl font-bold text-primary-400 font-mono">{activeChord}</p>
              ) : (
                <p className="text-neutral-500">{t('play.no_hands')}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Slider label="Vol" value={volume * 100} onChange={(v) => setVolume(v / 100)} className="flex-1" />
              <Slider label="Filter" value={filterCutoff} min={200} max={8000} step={100} onChange={setFilterCutoff} className="flex-1" />
              <Button size="sm" variant="secondary" onClick={handleRecord}>
                <img src="icons/record.svg" alt="" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
