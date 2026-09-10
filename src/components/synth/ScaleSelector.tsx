import { useAudioStore, type ScaleType } from '../../stores/audioStore';
import Select from '../ui/Select';

const SC: { v: ScaleType; l: string }[] = [
  { v: 'major', l: 'Major' }, { v: 'minor', l: 'Minor' }, { v: 'pentatonic', l: 'Pentatonic' },
  { v: 'blues', l: 'Blues' }, { v: 'dorian', l: 'Dorian' }, { v: 'phrygian', l: 'Phrygian' },
];

export default function ScaleSelector() {
  const { scale, setScale } = useAudioStore();
  return <Select value={scale} onChange={(v) => setScale(v as ScaleType)} options={SC} />;
}