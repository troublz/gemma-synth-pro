import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { t } = useTranslation();
  const n = useNavigate();
  return (
    <nav className="glass-strong sticky top-0 z-40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <button onClick={() => n('/')} className="text-lg font-bold gradient-text">
          {t('app.title')}
        </button>
        <div className="flex gap-1">
          {[
            { to: '/play', label: t('nav.play') },
            { to: '/multiplayer', label: t('nav.multiplayer') },
            { to: '/recordings', label: t('nav.recordings') },
            { to: '/settings', label: t('nav.settings') },
          ].map((l) => (
            <button key={l.to} onClick={() => n(l.to)} className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-md transition-colors">
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}