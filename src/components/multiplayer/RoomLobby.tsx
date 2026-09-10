import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

interface RoomLobbyProps { onCreate: () => void; onJoin: (code: string) => void; }
export default function RoomLobby({ onCreate, onJoin }: RoomLobbyProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <div className="glass rounded-2xl p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">{t('multiplayer.create_room')}</h3>
        <Button onClick={onCreate}>{t('multiplayer.create_room')}</Button>
      </div>
      <div className="glass rounded-2xl p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">{t('multiplayer.join_room')}</h3>
        <input
          placeholder={t('multiplayer.room_code')}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 text-sm mb-3 text-neutral-100 placeholder:text-neutral-500"
          onChange={(e) => { if (e.target.value.length === 6) onJoin(e.target.value.toUpperCase()); }}
          maxLength={6}
        />
      </div>
    </div>
  );
}