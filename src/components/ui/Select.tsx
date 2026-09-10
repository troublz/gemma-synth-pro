interface SelectProps { value: string; onChange: (v: string) => void; options: { v: string; l: string }[]; disabled?: boolean; }
export default function Select({ value, onChange, options, disabled }: SelectProps) {
  return (
    <select
      value={value} disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1.5 text-xs text-neutral-200 focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:outline-none disabled:opacity-50"
    >
      {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}