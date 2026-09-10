import { useTranslation } from 'react-i18next';

export default function PresetBrowserPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-dvh px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">{t('recordings.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass rounded-xl p-4 card-lift">
            <div className="w-full h-24 bg-neutral-800 rounded-lg mb-3 flex items-center justify-center text-neutral-600">🎵</div>
            <p className="text-sm font-medium">Preset {i + 1}</p>
            <p className="text-xs text-neutral-500">Synth configuration</p>
          </div>
        ))}
      </div>
    </div>
  );
}