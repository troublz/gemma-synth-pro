import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

interface RoomControlsProps { onStart: () => void; onEnd: () => void; onLeave: () => void; isHost: boolean; }
export default function RoomControls({ onStart, onEnd, onLeave, isHost }: RoomControlsProps) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-3">
      {isHost && <Button onClick={onStart}>{t('multiplayer.start')}</Button>}
      {isHost && <Button variant="secondary" onClick={onEnd}>{t('multiplayer.end')}</Button>}
      <Button variant="ghost" onClick={onLeave}>{t('multiplayer.leave')}</Button>
    </div>
  );
}