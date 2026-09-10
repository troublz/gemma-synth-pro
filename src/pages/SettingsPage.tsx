import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../stores/settingsStore';
import { useAudioStore } from '../stores/audioStore';
import Slider from '../components/ui/Slider';
import Toggle from '../components/ui/Toggle';
import Button from '../components/ui/Button';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { language, cameraResolution, mirrorCamera, showLandmarks, lowLightBoost, chordNotation, showNoteNames, gestureSensitivity, tiltThreshold, setLanguage, setSetting } = useSettingsStore();
  const { volume, setVolume } = useAudioStore();
  return (
    <div className="min-h-dvh px-4 py-8 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">{t('settings.title')}</h2>
      <div className="flex flex-col gap-8">
        <section>
          <h3 className="text-lg font-semibold text-neutral-300 mb-4">{t('settings.audio')}</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-400 w-32">{t('play.volume')}</span>
            <Slider value={volume} onChange={setVolume} min={0} max={1} step={0.01} />
          </div>
        </section>
        <section>
          <h3 className="text-lg font-semibold text-neutral-300 mb-4">{t('settings.camera')}</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">{t('settings.camera')}</span>
              <select value={cameraResolution} onChange={(e) => setSetting('cameraResolution', e.target.value as '720p' | '1080p')} className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-sm text-neutral-200">
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Mirror</span>
              <Toggle checked={mirrorCamera} onChange={(v) => setSetting('mirrorCamera', v)} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Landmarks</span>
              <Toggle checked={showLandmarks} onChange={(v) => setSetting('showLandmarks', v)} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Low Light</span>
              <Toggle checked={lowLightBoost} onChange={(v) => setSetting('lowLightBoost', v)} />
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-semibold text-neutral-300 mb-4">{t('settings.appearance')}</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">{t('settings.language')}</span>
              <select value={language} onChange={(e) => { setLanguage(e.target.value); i18n.changeLanguage(e.target.value); }} className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-sm text-neutral-200">
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Notation</span>
              <select value={chordNotation} onChange={(e) => setSetting('chordNotation', e.target.value as 'CDEFGAB' | 'DoReMi')} className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-sm text-neutral-200">
                <option value="CDEFGAB">CDEFGAB</option>
                <option value="DoReMi">DoReMi</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Note Names</span>
              <Toggle checked={showNoteNames} onChange={(v) => setSetting('showNoteNames', v)} />
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-semibold text-neutral-300 mb-4">{t('settings.gesture')}</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-400 w-32">Sensitivity</span>
              <Slider value={gestureSensitivity} onChange={(v) => setSetting('gestureSensitivity', v)} min={0} max={1} step={0.01} />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-400 w-32">Tilt Threshold</span>
              <Slider value={tiltThreshold} onChange={(v) => setSetting('tiltThreshold', v)} min={5} max={90} step={1} />
            </div>
          </div>
        </section>
        <Button variant="secondary" onClick={() => {}}>{t('settings.reset')}</Button>
      </div>
    </div>
  );
}