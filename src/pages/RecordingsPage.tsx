import { useTranslation } from 'react-i18next';
import { useRecordingStore } from '../stores/recordingStore';
import Button from '../components/ui/Button';

export default function RecordingsPage() {
  const { t } = useTranslation();
  const { recordings, removeRecording } = useRecordingStore();
  return (
    <div className="min-h-dvh px-4 py-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">{t('recordings.title')}</h2>
      {recordings.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center">
          <p className="text-neutral-400 text-lg">{t('recordings.empty')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {recordings.map((rec) => (
            <div key={rec.id} className="glass rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{rec.title}</p>
                <p className="text-xs text-neutral-500">{new Date(rec.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                {rec.url && <Button variant="ghost" size="sm" onClick={() => window.open(rec.url)}>{t('recordings.play')}</Button>}
                <Button variant="ghost" size="sm" onClick={() => removeRecording(rec.id)}>{t('recordings.delete')}</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}