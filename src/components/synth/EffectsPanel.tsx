import { useAudioStore } from '../../stores/audioStore';
import Slider from '../ui/Slider';

export default function EffectsPanel() {
  const { effects, setEffect } = useAudioStore();
  return (
    <div className="flex flex-col gap-3">
      {Object.entries(effects).map(([name, value]) => (
        <div key={name} className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 w-16 capitalize">{name}</span>
          <Slider value={value} onChange={(v) => setEffect(name as keyof typeof effects, v)} min={0} max={1} step={0.01} />
        </div>
      ))}
    </div>
  );
}