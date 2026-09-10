import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function LandingPage() {
  const { t } = useTranslation();
  const n = useNavigate();
  return (
    <div className="hero-mesh min-h-dvh flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
        {t('app.title')}
      </h1>
      <p className="text-lg md:text-xl text-neutral-400 mb-4 max-w-md">
        {t('landing.hero_desc')}
      </p>
      <p className="text-2xl md:text-3xl font-light text-neutral-300 mb-10">
        {t('app.tagline')}
      </p>
      <div className="flex gap-4">
        <Button size="lg" onClick={() => n('/play')}>{t('landing.play_now')}</Button>
        <Button variant="secondary" size="lg" onClick={() => n('/tutorial')}>{t('landing.tutorial')}</Button>
      </div>
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
        {[
          { icon: '🎹', label: t('nav.play') },
          { icon: '🌐', label: t('nav.multiplayer') },
          { icon: '📹', label: t('nav.recordings') },
          { icon: '🎛️', label: t('play.effects') },
        ].map((f) => (
          <div key={f.label} className="glass rounded-xl p-6 card-lift text-center">
            <div className="text-3xl mb-2">{f.icon}</div>
            <div className="text-sm text-neutral-300">{f.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-16 flex gap-8 text-sm text-neutral-500">
        <span>1. {t('play.camera_loading')}</span>
        <span>2. {t('play.no_hands')}</span>
        <span>3. {t('tutorial.step1')}</span>
      </div>
    </div>
  );
}