interface ToggleProps { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean; }
export default function Toggle({ checked, onChange, disabled }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:opacity-50 ' + (checked ? 'bg-primary-500' : 'bg-neutral-700')}
    >
      <span className={'inline-block h-4 w-4 rounded-full bg-white transition-transform duration-150 ' + (checked ? 'translate-x-6' : 'translate-x-1')} />
    </button>
  );
}