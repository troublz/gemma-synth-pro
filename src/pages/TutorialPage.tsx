import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Button from '../components/ui/Button';

export default function TutorialPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const steps = [
    { title: t('tutorial.step1'), desc: t('tutorial.step1_desc') },
    { title: t('tutorial.step2'), desc: t('tutorial.step2_desc') },
    { title: t('tutorial.step3'), desc: t('tutorial.step3_desc') },
  ];
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-3xl font-bold mb-2">{t('tutorial.title')}</h2>
      <p className="text-neutral-400 mb-8">{t('tutorial.step1')} {step + 1}/3</p>
      <div className="glass rounded-2xl p-10 max-w-md w-full mb-8">
        <div className="text-6xl mb-6">{['✋', '🤚', '🎵'][step]}</div>
        <h3 className="text-xl font-semibold mb-2">{steps[step].title}</h3>
        <p className="text-neutral-400">{steps[step].desc}</p>
      </div>
      <div className="flex gap-4">
        {step > 0 && <Button variant="secondary" onClick={() => setStep(step - 1)}>{t('tutorial.prev')}</Button>}
        {step < 2
          ? <Button onClick={() => setStep(step + 1)}>{t('tutorial.next')}</Button>
          : <Button onClick={() => window.location.href = '/play'}>{t('tutorial.done')}</Button>
        }
      </div>
    </div>
  );
}