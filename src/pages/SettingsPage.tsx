import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../stores/settingsStore';
import Slider from '../components/ui/Slider';
import Toggle from '../components/ui/Toggle';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
const LANGUAGES = [
  { value: 'en', label: 'English' }, { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'ja', label: 'Japanese' }, { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' }, { value: 'de', label: 'German' },
  { value: 'ko', label: 'Korean' }, { value: 'zh', label: 'Mandarin' },
];
export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { language, cameraResolution, mirrorCamera, showLandmarks, lowLightBoost, chordNotation, showNoteNames, gestureSensitivity, tiltThreshold, setLanguage, setSetting } = useSettingsStore();
  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };
  return (
    <div className="min-h-dvh bg-neutral-950 p-4">
      <div className="max-w-lg mx-auto space-y-8 pt-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-neutral-400 hover:text-neutral-200">
            <img src="icons/arrow-left.svg" alt="" className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">{t('settings.title')}</h1>
        </div>
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-primary-400 uppercase tracking-wider">{t('settings.audio')}</h2>
          <Slider label="Gesture Sensitivity" value={gestureSensitivity * 100} onChange={(v) => setSetting('gestureSensitivity', v / 100)} />
          <Slider label="Tilt Threshold" value={tiltThreshold} min={10} max={60} onChange={(v) => setSetting('tiltThreshold', v)} />
        </section>
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-primary-400 uppercase tracking-wider">{t('settings.camera')}</h2>
          <Select label="Resolution" options={[{ value: '720p', label: '720p' }, { value: '1080p', label: '1080p' }]} value={cameraResolution} onChange={(e) => setSetting('cameraResolution', e.target.value as '720p' | '1080p')} />
          <div className="flex items-center justify-between"><span className="text-sm">Mirror Camera</span><Toggle checked={mirrorCamera} onToggle={(v) => setSetting('mirrorCamera', v)} /></div>
          <div className="flex items-center justify-between"><span className="text-sm">Show Landmarks</span><Toggle checked={showLandmarks} onToggle={(v) => setSetting('showLandmarks', v)} /></div>
          <div className="flex items-center justify-between"><span className="text-sm">Low Light Boost</span><Toggle checked={lowLightBoost} onToggle={(v) => setSetting('lowLightBoost', v)} /></div>
        </section>
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-primary-400 uppercase tracking-wider">{t('settings.appearance')}</h2>
          <Select label={t('settings.language')} options={LANGUAGES} value={language} onChange={handleLanguage} />
          <Select label="Chord Notation" options={[{ value: 'CDEFGAB', label: 'CDEFGAB' }, { value: 'DoReMi', label: 'Do Re Mi' }]} value={chordNotation} onChange={(e) => setSetting('chordNotation', e.target.value as 'CDEFGAB' | 'DoReMi')} />
          <div className="flex items-center justify-between"><span className="text-sm">Show Note Names</span><Toggle checked={showNoteNames} onToggle={(v) => setSetting('showNoteNames', v)} /></div>
        </section>
        <Button variant="secondary" className="w-full">Reset to Default</Button>
      </div>
    </div>
  );
}
