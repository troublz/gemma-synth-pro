import { type ButtonHTMLAttributes } from 'react';
interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
}
export default function Toggle({ checked, onToggle, label, className = '', disabled, ...props }: ToggleProps) {
  const baseClass = 'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950';
  const colorClass = checked ? 'bg-primary-500' : 'bg-neutral-700';
  const cursorClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const dotClass = 'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-150 ' + (checked ? 'translate-x-6' : 'translate-x-1');
  return (
    <button
      type="button" role="switch" aria-checked={checked}
      onClick={() => !disabled && onToggle(!checked)}
      className={baseClass + ' ' + colorClass + ' ' + cursorClass + ' ' + className}
      disabled={disabled} {...props}
    >
      <span className={dotClass} />
      {label && <span className="sr-only">{label}</span>}
    </button>
  );
}
TO
