import { type InputHTMLAttributes, useCallback } from 'react';
interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
}
export default function Slider({ value, min = 0, max = 100, step = 1, onChange, label, className = '', ...props }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value)), [onChange]);
  return (
    <div className={'relative w-full ' + className}>
      {label && <label className="block text-xs text-neutral-400 mb-1">{label}</label>}
      <input type="range" min={min} max={max} step={step} value={value} onChange={handleChange}
        className="w-full h-1.5 bg-neutral-700 rounded-full appearance-none cursor-pointer accent-primary-500"
        style={{ background: 'linear-gradient(to right, #0891b2 0%, #0891b2 ' + pct + '%, #334155 ' + pct + '%, #334155 100%)' }}
        {...props}
      />
    </div>
  );
}
ENDOFF
