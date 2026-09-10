import { useAudioStore } from '../../stores/audioStore';

export default function ChordDisplay() {
  const { activeChord } = useAudioStore();
  return (
    <div className="text-center py-4">
      <span className="text-4xl font-bold text-glow transition-all duration-200">
        {activeChord || '—'}
      </span>
    </div>
  );
}