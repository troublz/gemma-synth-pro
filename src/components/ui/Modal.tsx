import { type ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}
export default function Modal({ open, onClose, title, children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div ref={ref} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="relative bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg max-w-lg w-full max-h-[85vh] overflow-auto p-6">
            {title && <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold">{title}</h2><button onClick={onClose} className="text-neutral-400 hover:text-neutral-200 text-xl">&times;</button></div>}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
