import { useAudioStore, type SynthType } from '../../stores/audioStore';
import Select from '../ui/Select';

const ST: { v: SynthType; l: string }[] = [
  { v: 'warm', l: 'Warm' }, { v: 'bright', l: 'Bright' }, { v: 'retro', l: 'Retro' },
  { v: 'strings', l: 'Strings' }, { v: 'horns', l: 'Horns' }, { v: 'bass', l: 'Bass' },
  { v: 'pad', l: 'Pad' }, { v: 'pluck', l: 'Pluck' },
];

export default function SynthPanel() {
  const { synthType, setSynthType } = useAudioStore();
  return <Select value={synthType} onChange={(v) => setSynthType(v as SynthType)} options={ST} />;
}