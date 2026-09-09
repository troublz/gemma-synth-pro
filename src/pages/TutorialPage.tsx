import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
const STEPS = [
  { title: 'Make your first chord', desc: 'Hold up one finger on your left hand and one finger on your right hand.' },
  { title: 'Change the chord', desc: 'Left hand fingers control scale degree. Right hand controls chord quality.' },
  { title: 'Add expression', desc: 'Tilt hands for filter, raise for volume. Thumb controls octave.' },
];
export default function TutorialPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-lg mx-auto space-y-8">
        <div className="flex gap-2 justify-center mb-4">
          {STEPS.map((_, i) => (
            <div key={i} className={'h-2 w-2 rounded-full ' + (i === step ? 'bg-primary-400' : 'bg-neutral-700')} />
          ))}
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-neutral-800 flex items-center justify-center">
            <span className="text-4xl">{step + 1}</span>
          </div>
          <h2 className="text-xl font-bold">{STEPS[step].title}</h2>
          <p className="text-neutral-400">{STEPS[step].desc}</p>
        </div>
        <div className="flex gap-4 justify-center">
          {step > 0 && <Button variant="secondary" onClick={() => setStep(step - 1)}>Back</Button>}
          {step < 2 ? <Button onClick={() => setStep(step + 1)}>Next</Button> : <Button onClick={() => navigate('/play')}>Start Playing</Button>}
        </div>
      </div>
    </div>
  );
}
