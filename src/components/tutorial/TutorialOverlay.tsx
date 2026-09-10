import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

interface TutorialOverlayProps { step: number; onNext: () => void; onPrev: () => void; onDone: () => void; }
export default function TutorialOverlay({ step, onNext, onPrev, onDone }: TutorialOverlayProps) {
  const { t } = useTranslation();
  const steps = [
    { title: t('tutorial.step1'), desc: t('tutorial.step1_desc') },
    { title: t('tutorial.step2'), desc: t('tutorial.step2_desc') },
    { title: t('tutorial.step3'), desc: t('tutorial.step3_desc') },
  ];
  const s = steps[step];
  return (
    <div className="glass-strong rounded-2xl p-6 max-w-sm mx-auto text-center">
      <p className="text-xs text-neutral-500 mb-2">Step {step + 1}/3</p>
      <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
      <p className="text-sm text-neutral-400 mb-4">{s.desc}</p>
      <div className="flex justify-center gap-3">
        {step > 0 && <Button variant="secondary" size="sm" onClick={onPrev}>{t('tutorial.prev')}</Button>}
        {step < 2 ? <Button size="sm" onClick={onNext}>{t('tutorial.next')}</Button> : <Button size="sm" onClick={onDone}>{t('tutorial.done')}</Button>}
      </div>
    </div>
  );
}