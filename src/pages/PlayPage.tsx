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

const ST: { v: SynthType; l: string }[] = [
  { v: 'warm', l: 'Warm Synth' }, { v: 'bright', l: 'Bright Synth' },
  { v: 'retro', l: 'Retro Synth' }, { v: 'strings', l: 'Strings' },
  { v: 'horns', l: 'Horns' }, { v: 'bass', l: 'Bass' },
  { v: 'pad', l: 'Pad' }, { v: 'pluck', l: 'Pluck' },
];
const SC: { v: ScaleType; l: string }[] = [
  { v: 'major', l: 'Major' }, { v: 'minor', l: 'Minor' },
  { v: 'pentatonic', l: 'Pentatonic' }, { v: 'blues', l: 'Blues' },
  { v: 'dorian', l: 'Dorian' }, { v: 'phrygian', l: 'Phrygian' },
];

export default function PlayPage() {
  const { t } = useTranslation();
  const n = useNavigate();
  const v = useRef<HTMLVideoElement>(null);
  const tr = useRef<HandTracker | null>(null);
  const sy = useRef<SynthEngine | null>(null);
  const rc = useRef<AudioRecorder | null>(null);
  const { leftFingers, rightFingers, leftTilt, rightTilt, rightHeight } = useGestureStore();
  const { synthType, scale, rootNote, octave, volume, filterCutoff, activeChord, setSynthType, setScale, setVolume, setFilterCutoff, setActiveChord } = useAudioStore();
  const { isPerformanceMode, togglePerformanceMode } = useUIStore();

  const init = useCallback(async () => {
    if (!v.current) return;
    const s = new SynthEngine();
    const t = new HandTracker(v.current);
    sy.current = s;
    tr.current = t;
    rc.current = new AudioRecorder();
    await s.init();
    await t.start();
  }, []);

  useEffect(() => { init(); return () => { tr.current?.stop(); }; }, [init]);

  useEffect(() => {
    const s = sy.current;
    if (!s) return;
    const r = getChordNotes(scale, rootNote, leftFingers, rightFingers, octave, leftTilt);
    setActiveChord(r.chordName, r.notes);
    s.setFilterCutoff(filterCutoff);
    s.setVolume(volume);
    r.notes.length > 0 ? s.playChord() : s.releaseAll();
  }, [leftFingers, rightFingers, leftTilt, rightTilt, rightHeight, filterCutoff, volume, scale, rootNote, octave]);

  useEffect(() => { sy.current?.setSynthType(synthType); }, [synthType]);

  const rec = async () => {
    const r = rc.current;
    if (!r) return;
    await r.start();
    setTimeout(async () => {
      const b = await r.stop();
      const u = URL.createObjectURL(b);
      const a = document.createElement('a');
      a.href = u;
      a.download = 'rec.webm';
      a.click();
    }, 5000);
  };

  return (
    <div className="relative min-h-dvh bg-black overflow-hidden">
      <video ref={v} className="absolute inset-0 w-full h-full object-cover" playsInline muted />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      {isPerformanceMode ? null : (
        <div className="relative z-10 flex flex-col h-full">
          <div className="glass-strong m-3 rounded-xl px-4 py-2 flex items-center justify-between gap-2">
            <button onClick={() => n('/')} className="text-sm text-white/60 hover:text-white">
              ← {t('play.camera_loading')}
            </button>
            <div className="flex gap-2">
              <Select value={synthType} onChange={(v) => setSynthType(v as SynthType)} options={ST} />
              <Select value={scale} onChange={(v) => setScale(v as ScaleType)} options={SC} />
              <Button variant="ghost" size="sm" onClick={togglePerformanceMode}>⛶</Button>
            </div>
          </div>
          <div className="flex-1" />
          <div className="glass-strong m-3 rounded-xl p-4 flex flex-col gap-3">
            <div className="text-center">
              <span className="text-3xl font-bold text-glow">{activeChord || t('play.no_hands')}</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-xs text-neutral-400 w-12">{t('play.volume')}</span>
              <Slider value={volume} onChange={setVolume} min={0} max={1} step={0.01} />
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-xs text-neutral-400 w-12">{t('play.filter')}</span>
              <Slider value={filterCutoff} onChange={setFilterCutoff} min={200} max={8000} step={10} />
            </div>
            <div className="flex justify-center gap-3">
              <Button onClick={rec}>{t('play.record')}</Button>
              <Button variant="secondary" onClick={() => n('/settings')}>{t('play.effects')}</Button>
            </div>
          </div>
        </div>
      )}
      {isPerformanceMode && (
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <span className="text-5xl font-bold text-glow">{activeChord || t('play.no_hands')}</span>
          </div>
          <button onClick={togglePerformanceMode} className="absolute top-4 right-4 text-white/40 hover:text-white">
            ⛶
          </button>
        </div>
      )}
    </div>
  );
}