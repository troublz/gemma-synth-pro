import { type SelectHTMLAttributes } from 'react';
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  label?: string;
}
export default function Select({ options, label, className = '', ...props }: SelectProps) {
  return (
    <div className={className}>
      {label && <label className="block text-xs text-neutral-400 mb-1">{label}</label>}
      <select className="w-full bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer appearance-none" {...props}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
