interface SliderProps { value: number; onChange: (v: number) => void; min: number; max: number; step: number; disabled?: boolean; }
export default function Slider({ value, onChange, min, max, step, disabled }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative flex-1 h-6 flex items-center">
      <div className="w-full h-1.5 bg-neutral-700 rounded-full overflow-hidden">
        <div className="h-full bg-primary-500 rounded-full transition-all duration-75" style={{ width: pct + '%' }} />
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value} disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md pointer-events-none" style={{ left: 'calc(' + pct + '% - 8px)' }} />
    </div>
  );
}