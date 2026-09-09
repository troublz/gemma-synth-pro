import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUIStore } from '../../stores/uiStore';
const icons: Record<string, string> = { success: 'check', error: 'close', warning: 'warning', info: 'info' };
export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore();
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div key={t.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.2 }}
            className={}
          >
            <img src={} alt="" className="w-4 h-4" />
            <span>{t.message}</span>
            <button onClick={() => removeToast(t.id)} className="ml-2 opacity-70 hover:opacity-100">&times;</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
export function useToast() {
  const { addToast, removeToast } = useUIStore();
  const toast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Date.now().toString();
    addToast(message, type);
    setTimeout(() => removeToast(id), 4000);
  };
  return toast;
}
