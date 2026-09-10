import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';

export default function MultiplayerPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl font-bold mb-8">{t('nav.multiplayer')}</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl w-full">
        <div className="glass rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">{t('multiplayer.create_room')}</h3>
          <p className="text-neutral-400 text-sm mb-6">{t('multiplayer.start')}</p>
          <Button>{t('multiplayer.create_room')}</Button>
        </div>
        <div className="glass rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">{t('multiplayer.join_room')}</h3>
          <input placeholder={t('multiplayer.room_code')} className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 text-sm mb-4 text-neutral-100 placeholder:text-neutral-500" />
          <Button>{t('multiplayer.join_room')}</Button>
        </div>
      </div>
    </div>
  );
}