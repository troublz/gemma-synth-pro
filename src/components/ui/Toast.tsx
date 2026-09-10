import { useEffect } from 'react';
interface ToastProps { id: string; message: string; type: 'success' | 'error' | 'warning' | 'info'; onRemove: (id: string) => void; }
export default function Toast({ id, message, type, onRemove }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(id), 4000);
    return () => clearTimeout(t);
  }, [id, onRemove]);
  const colors = { success: 'bg-success', error: 'bg-error', warning: 'bg-warning', info: 'bg-info' };
  return (
    <div className={'glass-strong rounded-lg px-4 py-3 text-sm text-white flex items-center gap-2 animate-slide-in ' + colors[type]}>
      <span className="flex-1">{message}</span>
      <button onClick={() => onRemove(id)} className="text-white/60 hover:text-white">✕</button>
    </div>
  );
}